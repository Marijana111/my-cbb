export default function validateInput(product) {
  let errors = {};
  if (!product.name) {
    errors.name = "Enter product name!";
  } else if (product.name.length < 5) {
    errors.name = "Needs to be more than 5 characters!";
  }
  if (!product.year) {
    errors.year = "Enter product year!";
  } else if (product.year.length > 4) {
    errors.year = "Year needs to be less than 4 characters!";
  }
  if (!product.price) {
    errors.price = "Enter product price!";
  } else if (isNaN(product.price)) {
    errors.price = "Please enter valid number!";
  }
  return errors;
}
