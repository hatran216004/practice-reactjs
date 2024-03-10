import { useState } from 'react';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginApi } from '../services/userServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Please enter your email and password!');
            return;
        }

        let res = await loginApi('eve.holt@reqres.in', password);
        if (res && res.token) {
            localStorage.setItem('token', res.token);
        }
    };

    return (
        <div className="form-inner col-lg-6 col-sm-4">
            <h3 className="form-heading">USER LOGIN</h3>
            <form action="" className="form-wrapper" autoComplete="off">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="form-input">
                        <input
                            spellCheck="false"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faUser} className="form-icon" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="form-input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <FontAwesomeIcon
                                icon={faEye}
                                className="form-icon"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className="form-icon"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>

                <div className="form-btn">
                    <Link
                        to="/users"
                        className={email && password ? 'form-btn-login' : 'form-btn-login disabled'}
                        onClick={() => handleLogin()}
                    >
                        Login
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-start gap-1 form-back">
                    <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
                    <button>Back</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
