import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import UpdateCustomer from "./UpdateCustomer";
import { Link } from "react-router-dom";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [isOpen, setOpenModal] = useState(false);
  const [updateTime, setUpdateTime] = useState(new Date());

  function addresFormatter(cell, row) {
    return cell + ", " + row.city;
  }

  const confirmDelete = (e) => {
    e.preventDefault();
    var id = $("#delProductId").val();
    $("#deleteModal").modal("hide");
    axios
      .delete(`http://cbb.northeurope.cloudapp.azure.com:85/Customers/${id}`)
      .then((res) => {
        alert("Successfully deleted customer!");
        setUpdateTime(new Date());
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    $("#deleteModal").modal("show");
    $("#delProductId").val(e.target.value);
  };

  const handleEditClick = (cell) => {
    setCustomerId(cell);
    setOpenModal(true);
  };

  function linkFormatter(cell, row) {
    return (
      <>
        <div className="action">
          <button
            type="button"
            className="btn btn-secondary"
            value={row.customerId}
            onClick={() => {
              handleEditClick(row.customerId);
            }}
          >
            <i className="far fa-edit"></i> Edit
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger"
            value={row.customerId}
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setCustomerId(0);
  };

  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "lastName",
      text: "Last name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "street",
      text: "Address",
      formatter: addresFormatter,
    },
    {
      dataField: "customerId",
      text: "Actions",
      formatter: linkFormatter,
    },
  ];

  useEffect(() => {
    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Customers")
      .then((res) => {
        setCustomers(res.data);
        setUpdateTime(new Date());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateTime]);
  return (
    <>
      <h1 className="title">Customer list</h1>
      {customerId > 0 ? (
        <UpdateCustomer
          customerId={customerId}
          isOpen={isOpen}
          callBackFromChild={handleCloseModal}
        ></UpdateCustomer>
      ) : null}

      <span className="add">
        <Link to="/addcustomer">
          <button type="button" className="btn btn-success">
            {" "}
            <i className="fas fa-plus-square"></i> Add customer
          </button>
        </Link>
      </span>

      <BootstrapTable
        keyField="customerId"
        data={customers}
        columns={columns}
        pagination={paginationFactory()}
      />
    </>
  );
}
