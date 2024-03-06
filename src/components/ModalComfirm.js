import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/userServices';
import { toast } from 'react-toastify';

const ModalComfirm = ({ show, handleClose, title, content, dataUserDelete, handleDeletetUserFromModal }) => {
    const confirmDelete = async () => {
        // call api
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            handleDeletetUserFromModal(dataUserDelete);

            toast.success('Delete user succeed!');
            handleClose();
        } else {
            toast.error('Error delete user!');
            handleClose();
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h5>{content}</h5>
                        Email: <b>{dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalComfirm;
