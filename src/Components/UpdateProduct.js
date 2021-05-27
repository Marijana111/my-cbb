import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import validateInput from "./validateInput";
import AddInputForm from "./AddInputForm";
import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const UpdateProduct = (props) => {
  const [show, setShow] = useState(props.isOpen);
  const [productId, setProductId] = useState(props.productId);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({
    productId: "",
    productName: "",
    brandId: "",
    categoryId: "",
    listPrice: "",
    modelYear: "",
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
    setArticle({ ...article, [name]: value });
  };

  function submit() {
    console.log("Submitted Succesfully");
  }

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put(
        "http://cbb.northeurope.cloudapp.azure.com:85/Products/" +
          article.productId,
        article
      )
      .then((res) => {
        setLoading(false);
        setMessage("Successfully edited!");
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Brands")
      .then((res) => {
        var brandSelector = document.getElementById("updateBrandID");
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
        var brandSelector = document.getElementById("updateCategoryID");
        res.data.forEach(function(item) {
          brandSelector.insertAdjacentHTML(
            "beforeend",
            `<option value=${item.categoryId}>${item.categoryName}</option>`
          );
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/products/" + productId)
      .then((res) => {
        setArticle({
          productId: res.data.productId,
          productName: res.data.productName,
          brandId: res.data.brandId,
          categoryId: res.data.categoryId,
          listPrice: res.data.listPrice,
          modelYear: res.data.modelYear,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={show} animation={false}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Edit product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label className="label">Product name</label>
          <input
            name="productName"
            className="form-control"
            type="text"
            placeholder="Enter product name"
            value={article.productName}
            onChange={handleInputChange}
          ></input>
          {errors.name && <p className="error">{errors.name}</p>}

          <label className="label">Product brand</label>

          <select
            name="brandId"
            id="updateBrandID"
            className="form-control"
            onChange={handleInputChange}
            value={article.brandId}
          ></select>

          <label className="label">Product category</label>
          <select
            name="categoryId"
            id="updateCategoryID"
            className="form-control"
            onChange={handleInputChange}
            value={article.categoryId}
          ></select>

          <label className="label">Product year</label>
          <input
            name="modelYear"
            className="form-control"
            type="number"
            placeholder="Enter year"
            value={article.modelYear}
            onChange={handleInputChange}
          ></input>
          {errors.year && <p className="error">{errors.year}</p>}

          <label className="label">Product price</label>
          <input
            name="listPrice"
            className="form-control"
            type="text"
            placeholder="Enter product price"
            value={article.listPrice}
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
export default UpdateProduct;
