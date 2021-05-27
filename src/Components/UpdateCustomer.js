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

const UpdateCustomer = (props) => {
  const [show, setShow] = useState(props.isOpen);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    customerId: props.customerId,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
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
    setCustomer({ ...customer, [name]: value });
  };

  function submit() {
    console.log("Submitted Succesfully");
  }

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put(
        `http://cbb.northeurope.cloudapp.azure.com:85/Customers/${customer.customerId}`,
        customer
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
        "http://cbb.northeurope.cloudapp.azure.com:85/Customers/" +
          customer.customerId
      )
      .then((res) => {
        setCustomer({
          customerId: res.data.customerId,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          street: res.data.street,
          city: res.data.city,
          state: res.data.state,
          zipCode: res.data.zipCode,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={show} animation={false}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Edit customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label className="label">First Name</label>
          <input
            name="firstName"
            className="form-control"
            type="text"
            value={customer.firstName}
            onChange={handleInputChange}
          ></input>
          {errors.name && <p className="error">{errors.name}</p>}

          <label className="label">Last Name</label>

          <input
            name="lastName"
            className="form-control"
            type="text"
            onChange={handleInputChange}
            value={customer.lastName}
          ></input>

          <label className="label">Email</label>
          <input
            name="email"
            className="form-control"
            type="text"
            onChange={handleInputChange}
            value={customer.email}
          ></input>
          <label className="label">Phone number</label>

          <input
            name="phone"
            className="form-control"
            onChange={handleInputChange}
            value={customer.phone}
          ></input>

          <label className="label">Street</label>
          <input
            name="street"
            className="form-control"
            type="text"
            value={customer.street}
            onChange={handleInputChange}
          ></input>
          {errors.price && <p className="error">{errors.price}</p>}

          <label className="label">City</label>
          <input
            name="city"
            className="form-control"
            type="text"
            value={customer.city}
            onChange={handleInputChange}
          ></input>
          {errors.price && <p className="error">{errors.price}</p>}

          <label className="label">State</label>
          <input
            name="state"
            className="form-control"
            type="text"
            value={customer.state}
            onChange={handleInputChange}
          ></input>
          {errors.price && <p className="error">{errors.price}</p>}

          <label className="label">zipCode</label>
          <input
            name="zipCode"
            className="form-control"
            type="text"
            value={customer.zipCode}
            onChange={handleInputChange}
          ></input>
          {errors.price && <p className="error">{errors.price}</p>}

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
export default UpdateCustomer;
