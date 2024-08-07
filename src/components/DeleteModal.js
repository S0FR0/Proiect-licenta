import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteModal(props) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const cards = localStorage.getItem("cards");

  function deleteUser() {
    axios.delete(`http://localhost:8000/users/${userId}`).catch((error) => {
      console.error("Error deleting user:", error);
    });
    axios.get(`http://localhost:8000/cards/`).then((result) => {
      result.data.map((card) => {
        if (card.userId === userId)
          axios.delete(`http://localhost:8000/cards/${card.id}`);
      });
    });
    axios.get(`http://localhost:8000/expenses/`).then((result) => {
      result.data.map((expense) => {
        if (expense.userId === userId)
          axios.delete(`http://localhost:8000/expenses/${expense.id}`);
      });
    });
    navigate("/");
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h5 className="d-flex justify-content-center">
          Are you sure you want to delete the account?
        </h5>
        <div className="d-flex my-2 mt-4">
          <Button className="me-auto ms-4" onClick={props.onHide}>
            Close
          </Button>
          <Button className="btn btn-danger me-4" onClick={deleteUser}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
