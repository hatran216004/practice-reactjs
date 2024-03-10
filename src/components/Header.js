import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import images from '../assets/imgs';
import { toast } from 'react-toastify';
import { divide } from 'lodash';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout, user } = useContext(UserContext);

    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logout success!');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center gap-3">
                        <img src={images.logo} alt={images.logo} className="logo" />
                        Practice React
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        {((user && user.auth) || window.location.pathname === '/') && (
                            <>
                                <Nav className="" activeKey={location.pathname}>
                                    <div className="nav-link">
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? 'pending' : isActive ? 'active' : ''
                                            }
                                            to="/"
                                        >
                                            Home
                                        </NavLink>
                                    </div>
                                    <div className="nav-link">
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? 'pending' : isActive ? 'active' : ''
                                            }
                                            to="/users"
                                        >
                                            Manage user
                                        </NavLink>
                                    </div>
                                </Nav>

                                <Nav className="d-flex gap-2 ">
                                    {user && user.auth === true ? (
                                        <>
                                            <span className="nav-link">{user.email}</span>
                                            <div className="custom-btn-logout" onClick={() => handleLogout()}>
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <NavLink to="/login" className="custom-btn-login">
                                            Login
                                        </NavLink>
                                    )}
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
