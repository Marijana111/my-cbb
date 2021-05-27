import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddBrand() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const initialState = {
    brandName: "",
  };
  const [brand, setBrand] = useState(initialState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBrand({ ...brand, [name]: value });
  };
  const onSubmit = (data) => {
    axios
      .post("http://cbb.northeurope.cloudapp.azure.com:85/Brands", {
        brandName: brand.brandName,
      })
      .then((res) => {
        alert("Successfully added brand!");
        history.push("/brands");
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    history.push("/brands");
  };
  return (
    <div className="input">
      <h3 className="addnewprod">
        <i className="fas fa-plus-square"></i> Add new brand
      </h3>

      <div className="fields">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-10 offset-lg-1 p-2 m-auto row"
        >
          <label className="label">Brand name</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 2 })}
            name="brandName"
            onChange={handleInputChange}
            placeholder="Enter brand name"
          />
          {errors.brandName && errors.brandName.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.brandName && errors.brandName.type === "minLength" && (
            <p className="text-danger">Min length is 2 characters.</p>
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
