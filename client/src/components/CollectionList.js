import React from "react";
import "../App.css";

function CollectionList(props) {
  return (
    <div className="CollectionList">
      <hr></hr>

      <h1>My Collection list</h1>

      <div className="shop">
        {/* <div className='box'> */}
        <ul>
          {props.products.map((p) => (
            <li key={p.id}>
              <img className="productImg" src={p.img} alt="" />
              <div className="content">
                <h3> {p.name} </h3>
                {p.sales_price > 0 ? (
                  <h4 className="salesPrice">
                    <span className="badge text-bg-danger">On sales!</span>{" "}
                    {p.sales_price}€ now!
                  </h4>
                ) : (
                  <h4> {p.price}€ Be patient!</h4>
                )}

                <p className="btn-area">
                  <a className="hate" href={p.link}>
                    <button className="btn btn-dark" type="button">
                      Buy
                    </button>
                  </a>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                      props.deleteProduct(p.id);
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // </div>
  );
}

export default CollectionList;
