import React, { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import CollectionList from "./components/CollectionList";
import { getProducts, addProduct } from "./services";
import './App.css';


function App() {
  const [products, setProducts] = useState([]);
  const [isActiveSales, setActiveSales] = useState([]); //store those products are on sale

    // useEffect() will call getProducts() when App is mounted on the DOM
    useEffect(()=>{
        getProducts().then((response) => {
          setProducts(response);
        }).catch((err) => {
            console.log(`Server error: ${err.message}`);
        })
    }, [])

    // const [updatedList, setUpdatedList] = useState([...products])

    //handle the checkbox
    const handleChange = (products)=>{
        const isActiveSales = products.filter(product => product.sales_price > 0);
        setActiveSales(isActiveSales);
      };

    //get the price of all products,
    const getPrice = (product) =>  product[`${isActiveSales ? 'sales_price': ''}price`]
  
    // onClick the order box a)sort the list b) update it 
    function orderPrice(event){

    //   const price = products.price;
      const option = event.target.value;

      if(option === 'priceAscent'){

        setProducts(...products.sort((a,b)=>(getPrice(a)-getPrice(b))));

      }else if(option === 'priceDescent'){

        setProducts(...products.sort((a,b)=>(getPrice(b)-getPrice(a))));

      }else if(option === 'recently'){
        // setUpdatedList(updatedList.sort((id1, id2)=>prod));
      }
    }


    const onAddProduct = (product) => {
        addProduct(product).then((response) => {
            setProducts(response);
          }).catch((err) => {
            console.log(`Server error: ${err.message}`);
          })
    };

  return (
    <div className="App">
            <h1>Amazing Fasion! Amaizng Price!</h1>

            <AddProductForm addProductCb={onAddProduct} />

            <h2>My Collection list</h2>
             
                  {/* <!-- Product Order Menu --> */}
                  <div className="container-table">
                      <form id="product-form" 
                            method="get" 
                            action-xhr="https://davestys.com/presentation/presentation/shopify/products.php">
                        
                        <div className="label">
                          <p>Order by:&nbsp;</p>
                        </div>
                        <div className="drop-box">
                          <select onChange ={orderPrice} className="category-box" name="prod-type" on="change:product-form.submit,product-list.hide">
                            <option value="recently">Recently</option>
                            <option value="priceAscent">Price ascent</option> 
                            <option value="priceDescent">Price descent</option>
                          </select>
                          <input 
                            type="checkbox" 
                            id="cbox2" 
                            value="onsales"
                            onChange={()=>handleChange(products)}
                            /> 
                            <label htmlFor="cbox2">Only product on sale</label>
                        </div>
                        {/* <div style="display:block;">&nbsp;</div> */}
                        
                        {/* <div submit-success template="product-template"></div> */}
      
                      </form>
                </div>

            <CollectionList 
                // isActivateSales={activeSales}
                products={products} 
                setProducts = {setProducts}
            />   
    </div>
  );
}

export default App;
