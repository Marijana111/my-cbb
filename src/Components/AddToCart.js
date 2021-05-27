import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, InputGroup } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AddToCart = (props) => {
  const [showCart, setShowCart] = useState(props.isOpenCart);
  const [quantity, setQuantity] = useState(1);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [found, setFound] = useState(false);
  const [added, setAdded] = useState(false);
  const history = useHistory();
  const [article, setArticle] = useState({
    productId: "",
    productName: "",
    listPrice: "",
    quantity: "",
  });
  const { register, handleSubmit, errors } = useForm();

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleClose = () => {
    props.callBackFromChild();
    setShowCart(false);
  };

  function AddToCart() {
    let existingItems = JSON.parse(localStorage.getItem("allItems"));
    if (existingItems == null) existingItems = [];
    let entry = article;

    for (var i = 0; i < existingItems.length; i++) {
      if (existingItems[i].productId == article.productId) {
        setFound(true);
        setCartMessage("Article is already in cart!");
        setAdded(false);
        return false;
      }
    }

    existingItems.push(entry);
    localStorage.setItem("allItems", JSON.stringify(existingItems));

    setCartMessage("Added to cart!");
    setAdded(true);
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuantity(value);
    setArticle({ ...article, quantity: value });
  };

  useEffect(() => {
    axios
      .get(
        "http://cbb.northeurope.cloudapp.azure.com:85/products/" +
          props.productId
      )
      .then((res) => {
        setArticle({
          productId: res.data.productId,
          productName: res.data.productName,
          listPrice: res.data.listPrice,
          quantity,
        });

        setShowCart(true);
        setIsOpenCart(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={props.isOpenCart} animation={false}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Add to cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(AddToCart)}>
          <label className="label">Product name</label>
          <input
            id="productName"
            name="productName"
            className="form-control"
            type="text"
            readOnly
            defaultValue={article.productName}
          ></input>
          <label className="label">Price</label>
          <input
            id="listPrice"
            name="listPrice"
            className="form-control"
            type="text"
            readOnly
            defaultValue={article.listPrice}
          ></input>

          <label className="label">Quantity</label>
          <input
            name="quantity"
            id="quantity"
            className="form-control"
            type="number"
            ref={register({ required: true, min: 1, max: 10 })}
            placeholder="Enter quantity"
            onChange={handleInputChange}
            value={quantity}
          ></input>
          {errors.quantity && errors.quantity.type === "required" && (
            <p className="text-danger">The field must be filled in!</p>
          )}
          {errors.quantity &&
            (errors.quantity.type === "min" ||
              errors.quantity.type === "max") && (
              <p className="text-danger">Value must be between 1 and 10.</p>
            )}

          <p className="text-center text-success">{cartMessage}</p>

          <Button
            style={{ marginTop: "15px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>

          {!added ? (
            <Button
              id="cart"
              style={{ marginTop: "15px", float: "right" }}
              variant="primary"
              type="submit"
            >
              <i className="fas fa-cart-plus"></i> Add to cart
            </Button>
          ) : (
            <Button
              id="cart"
              style={{ marginTop: "15px", float: "right" }}
              variant="primary"
              onClick={() => {
                history.push("/cart");
              }}
            >
              <i className="fas fa-cart-plus"></i> Cart list
            </Button>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default AddToCart;
