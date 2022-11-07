import { React, useEffect, useState } from "react";
import "./HomeView.css";
import { NavLink } from "react-router-dom";
import CollectionList from "../components/CollectionList";
import AddProductForm from "../components/AddProductForm";

function HomeView(props) {
  //let myMemoryProduct = props.memoryProduct;

  const [newProducts, setNewProducts] = useState([]);
  //const [memoryProduct, setMemoryProduct] = useState(myMemoryProduct); //store those products are on sa
  const [isChecked, setIsChecked] = useState(false);
  // const INIT_STATE = {
  //   id: "",
  //   itemId: "",
  //   name: "",
  //   price: "",
  //   img: "",
  //   link: "",
  //   sales_price: "",
  // };

  useEffect(() => {
    setNewProducts(props.products);
  });
  const handleChange = (event) => {
    let optionalProducts = [...props.memoryProduct];

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
      setNewProducts(optionalProducts.sort((a, b) => a[key] - b[key]));

      //else the menu is priceDescent, sort it in the descending order
    } else if (option === "priceDescent") {
      setNewProducts(optionalProducts.sort((a, b) => b[key] - a[key]));
    } else {
      setNewProducts(optionalProducts);
    }
  };

  // function AddProductForm(props) {
  //   //this is part of the navbar...
  //   const [formData, setFormData] = useState(INIT_STATE);

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     props.addProductCb(formData);
  //     setFormData(INIT_STATE);
  //   }
  //   function handleChange(event) {
  //     let { name, value } = event.target;
  //     setFormData((data) => ({
  //       ...data,
  //       [name]: value,
  //     }));
  //   }
  // }
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

  return (
    <div>
      <h1>HOME</h1>
      {/* <div className="wrapper">
        <h1>My Collection list</h1>
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
                  id="cbox2"
                  value="onsales"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <strong htmlFor="cbox2">Only product on sale</strong>
              </div>
            </div>
          </form>
        </div>  */}

      {/* <CollectionList
          products={products}
          setProducts={setProducts}
          deleteProduct={onDeleteProduct} */}
      {/* /> */}

      <AddProductForm addProductCb={props.onAddProduct} />

      <div className="wrapper">
        {/* <h1>My Collection list</h1> */}
        {/* <!-- Product Order Menu --> */}
        <div className="container-table">
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
                  id="cbox2"
                  value="onsales"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <strong htmlFor="cbox2">Only product on sale</strong>
              </div>
            </div>
          </form>
        </div>
        {/* <CollectionList
          products={products}
         // setProducts={setProducts}
          // deleteProduct={onDeleteProduct} */}
        {/* /> */}
      </div>
      <div className="tlist">
        <CollectionList
          products={newProducts}
          memoryProduct={props.memoryProduct}
          // setProducts={setProducts}
          //   deleteProduct={props.onDeleteProduct}
        />
      </div>
    </div>
  );
}
export default HomeView;
//export default AddProductForm;
