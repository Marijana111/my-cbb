import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddToCart from "./AddToCart";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [isOpen, setOpenModal] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isFetch, setFetch] = useState(false);
  const [updateTime, setUpdateTime] = useState(new Date());
  const [search, setSearch] = useState({ searchText: "", timeout: 0 });
  const [productName, setProductName] = useState("");

  const history = useHistory();

  const confirmDelete = (e) => {
    e.preventDefault();
    var id = $("#delProductId").val();
    $("#deleteModal").modal("hide");
    axios
      .delete(`http://cbb.northeurope.cloudapp.azure.com:85/Products/${id}`)
      .then((res) => {
        alert("Successfully deleted product!");
        setUpdateTime(new Date());
      })
      .catch((err) => console.log(err));
  };

  const { isLogged } = useContext(AuthContext);

  const handleCartClick = (cell) => {
    setProductId(cell);
    setIsOpenCart(true);
  };

  function linkFormatter(cell, row) {
    return (
      <>
        <div className="action">
          <button
            type="button"
            className="btn btn-primary"
            value={row.productId}
            onClick={() => {
              handleCartClick(row.productId);
            }}
          >
            <i className="fas fa-cart-plus"></i>
          </button>{" "}
          <button
            type="button"
            className="btn btn-secondary"
            value={row.productId}
            onClick={() => {
              handleEditClick(row.productId);
            }}
          >
            <i className="far fa-edit"></i> Edit
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger"
            value={row.productId}
            onClick={handleDeleteClick}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>

        <div id="deleteModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete</h5>
                <input type="hidden" id="delProductId" />
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
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={confirmDelete}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const columns = [
    {
      dataField: "productName",
      text: "Product name",
    },
    {
      dataField: "brandId",
      text: "Brand",
    },
    {
      dataField: "categoryId",
      text: "Category",
    },
    {
      dataField: "modelYear",
      text: "Year",
    },
    {
      dataField: "listPrice",
      text: "Product price",
    },
    {
      dataField: "productId",
      text: "Actions",
      formatter: linkFormatter,
    },
  ];

  useEffect(() => {
    axios
      .get(
        `http://cbb.northeurope.cloudapp.azure.com:85/Products?productName=${search.searchText}`
      )
      .then((res) => {
        setProducts(res.data);

        if (res.data == 0) {
          document.getElementById("noResult").innerHTML = "Nema rezultata!";
        } else {
          document.getElementById("noResult").innerHTML = "";
        }
        setFetch(true);
        setUpdateTime(new Date());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, updateTime]);

  const handleEditClick = (cell) => {
    setProductId(cell);
    setOpenModal(true);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    $("#deleteModal").modal("show");
    $("#delProductId").val(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsOpenCart(false);
    setProductId(0);
  };

  const handleSearch = (searchText) => {
    if (search.timeout) clearTimeout(search.timeout);
    search.timeout = setTimeout(() => {
      setSearch({ searchText });
    }, 1500);
  };

  return (
    <>
      <h1 className="title">Product list</h1>
      {productId > 0 ? (
        <UpdateProduct
          productId={productId}
          isOpen={isOpen}
          callBackFromChild={handleCloseModal}
        ></UpdateProduct>
      ) : null}

      {productId > 0 ? (
        <AddToCart
          productId={productId}
          isOpenCart={isOpenCart}
          callBackFromChild={handleCloseModal}
        ></AddToCart>
      ) : null}

      <span className="add">
        <Link to="/addproduct">
          <button type="button" className="btn btn-success">
            {" "}
            <i className="fas fa-plus-square"></i> Add product
          </button>
        </Link>
      </span>
      <>
        <div className="container-fluid pl-0 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search product"
            style={{ width: 300 }}
            onKeyUp={(e) => handleSearch(e.target.value)}
          />
          <p id="noResult"></p>
        </div>
      </>

      <BootstrapTable
        keyField="productId"
        data={products}
        columns={columns}
        pagination={paginationFactory()}
      />
    </>
  );
}
