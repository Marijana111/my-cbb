import React from "react";
import { Link } from "react-router-dom";

const Widget = (props) => {
  return (
    <div className="card">
      <img className="card-img-top" src={props.image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.entity}</h5>
        <p className="card-text">{props.text}</p>
      </div>
      <div className="card-footer">
        <div className="row" style={{ justifyContent: "center" }}>
          <Link to={props.route} className="btn btn-primary">
            All {props.entity}
          </Link>
          &nbsp;
          <Link to={props.redirect} className="btn btn-success">
            Add {props.entity}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Widget;
