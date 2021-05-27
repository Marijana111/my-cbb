import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddInputForm from "./AddInputForm";
import validate from "./validateInput";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AddProduct = (props) => {
  const history = useHistory();
  const { handleInputChange, handleSubmit, product, errors } = AddInputForm(
    submit,
    validate
  );

  function submit() {
    console.log("Submitted Succesfully");
  }

  const handleFormReset = (e) => {
    e.preventDefault();
    $("#modal").modal("hide");
    $("form").trigger("reset");
  };

  $("#toList").on("click", function(e) {
    e.preventDefault();
    $("#modal").modal("hide");
    history.push("/products");
  });

  useEffect(() => {
    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Brands")
      .then((res) => {
        var brandSelector = document.getElementById("brandID");
        res.data.forEach(function(item) {
          brandSelector.insertAdjacentHTML(
            "beforeend",
            `<option value=${item.brandId}>${item.brandName}</option>`
          );
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Categories")
      .then((res) => {
        var brandSelector = document.getElementById("categoryID");
        res.data.forEach(function(item) {
          brandSelector.insertAdjacentHTML(
            "beforeend",
            `<option value=${item.categoryId}>${item.categoryName}</option>`
          );
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="input">
        <h3 className="addnewprod">
          <i className="fas fa-plus-square"></i> Add product
        </h3>

        <div className="fields">
          <form onSubmit={handleSubmit}>
            <label className="label">Product name</label>
            <input
              name="name"
              className="form-control"
              type="text"
              placeholder="Enter product name"
              value={product.productName}
              onChange={handleInputChange}
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}

            <label className="label">Product brand</label>

            <select
              name="brand"
              id="brandID"
              className="form-control"
              onChange={handleInputChange}
            >
              <option value disabled></option>
            </select>

            <label className="label">Product category</label>
            <select
              name="category"
              id="categoryID"
              className="form-control"
              onChange={handleInputChange}
            >
              <option value disabled></option>
            </select>

            <label className="label">Product year</label>
            <input
              name="year"
              className="form-control"
              type="number"
              placeholder="Enter year"
              value={product.modelYear}
              onChange={handleInputChange}
            ></input>
            {errors.year && <p className="error">{errors.year}</p>}

            <label className="label">Product price</label>
            <input
              name="price"
              className="form-control"
              type="text"
              placeholder="Enter product price"
              value={product.listPrice}
              onChange={handleInputChange}
            ></input>
            {errors.price && <p className="error">{errors.price}</p>}

            <a href="/products">
              <button id="back" type="button" className="btn btn-secondary">
                <i className="fas fa-backward"></i> Back
              </button>
            </a>

            <button id="submit" className="btn btn-success">
              <i className="fas fa-check"></i> Submit
            </button>
          </form>
        </div>
      </div>

      <div id="modal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Successfully added product! <i className="fas fa-check"></i>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Want to add a new product??</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormReset}
              >
                <i className="fas fa-plus-square"></i> Add new product
              </button>

              <button id="toList" type="button" className="btn btn-secondary">
                <i className="fas fa-table"></i> Go to the product list
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
