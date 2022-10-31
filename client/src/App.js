import React, { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import CollectionList from "./components/CollectionList";
import { getProducts, addProduct, deleteProduct } from "./services";
import './App.css';


function App() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]); //store those products are on sale
  const [isChecked, setIsChecked] = useState(false);

    // useEffect() will call getProducts() when App is mounted on the DOM
    useEffect(()=>{
        getProducts().then((response) => {
          setProducts(response);
          setFilterProducts([...response]);
        }).catch((err) => {
            console.log(`Server error: ${err.message}`);
        })
    }, [])

    //handle the checkbox
    const handleChange = (event)=>{
        //get the checkbox,find if it´s checked
        let optionalProducts;
        if(event.target.id === 'cbox2'){
            setIsChecked(!isChecked);
        }
        optionalProducts = event.target.checked ? products.filter(p=>p.sales_price>0):[...products];
        
        //if it´s checked, create an array to store the products or onsales products
        let key = (event.target.checked)? 'sales_price' : 'price';

        //get the value of menu
        let option = document.getElementById('menu').value;

        //if the menu is priceAscent, sort it in the ascending order
        if(option === 'priceAscent'){

            setFilterProducts(optionalProducts.sort((a,b)=>a[key]- b[key]));

            //else the menu is priceDescent, sort it in the descending order
          }else if(option === 'priceDescent'){
    
            setFilterProducts(optionalProducts.sort((a,b)=>b[key]- a[key]));
    
          }else{
            setFilterProducts(optionalProducts);
          }
        
      };


    const onAddProduct = (product) => {
        addProduct(product).then((response) => {
            setProducts(response);
          }).catch((err) => {
            console.log(`Server error: ${err.message}`);
          })
    };

    const onDeleteProduct = (id) => {
        deleteProduct(id).then((response) => {
            setProducts(response);
          }).catch((err) => {
            console.log(`Server error: ${err.message}`);
          })
    };
    

  return (
    <div className="App">

           

            <AddProductForm addProductCb={onAddProduct} />

            <h1>My Collection list</h1>
             
                  {/* <!-- Product Order Menu --> */}
                  <div className="container-table">
                      <form id="product-form" >
                        
                        <div className="label">
                          <p>Order by:&nbsp;</p>
                        </div>
                        <div className="drop-box">
                          <select 
                            id = "menu"
                            onChange = {handleChange} 
                            className = "category-box" name="prod-type" >
                            <option value = "recently">Recently</option>
                            <option value = "priceAscent">Price ascent</option> 
                            <option value = "priceDescent">Price descent</option>
                          </select>

                          <input 
                            type ="checkbox" 
                            id = "cbox2" 
                            value = "onsales"
                            checked = {isChecked}
                            onChange = {handleChange}
                            /> 
                            <label htmlFor="cbox2">Only product on sale</label>
                        </div>
        
      
                      </form>
                </div>

            <CollectionList 
                products={filterProducts} 
                setProducts = {setProducts}
                deleteProduct = {onDeleteProduct}
               
            />   
    </div>
  );
}

export default App;
