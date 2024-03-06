import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import { fetchAllUser } from '../services/userServices';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalComfirm from './ModalComfirm';

const TableUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDelte, setIsShowModalDelte] = useState(false);

    // render data
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

    // handle chuyển page
    const handlePageClick = (e) => {
        getUsers(+e.selected + 1);
    };

    // Close modal
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelte(false);
    };

    // Update table sau khi thêm user
    const handleUpdateTable = (user) => {
        setUsers([user, ...users]);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    };

    // Delete User
    const handleDeleteUser = (user) => {
        setDataUserDelete(user);
        setIsShowModalDelte(true);
    };

    const handleDeletetUserFromModal = (user) => {
        let cloneUsers = _.cloneDeep([...users]);
        cloneUsers = cloneUsers.filter((item) => item.id !== user.id);
        setUsers(cloneUsers);
    };

    // Edit form
    const handleEditUserFromModal = (user) => {
        let cloneUsers = _.cloneDeep([...users]);
        const index = users.findIndex((item) => item.id === user.id);
        cloneUsers[index].first_name = user.first_name;
        setUsers(cloneUsers);
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
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
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
                                <td className="d-flex justify-content-center">
                                    <button className="btn btn-info me-4" onClick={() => handleEditUser(user)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user)}>
                                        Delete
                                    </button>
                                </td>
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
            <ModalEditUser
                show={isShowModalEditUser}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalComfirm
                show={isShowModalDelte}
                handleClose={handleClose}
                title={'Delete User'}
                content={'Are you sure to delete user ?'}
                dataUserDelete={dataUserDelete}
                handleDeletetUserFromModal={handleDeletetUserFromModal}
            />
        </>
    );
};

export default TableUsers;
