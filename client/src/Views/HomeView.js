import React, { useEffect, useState, useCallback } from "react";
import "./HomeView.css";
import CollectionList from "../components/CollectionList";

function HomeView() {
  const [products, setProducts] = useState([]);
  const [memoryProduct, setMemoryProduct] = useState([]); //store those products are on sale
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    let optionalProducts = [...memoryProduct];

    let key = "price";
    //get the checkbox,find if it´s checked
    if (event.target.id === "cbox2") {
      setIsChecked(event.target.checked);
      optionalProducts = event.target.checked
        ? optionalProducts.filter((p) => p.sales_price > 0)
        : [...optionalProducts];
      key = event.target.checked ? "sales_price" : "price";
    }

    //if it´s checked, create an array to store the products or onsales products

    //get the value of menu
    let option = document.getElementById("menu").value;

    //if the menu is priceAscent, sort it in the ascending order
    if (option === "priceAscent") {
      setProducts(optionalProducts.sort((a, b) => a[key] - b[key]));

      //else the menu is priceDescent, sort it in the descending order
    } else if (option === "priceDescent") {
      setProducts(optionalProducts.sort((a, b) => b[key] - a[key]));
    } else {
      setProducts(optionalProducts);
    }
  };
  return (
    <div>
      <h1>HOME Views</h1>
      <div className="wrapper">
        <h1>My Collection list</h1>

        {/* <!-- Product Order Menu --> */}
        <div className="container-table">
          <form id="product-form">
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
                  id="cbox2"
                  value="onsales"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <strong htmlFor="cbox2">Only product on sale</strong>
              </div>
              <CollectionList />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HomeView;
