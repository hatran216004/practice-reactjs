import AppRoutes from './routes/AppRoutes';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import './App.scss';

function App() {
    // eslint-disable-next-line no-unused-vars
    const { user, loginContext } = useContext(UserContext);

    console.log(user);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
