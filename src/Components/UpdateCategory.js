import React, { useState, useEffect } from "react";
import axios from "axios";
import validateInput from "./validateInput";
import AddInputForm from "./AddInputForm";
import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const UpdateCategory = (props) => {
  const [show, setShow] = useState(props.isOpen);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    categoryId: props.categoryId,
    categoryName: "",
  });

  const handleClose = () => {
    props.callBackFromChild();
    setShow(false);
  };

  const { handleSubmit, errors } = AddInputForm(submit, validateInput);
  const [isDisabled, setDisable] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDisable(false);
    setCategory({ ...category, [name]: value });
  };

  function submit() {
    console.log("Submitted Succesfully");
  }

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put(
        `http://cbb.northeurope.cloudapp.azure.com:85/Categories/${category.categoryId}`,
        category
      )
      .then((res) => {
        setLoading(false);
        setMessage("Succesfully updated!");
        setShow(true);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    axios
      .get(
        "http://cbb.northeurope.cloudapp.azure.com:85/Categories/" +
          category.categoryId
      )
      .then((res) => {
        setCategory({
          categoryId: res.data.categoryId,
          categoryName: res.data.categoryName,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={show} animation={false}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Edit category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label className="label">Category name</label>
          <input
            name="categoryName"
            className="form-control"
            type="text"
            value={category.categoryName}
            onChange={handleInputChange}
          ></input>
          {errors.name && <p className="error">{errors.name}</p>}

          <div id="successMsg" className="text-center text-success">
            {message}
          </div>

          <Button
            style={{ marginTop: "15px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>

          {loading ? (
            <Spinner
              style={{ float: "right", marginTop: "15px", marginLeft: "10px" }}
              animation="border"
              variant="success"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : null}

          <Button
            style={{ marginTop: "15px", float: "right" }}
            variant="primary"
            onClick={handleUpdate}
            disabled={isDisabled}
          >
            <i className="fa fa-check" aria-hidden="true"></i> Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateCategory;
