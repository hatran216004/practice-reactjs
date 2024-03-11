import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <Alert variant="danger" className="text-center">
                <Alert.Heading>You need to login</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                    eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>
        );
    }

    return children;
};

export default PrivateRoutes;
