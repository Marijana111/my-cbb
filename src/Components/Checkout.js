import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Checkout() {
  const history = useHistory();
  const [isComplete, setIsComplete] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const { register, handleSubmit, errors } = useForm();

  let total = Number(localStorage.getItem("sumPrice")).toFixed(2);
  let newTotal;

  const onSubmit = () => {
    setIsComplete(true);
    setCheckoutMsg("You have successfully completed your order.");
    localStorage.removeItem("allItems");
  };

  const calcTotalPrice = () => {
    let option = document.getElementById("ddDelivery");
    let selected = option.options[option.selectedIndex].value;
    var radios = document.getElementsByClassName("cardOption");
    let myOption;

    if (selected == "Fedex") {
      newTotal = parseFloat(total) + (10 / 100) * total;
      document.getElementById("Tprice").innerHTML =
        Number(newTotal).toFixed(2) + " $";
    } else if (selected == "DBPost") {
      newTotal = parseFloat(total) + (5 / 100) * total;
      document.getElementById("Tprice").innerHTML =
        Number(newTotal).toFixed(2) + " $";
    } else if (selected == "DHL") {
      newTotal = parseFloat(total) + (12 / 100) * total;
      document.getElementById("Tprice").innerHTML =
        Number(newTotal).toFixed(2) + " $";
    } else if (selected == 0) {
      newTotal = total;
      document.getElementById("Tprice").innerHTML =
        Number(newTotal).toFixed(2) + " $";
    } else {
      document.getElementById("Tprice").innerHTML = total + " $";
    }

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        myOption = radios[i].value;

        switch (myOption) {
          case "visa":
            document.getElementById("Tprice").innerHTML =
              Number(newTotal + 1).toFixed(2) + " $";
            break;

          case "paypal":
            document.getElementById("Tprice").innerHTML =
              Number(newTotal + 7).toFixed(2) + " $";
            break;

          case "masterCard":
            document.getElementById("Tprice").innerHTML =
              Number(newTotal + 3).toFixed(2) + " $";
            break;

          default:
            document.getElementById("Tprice").innerHTML = total + " $";
        }
      }
    }
  };

  return (
    <>
      {isComplete ? (
        <div className="order">
          <h2>Congratulations!</h2>
          <p style={{ fontSize: "20px" }}>{checkoutMsg}</p>
          {
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home"></i> Homepage
            </Link>
          }
        </div>
      ) : (
        <div id="inputs" className="col-10 m-auto">
          <fieldset className="scheduler-border">
            <h1 className="text-center" style={{ marginTop: "20px" }}>
              <i className="fas fa-address-card"></i> Order
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="col-10 offset-lg-1 p-2 m-auto row"
            >
              <div className="col-lg-6">
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 2 })}
                    name="firstName"
                  />
                  {errors.firstName && errors.firstName.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.firstName &&
                    errors.firstName.type === "minLength" && (
                      <p className="text-danger">Min length is 2 characters.</p>
                    )}
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 3 })}
                    name="lastName"
                  />
                  {errors.lastName && errors.lastName.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.lastName && errors.lastName.type === "minLength" && (
                    <p className="text-danger">Min length is 3 characters.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 6 })}
                    name="phone"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.phone && errors.phone.type === "minLength" && (
                    <p className="text-danger">Min length is 6 characters.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 5 })}
                    name="email"
                  />
                  {errors.email && errors.email.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.email && errors.email.type === "minLength" && (
                    <p className="text-danger">Min length is 5 characters.</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Street</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 5 })}
                    name="street"
                  />
                  {errors.street && errors.street.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.street && errors.street.type === "minLength" && (
                    <p className="text-danger">Min length is 5 characters.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 3 })}
                    name="city"
                  />
                  {errors.city && errors.city.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.city && errors.city.type === "minLength" && (
                    <p className="text-danger">Min length is 3 characters.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 3 })}
                    name="state"
                  />
                  {errors.state && errors.state.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.state && errors.state.type === "minLength" && (
                    <p className="text-danger">Min length is 3 characters.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>zipCode</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={register({ required: true, minLength: 3 })}
                    name="zipCode"
                  />
                  {errors.zipCode && errors.zipCode.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.zipCode && errors.zipCode.type === "minLength" && (
                    <p className="text-danger">Min length is 3 characters.</p>
                  )}
                </div>
              </div>
              <div className="details">
                <div id="radioBtn">
                  <label>Method of payment</label>
                  <br />

                  <input
                    className="cardOption"
                    onClick={calcTotalPrice}
                    type="radio"
                    id="visa"
                    name="payment"
                    value="visa"
                    ref={register({ required: true })}
                  />

                  <img
                    className="payIcon"
                    src="https://image.flaticon.com/icons/svg/349/349221.svg"
                  />

                  <input
                    className="cardOption"
                    onClick={calcTotalPrice}
                    style={{ marginLeft: "10px" }}
                    type="radio"
                    id="paypal"
                    ref={register({ required: true })}
                    name="payment"
                    value="paypal"
                  />

                  <img
                    className="payIcon"
                    src="https://image.flaticon.com/icons/svg/888/888870.svg"
                  />

                  <input
                    className="cardOption"
                    onClick={calcTotalPrice}
                    style={{ marginLeft: "10px" }}
                    type="radio"
                    id="masterCard"
                    name="payment"
                    value="masterCard"
                    ref={register({ required: true })}
                  />

                  <img
                    className="payIcon"
                    src="https://image.flaticon.com/icons/svg/196/196561.svg"
                  />
                </div>
                <div className="totPrice">
                  Your order price is:
                  <br /> <strong id="Tprice">{total} $</strong>
                </div>
                <div className="delivery">
                  Delivery:
                  <br />
                  <select
                    className="custom-select"
                    id="ddDelivery"
                    onChange={calcTotalPrice}
                  >
                    <option value={0}>Select option</option>
                    <option value="Fedex">Fedex - 10%</option>
                    <option value="DBPost">DB Post - 5%</option>
                    <option value="DHL">DHL - 12%</option>
                    <option value="StoreCollect">Store collect</option>
                  </select>
                </div>
              </div>
              <Link id="backk" className="btn btn-secondary" to="/cart">
                <i className="fas fa-long-arrow-alt-left"></i> Back
              </Link>

              <Button id="finish" variant="primary" type="submit">
                <i className="fas fa-truck"></i> Finish order
              </Button>
            </form>
          </fieldset>
        </div>
      )}
    </>
  );
}
