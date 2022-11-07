import React, { useEffect, useState, useCallback } from "react";
import AddProductForm from "./components/AddProductForm";
import CollectionList from "./components/CollectionList";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./services";
import "./App.css";
import Login from "./Views/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeView from "./Views/HomeView";
import Local from "./helpers/Local";
import Api from "./helpers/Api";
import PrivateRoute from "./components/PrivateRoute";
import ErrorView from "./Views/ErrorView";
import MembersOnlyView from "./Views/MembersOnlyView";
import UsersView from "./Views/UsersView";
import ProfileView from "./Views/ProfileView";
import { FaBeer } from "react-icons/fa";

function App() {
  const [user, setUser] = useState(Local.getUser()); // should i use these names??
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [memoryProduct, setMemoryProduct] = useState([]); //store those products are on sale
  // const [isChecked, setIsChecked] = useState(false);
  // let memoryProduct = [];
  // useEffect() will call getProducts() when App is mounted on the DOM

  async function doLogin(email, password) {
    let myresponse = await Api.loginUser(email, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  //emulateChangePrice();
  const emulateChangePrice = useCallback((productList) => {
    const everyTen = [
      { itemId: "2111785", sales_price: 18.5 },
      { itemId: "37007732", sales_price: 9.9 },
      { itemId: "37057765", sales_price: 19.99 },
    ];

    const updateDataPost = ({ itemId, sales_price }) => {
      const product = productList.find((p) => p.itemId === itemId);

      if (product) {
        console.log(sales_price);
        updateProduct({ ...product, sales_price }).then((response) => {
          setProducts(response);
        });

        alert(
          `${product.name} is on sale now! Only ${sales_price}€.Go to buy it!`
        );
      }
    };

    let intervalsPassed = 0;

    const interval = setInterval(() => {
      const currentBucket = everyTen[intervalsPassed++];
      updateDataPost(currentBucket);
      if (intervalsPassed >= everyTen.length) {
        clearInterval(interval);
      }
    }, 1000 * 60);
  }, []);

  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response.length > 0) {
          setMemoryProduct(response);
          setProducts([...response]);
          emulateChangePrice(response);
        }

        // setFilterProducts([...response]);
      })
      .catch((err) => {
        console.log(`Server error: ${err.message}`);
      });
  }, [emulateChangePrice]);

  //handle the checkbox
  // const handleChange = (event) => {
  //   let optionalProducts = [...memoryProduct];

  //   let key = "price";
  //   //get the checkbox,find if it´s checked
  //   if (event.target.id === "cbox2") {
  //     setIsChecked(event.target.checked);
  //     optionalProducts = event.target.checked
  //       ? optionalProducts.filter((p) => p.sales_price > 0)
  //       : [...optionalProducts];
  //     key = event.target.checked ? "sales_price" : "price";
  //   }

  //   //if it´s checked, create an array to store the products or onsales products

  //   //get the value of menu
  //   let option = document.getElementById("menu").value;

  //   //if the menu is priceAscent, sort it in the ascending order
  //   if (option === "priceAscent") {
  //     setProducts(optionalProducts.sort((a, b) => a[key] - b[key]));

  //     //else the menu is priceDescent, sort it in the descending order
  //   } else if (option === "priceDescent") {
  //     setProducts(optionalProducts.sort((a, b) => b[key] - a[key]));
  //   } else {
  //     setProducts(optionalProducts);
  //   }
  // };

  const onAddProduct = (product) => {
    addProduct(product)
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => {
        console.log(`Server error: ${err.message}`);
      });
  };

  const onDeleteProduct = (id) => {
    deleteProduct(id)
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => {
        console.log(`Server error: ${err.message}`);
      });
  };

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView products={products} memoryProduct={memoryProduct} />
            }
          />
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/ProfileView"
            element={
              <PrivateRoute>
                <ProfileView />
              </PrivateRoute>
            }
          />
          <Route
            path="/members-only"
            element={
              <PrivateRoute>
                <MembersOnlyView />
              </PrivateRoute>
            }
          />
          <Route
            path="/Login"
            element={
              <Login
                loginCb={(e, p) => doLogin(e, p)}
                loginError={loginErrorMsg}
              />
            }
          />

          <Route
            path="*"
            element={<ErrorView code="404" text="Page not found" />}
          />
        </Routes>

        {/* <div className="wrapper">
        {/* <h1>My Collection list</h1> */}
        {/* <!-- Product Order Menu --> */}
        {/* <div className="container-table">
          <form id="products-form">
            <div className="orderList">
              <strong>Order by:</strong>
            </div>
            <div className="drop-box">
              <select
                id="menu"
                onChange={handleChange}
                className="category-box"
                name="prod-type"
              >
                <option value="recently">Recently</option>
                <option value="priceAscent">Price ascent</option>
                <option value="priceDescent">Price descent</option>
              </select>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="cbox2" */}
        {/* value="onsales"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <strong htmlFor="cbox2">Only product on sale</strong>
              </div>
            </div>
          </form>
        </div> */}
        {/* <CollectionList
          products={products}
         // setProducts={setProducts}
          // deleteProduct={onDeleteProduct} */}
        {/* /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
