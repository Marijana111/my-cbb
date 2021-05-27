import React, { useEffect, useState } from "react";
import axios from "axios";
import Widget from "./Widget";
import { Link } from "react-router-dom";

export default function Home() {
  const [numProducts, setNumProducts] = useState("");
  const [numCustomers, setNumCustomers] = useState("");
  const [numCategories, setNumCategories] = useState("");
  const [numBrands, setNumBrands] = useState("");

  useEffect(() => {
    axios
      .get(`http://cbb.northeurope.cloudapp.azure.com:85/Products`)
      .then((res) => {
        setNumProducts(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Customers")
      .then((res) => {
        setNumCustomers(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Categories")
      .then((res) => {
        setNumCategories(res.data.length);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Brands")
      .then((res) => {
        setNumBrands(res.data.length);
      });
  }, []);

  return (
    <div className="card-deck" style={{ marginTop: "20px" }}>
      <Widget
        route="/products"
        image="https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/01_Shopping_Cart-512.png"
        entity="Products"
        text={`There are currently ${numProducts} products.`}
        redirect="/addproduct"
      />

      <Widget
        route="/customers"
        image="https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/04_Costumer_Care-512.png"
        entity="Customers"
        text={`There are currently ${numCustomers} customers.`}
        redirect="/addcustomer"
      />

      <Widget
        route="/categories"
        image="https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/11_Packaging-512.png"
        entity="Categories"
        text={`There are currently ${numCategories} categories.`}
        redirect="/addcategory"
      />

      <Widget
        route="/brands"
        image="https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/08_Sales-512.png"
        entity="Brands"
        text={`There are currently ${numBrands} brands.`}
        redirect="/addbrand"
      />

      <div className="card">
        <img
          className="card-img-top"
          src="https://cdn3.iconfinder.com/data/icons/shopping-icons-14/128/19_24-Hours_Service-512.png"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">Contact</h5>
          <p className="card-text">Enter your information and contact us.</p>
        </div>
        <div className="card-footer">
          <Link to="/contact" className="btn btn-primary">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
