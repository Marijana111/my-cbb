import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddCategory() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const initialState = {
    categoryName: "",
  };
  const [category, setCategory] = useState(initialState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };
  const onSubmit = (data) => {
    axios
      .post("http://cbb.northeurope.cloudapp.azure.com:85/Categories", {
        categoryName: category.categoryName,
      })
      .then((res) => {
        alert("Successfully added category!");
        history.push("/categories");
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    history.push("/categories");
  };
  return (
    <div className="input">
      <h3 className="addnewprod">
        <i className="fas fa-plus-square"></i> Add new category
      </h3>

      <div className="fields">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-10 offset-lg-1 p-2 m-auto row"
        >
          <label className="label">Category name</label>
          <input
            type="text"
            className="form-control"
            ref={register({ required: true, minLength: 2 })}
            name="categoryName"
            onChange={handleInputChange}
            placeholder="Enter category name"
          />
          {errors.categoryName && errors.categoryName.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.categoryName && errors.categoryName.type === "minLength" && (
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
