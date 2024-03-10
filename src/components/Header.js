import { useLocation, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import images from '../assets/imgs';

const Header = () => {
    const location = useLocation();

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
                            <NavLink to="/login" className="custom-btn-login">
                                Login
                            </NavLink>
                            <NavLink to="/logout" className="custom-btn-logout">
                                Logout
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
