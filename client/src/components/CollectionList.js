import React from 'react';
import { deleteProduct } from '../services';

function CollectionList({products, setProducts}) {

  const onDeleteProduct = (id) => {
    deleteProduct(id).then((response) => {
        setProducts(response);
      }).catch((err) => {
        console.log(`Server error: ${err.message}`);
      })
};

    return (
        <div className="CollectionList">
  
        <ul>
          {products.map(p => (
            <li key={p.id}>
              <span onClick={p => (p.id)}>
                <img src={p.img} alt=''/> {p.name} {p.price} {p.sales_price}
              </span>

              <button onClick={() => {onDeleteProduct(p.id)}} type="button">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default CollectionList;