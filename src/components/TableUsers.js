import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faFileImport, faPlusCircle, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import { fetchAllUser } from '../services/userServices';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalComfirm from './ModalComfirm';
import useDebounce from '../hooks/useDebounce';
import './TableUsers.scss';

const TableUsers = () => {
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDelte, setIsShowModalDelte] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [sortBy, setSortBy] = useState('asc');
    // eslint-disable-next-line no-unused-vars
    const [sortField, setSortField] = useState('id');

    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    const [dataExport, setDataExport] = useState([]);

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

    // Sort
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneUsers = _.cloneDeep([...users]);
        cloneUsers = _.orderBy(cloneUsers, [sortField], [sortBy]);
        setUsers(cloneUsers);
    };

    // Search
    useEffect(() => {
        let term = debounced.trimStart('');
        if (term) {
            let cloneUsers = _.cloneDeep([...users]);
            cloneUsers = cloneUsers.filter((user) => user.email.includes(term));
            setUsers(cloneUsers);
        } else {
            getUsers(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    // Data export
    const getUsersExport = (event, done) => {
        let result = [];
        if (users && users.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name']);
            users.map((user) => {
                let arr = [];
                arr[0] = user.id;
                arr[1] = user.email;
                arr[2] = user.first_name;
                arr[3] = user.last_name;
                result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (e) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Only acept csv file!');
                e.target.value = '';
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    // validate file
                    if (rawCSV.length > 0) {
                        if (rawCSV[0].length === 3) {
                            if (
                                // Check element in array header
                                rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Invalid file format bla bla bla!');
                            } else {
                                toast.success('Upload filed succeed!');
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setUsers(result);
                            }
                        } else {
                            toast.error('Invalid file format!');
                        }
                    } else {
                        toast.error('Not found data!');
                    }
                },
            });
        }
    };

    return (
        <>
            <div className="my-3 d-flex justify-content-between align-items-center flex-sm-nowrap flex-wrap gap-2">
                <span className="col-12 col-sm-6">List users:</span>
                <div className="d-flex align-items-center gap-3 ms-auto me-auto me-sm-0">
                    <label className="custom-file-input">
                        <input type="file" hidden onChange={(e) => handleImportCSV(e)} />
                        Import
                        <FontAwesomeIcon icon={faFileImport} />
                    </label>

                    <CSVLink
                        filename={'user.csv'}
                        className="btn btn-primary d-flex align-items-center gap-2"
                        // Chờ đến khi onClick func xử lý xog => data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                        data={dataExport}
                    >
                        Export
                        <FontAwesomeIcon icon={faCircleDown} className="icon" />
                    </CSVLink>

                    <button
                        className="btn btn-success d-flex align-items-center gap-2"
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        <span>Add new</span>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                </div>
            </div>
            <div className="my-3 col-12 col-sm-6 me-auto ms-auto">
                <input
                    value={searchValue}
                    type="text"
                    className="form-control"
                    placeholder="Search user by email"
                    spellCheck={'false'}
                    onChange={(e) => setSearchValue(e.target.value.trimStart(''))}
                />
            </div>

            <div className="custom-table">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr className="text-center">
                            <th className="sort-header">
                                Id
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className="arrow-icon"
                                        onClick={() => handleSort('desc', 'id')}
                                    />
                                    <FontAwesomeIcon
                                        icon={faSortUp}
                                        className="arrow-icon"
                                        onClick={() => handleSort('asc', 'id')}
                                    />
                                </div>
                            </th>
                            <th>Email</th>
                            <th className="sort-header">
                                First Name
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className="arrow-icon"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    />
                                    <FontAwesomeIcon
                                        icon={faSortUp}
                                        className="arrow-icon"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    />
                                </div>
                            </th>
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
                                        <button className="custom-btn-info me-4" onClick={() => handleEditUser(user)}>
                                            Edit
                                        </button>
                                        <button className="custom-btn-delete" onClick={() => handleDeleteUser(user)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
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
