import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/userServices';
import { toast } from 'react-toastify';

const ModalEditUser = ({ show, handleClose, dataUserEdit, handleEditUserFromModal }) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const CallApiToEditUser = async () => {
        try {
            let res = await putUpdateUser(name, job);

            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
            });
            toast.success('Edit user succeed!');
            handleClose();
        } catch (error) {
            console.log('error');
            toast.error('Edit user failed!');
        }
    };

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form autoComplete="off">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="job" className="form-label">
                                    Job
                                </label>
                                <input
                                    value={job}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    onChange={(e) => setJob(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={CallApiToEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;
