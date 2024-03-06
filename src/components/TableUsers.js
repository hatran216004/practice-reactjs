import { useEffect, useState } from 'react';
import ModalAddNew from './ModalAddNew';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

import { fetchAllUser } from '../services/userServices';

const TableUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    const handleUpdateTable = (user) => {
        setUsers((prev) => [user, ...prev]);
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setTotalPages(res.total_pages);
            setTotalUsers(res.total);
            setUsers(res.data);
        }
    };

    const handlePageClick = (e) => {
        getUsers(+e.selected + 1);
    };

    return (
        <>
            <div className="my-3 d-flex justify-content-between align-items-center">
                List users:
                <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                    Add new user
                </button>
            </div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.length > 0 &&
                        users.map((user, index) => (
                            <tr key={`user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
        </>
    );
};

export default TableUsers;
