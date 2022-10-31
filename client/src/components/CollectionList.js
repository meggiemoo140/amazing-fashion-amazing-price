import React from 'react';
import '../App.css';

function CollectionList(props) {


    return (
        <div className="CollectionList">
  
        <ul>
          {
            props.products.map(p => (
              <li key={p.id}>
                <span onClick={p => (p.id)}>
                  <img src={p.img} alt=''/> {p.name} 
                  {
                    p.sales_price>0 ? 
                    <p className='salesPrice'><span className="badge text-bg-danger" >On sales!</span> {p.sales_price}€ now!</p> : 
                    <p> {p.price}€ Be patient!</p>
                  }
                </span>

                <a href={p.link}>
                <button className="btn btn-dark" type="button">
                  Buy
                </button>
                </a>

                <button  className="btn btn-outline-dark" onClick={() => {props.deleteProduct(p.id)}} type="button">
                  Delete X
                </button>
                
              </li>
            )) 
          }

        </ul>
      </div>
    );
}

export default CollectionList;