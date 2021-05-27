import React, { useState, useEffect } from "react";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Button, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart() {
  const Items = JSON.parse(localStorage.getItem("allItems"));
  const [cartItems, setCartItems] = useState(Items);
  const [update, setUpdate] = useState(new Date());

  let totalPrice = 0;
  let totalQuantity = 0;

  const calcTotals = () => {
    if (cartItems != null) {
      cartItems.forEach((item) => {
        totalPrice += item.listPrice;
        totalQuantity += parseFloat(item.quantity);
        localStorage.setItem("sumPrice", totalPrice);
      });
    }
  };
  calcTotals();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("allItems")));
  }, [update]);

  const deleteCartItem = (productId) => {
    let existingItems = JSON.parse(localStorage.getItem("allItems"));

    existingItems.forEach(function(item) {
      if (item.productId == productId) {
        existingItems.splice(existingItems.indexOf(item), 1);
      }
    });
    localStorage.setItem("allItems", JSON.stringify(existingItems));

    setUpdate(new Date());
  };

  const emptyCart = () => {
    localStorage.removeItem("allItems");
    setUpdate(new Date());
  };

  return (
    <>
      <h1 className="title">Cart list</h1>
      <table className="table table-bordered">
        <thead>
          <th scope="col">#</th>
          <th scope="col">Product name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Actions</th>
        </thead>

        <tbody>
          {cartItems ? (
            cartItems.map((item, i) => (
              <tr scope="row">
                <td>{i + 1}</td>
                <td>{item.productName}</td>
                <td>{item.listPrice} $</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    onClick={() => deleteCartItem(item.productId)}
                    variant="danger"
                  >
                    <i className="fas fa-trash"></i> Delete from cart
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <div className="empty">
              <h3 className="text-center text-danger">Cart is empty!</h3>
            </div>
          )}
        </tbody>
        <tfoot className="table-footer text-light bg-secondary">
          <td></td>
          <td>
            <strong>TOTAL</strong>
          </td>
          <td id="totalPrice">
            <strong>{totalPrice} $</strong>
          </td>
          <td>
            <strong>{totalQuantity}</strong>
          </td>
          <td>
            <Button id="clear" onClick={emptyCart} variant="danger">
              <i className="fas fa-calendar-times"></i> Clear all from cart
            </Button>
          </td>
        </tfoot>
      </table>
      <div>
        <Link
          to="/products"
          className="btn btn-secondary"
          style={{
            marginTop: "15px",
            marginLeft: "40%",
            marginBottom: "15px",
          }}
        >
          <i className="fas fa-long-arrow-alt-left"></i> Continue shopping
        </Link>
        <Link
          to="/checkout"
          className="btn btn-primary"
          style={{
            marginTop: "15px",
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <i className="fas fa-shopping-cart"></i> Checkout
        </Link>
      </div>{" "}
    </>
  );
}
