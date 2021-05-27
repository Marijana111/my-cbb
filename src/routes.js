import Products from "./Components/Products";
import Home from "./Components/Home";
import Customers from "./Components/Customers";
import Contact from "./Components/Contact";
import AddProduct from "./Components/AddProduct";
import AddCustomer from "./Components/AddCustomer";
import Categories from "./Components/Categories";
import { Link } from "react-router-dom";
import GoogleBtn from "./Components/GoogleBtn";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";

const routes = [
  {
    name: "Home",
    url: <Link to="/home"></Link>,
    component: Home,
  },
  {
    name: "Products",
    url: <Link to="/products"></Link>,
    component: Products,
  },
  {
    name: "Customers",
    url: <Link to="/customers"></Link>,
    component: Customers,
  },
  {
    name: "Contact",
    url: <Link to="/contact"></Link>,
    component: Contact,
  },
  {
    name: "AddProduct",
    url: <Link to="/addproduct"></Link>,
    component: AddProduct,
  },
  {
    name: "AddCustomer",
    url: <Link to="/addcustomer"></Link>,
    component: AddCustomer,
  },
  {
    name: "Categories",
    url: <Link to="/categories"></Link>,
    component: Categories,
  },
  {
    name: "Brands",
    url: <Link to="/brands"></Link>,
    component: Brands,
  },
  {
    name: "AddCategory",
    url: <Link to="/addcategory"></Link>,
    component: AddCategory,
  },
  {
    name: "AddBrand",
    url: <Link to="/addbrand"></Link>,
    component: AddBrand,
  },
  {
    name: "Login",
    url: <Link to="/login"></Link>,
    component: GoogleBtn,
  },
  {
    name: "Cart",
    url: <Link to="/cart"></Link>,
    component: Cart,
  },
  {
    name: "Checkout",
    url: <Link to="/checkout"></Link>,
    component: Checkout,
  },
];
export default routes;
