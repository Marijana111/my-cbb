import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import UpdateCategory from "./UpdateCategory";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export default function Categories() {
  const [categories, setCategories] = useState("");
  const [updateTime, setUpdateTime] = useState(new Date());
  const [categoryId, setCategoryId] = useState(0);
  const [isOpen, setOpenModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    $("#deleteModal").modal("show");
    $("#delCatId").val(e.target.value);
  };

  const handleEditClick = (cell) => {
    setCategoryId(cell);
    setOpenModal(true);
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    var id = $("#delCatId").val();
    $("#deleteModal").modal("hide");

    axios
      .delete(`http://cbb.northeurope.cloudapp.azure.com:85/Categories/${id}`)
      .then((res) => {
        alert("Successfully deleted category!");
        setUpdateTime(new Date());
      })
      .catch((err) => console.log(err));
  };

  function linkFormatter(cell, row) {
    return (
      <>
        <div className="action">
          <button
            type="button"
            className="btn btn-secondary"
            value={row.categoryId}
            onClick={() => {
              handleEditClick(row.categoryId);
            }}
          >
            <i className="far fa-edit"></i> Edit
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger"
            value={row.categoryId}
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
                <input type="hidden" id="delCatId" />
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
    setCategoryId(0);
  };

  const columns = [
    {
      dataField: "categoryName",
      text: "Category name",
    },

    {
      dataField: "categoryId",
      text: "Actions",
      formatter: linkFormatter,
    },
  ];

  useEffect(() => {
    axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Categories")
      .then((res) => {
        setCategories(res.data);
        setUpdateTime(new Date());
      })
      .catch((err) => console.log(err));
  }, [updateTime]);

  return (
    <>
      <h1 className="title">Category list</h1>
      <span className="add">
        <Link to="/addcategory">
          <button type="button" className="btn btn-success">
            {" "}
            <i className="fas fa-plus-square"></i> Add category
          </button>
        </Link>
      </span>
      {categoryId > 0 ? (
        <UpdateCategory
          categoryId={categoryId}
          isOpen={isOpen}
          callBackFromChild={handleCloseModal}
        ></UpdateCategory>
      ) : null}

      <BootstrapTable
        keyField="categoryId"
        data={categories}
        columns={columns}
        pagination={paginationFactory()}
      />
    </>
  );
}
