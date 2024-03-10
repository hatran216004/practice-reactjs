import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUsers />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
