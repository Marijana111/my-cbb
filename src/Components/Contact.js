import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
=======
>>>>>>> 4d7b6c63c6b3b35a216f5890486ba4201520d65f

export default function Home() {
  const { register, handleSubmit, errors } = useForm();
  const [isComplete, setIsComplete] = useState(false);

  const contactSubmit = () => {
    setIsComplete(true);
  };

  return (
<<<<<<< HEAD
    <>
      <h3 className="contactTitle">
        <i className="fas fa-envelope"></i> Contact us
      </h3>

      {isComplete ? (
        <p className="text-center text-success">
          Your message has been sent. We will do our best to answer you as soon
          as possible.
        </p>
      ) : (
        <div id="inputs" className="col-10 m-auto">
          <fieldset className="scheduler-border">
            <form
              className="col-10 offset-lg-1 p-2 m-auto row"
              onSubmit={handleSubmit(contactSubmit)}
            >
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Your name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    ref={register({ required: true, minLength: 5 })}
                    placeholder="Enter your name"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.name && errors.name.type === "minLength" && (
                    <p className="text-danger">Min length is 2 characters.</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    ref={register({ required: true, minLength: 5 })}
                    placeholder="name@example.com"
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
                  <label>Message</label>
                  <textarea
                    name="message"
                    id="textArea"
                    className="form-control"
                    ref={register({ required: true, minLength: 10 })}
                    rows="3"
                  ></textarea>
                  {errors.message && errors.message.type === "required" && (
                    <p className="text-danger">The field must be filled in!</p>
                  )}
                  {errors.message && errors.message.type === "minLength" && (
                    <p className="text-danger">Min length is 10 characters.</p>
                  )}
                </div>
                <Button id="contactSubmit" variant="primary" type="submit">
                  <i className="fas fa-paper-plane"></i> Send
                </Button>
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </>
=======
    <div>
      Ovo je kontakt stranica.
      <br />
    </div>
>>>>>>> 4d7b6c63c6b3b35a216f5890486ba4201520d65f
  );
}
