import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const AddInputForm = (callback, validate) => {
  const initialFormState = {
    name: null,
    brand: null,
    category: null,
    year: null,
    price: null,
  };
  const [product, SetProduct] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    SetProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors(validate(product));
    setIsSubmitting(true);

    if (
      product.name &&
      product.brand &&
      product.category &&
      product.year &&
      product.price
    ) {
      axios
        .post("http://cbb.northeurope.cloudapp.azure.com:85/products", {
          productName: product.name,
          brandId: product.brand,
          categoryId: product.category,
          modelYear: product.year,
          listPrice: product.price,
        })
        .then((res) => {
          $("#modal").modal("show");
        })
        .catch((err) => console.log(err));
    } else {
      console.log(product);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleInputChange,
    handleSubmit,
    product,
    errors,
  };
};

export default AddInputForm;
