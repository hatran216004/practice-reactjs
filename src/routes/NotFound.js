import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
    return (
        <Alert variant="info" className="text-center">
            <Alert.Heading>PAGE NOT FOUND!</Alert.Heading>
            <p>
                Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
            </p>
        </Alert>
    );
};

export default NotFound;
