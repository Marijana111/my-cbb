import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Customers from "./Components/Customers";
import Contact from "./Components/Contact";
import AddProduct from "./Components/AddProduct";
import ThemeContextProvider from "./context/ThemeContext";
import AddCustomer from "./Components/AddCustomer";
import Categories from "./Components/Categories";
import Brands from "./Components/Brands";
import AddCategory from "./Components/AddCategory";
import AddBrand from "./Components/AddBrand";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";
import AuthContextProvider from "./context/AuthContext";
import Cart from "./Components/Cart";
import CartContextProvider from "./context/CartContext";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Router>
              <header>
                <Navbar />
              </header>

              <main role="main" className="container-fluid">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/home" component={Home} />
                  <Route path="/products" component={Products} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/contact" component={Contact} />
                  <PrivateRoute path="/addproduct" component={AddProduct} />
                  <PrivateRoute path="/addcustomer" component={AddCustomer} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/brands" component={Brands} />
                  <PrivateRoute path="/addcategory" component={AddCategory} />
                  <PrivateRoute path="/addbrand" component={AddBrand} />
                  <Route path="/login" component={Login} />
                  <Route path="/checkout" component={Checkout} />
                </Switch>
              </main>

              <Footer />
            </Router>
          </CartContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
