import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
export default function AddUser() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  };
  const [customer, setCustomer] = useState(initialState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };
  const onSubmit = (data) => {
    axios
      .post("http://cbb.northeurope.cloudapp.azure.com:85/customers", {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
      })
      .then((res) => {
        alert("Uspješno dodan korisnik!");
        history.push("/customers");
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    history.push("/customers");
  };
  return (
    <div className="input">
      <h3 className="addnewprod">
        <i className="fas fa-plus-square"></i> Add new customer
      </h3>

      <div className="fields">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-10 offset-lg-1 p-2 m-auto row"
        >
          <label className="label">First name</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 2 })}
            name="firstName"
            onChange={handleInputChange}
            placeholder="Enter first name"
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.firstName && errors.firstName.type === "minLength" && (
            <p className="text-danger">Min length is 2 characters.</p>
          )}

          <label className="label">Last name</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 3 })}
            name="lastName"
            onChange={handleInputChange}
            placeholder="Enter last name"
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.lastName && errors.lastName.type === "minLength" && (
            <p className="text-danger">Min length is 3 characters.</p>
          )}

          <label className="label">Email</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 5 })}
            name="email"
            onChange={handleInputChange}
            placeholder="Enter email"
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <p className="text-danger">Min length is 5 characters.</p>
          )}

          <label className="label">Phone number</label>
          <input
            type="number"
            className="form-control"
            ref={register({ required: true, minLength: 6 })}
            name="phone"
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
          {errors.phone && errors.phone.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.phone && errors.phone.type === "minLength" && (
            <p className="text-danger">Min length is 6 characters.</p>
          )}

          <label className="label">Street</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 5 })}
            name="street"
            onChange={handleInputChange}
            placeholder="Enter street"
          />
          {errors.street && errors.street.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.street && errors.street.type === "minLength" && (
            <p className="text-danger">Min length is 5 characters.</p>
          )}

          <label className="label">City</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 3 })}
            name="city"
            onChange={handleInputChange}
            placeholder="Enter city"
          />
          {errors.city && errors.city.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.city && errors.city.type === "minLength" && (
            <p className="text-danger">Min length is 3 characters.</p>
          )}

          <label className="label">State</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 3 })}
            name="state"
            onChange={handleInputChange}
            placeholder="Enter state"
          />
          {errors.state && errors.state.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.state && errors.state.type === "minLength" && (
            <p className="text-danger">Min length is 3 characters.</p>
          )}

          <label className="label">zipCode</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 3 })}
            name="zipCode"
            onChange={handleInputChange}
            placeholder="Enter zipCode"
          />
          {errors.zipCode && errors.zipCode.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.zipCode && errors.zipCode.type === "minLength" && (
            <p className="text-danger">Min length is 3 characters.</p>
          )}

          <div className="btn-group ml-auto pr-3">
            <button
              id="back"
              type="button"
              className="btn btn-secondary"
              onClick={handleCancle}
            >
              Cancel
            </button>
            <button id="submit" className="btn btn-success" type="submit">
              <i className="fas fa-check"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
