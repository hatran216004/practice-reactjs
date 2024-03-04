import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/userServices';

const TableUsers = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchAllUser();

        if (res && res.data && res.data.data) {
            setUsers(res.data.data);
        }
    };

    return (
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
    );
};

export default TableUsers;
