import React, { useState } from 'react';
import '../App.css';



const INIT_STATE = {
    id: '',
    itemId: '',
    name: '',
    price:'',
    img:'', 
    link: '', 
    sales_price: ''
};

function AddProductForm(props) {
    const [formData, setFormData] = useState(INIT_STATE);

    function handleSubmit(event) {
        event.preventDefault();
        props.addProductCb(formData);
        setFormData(INIT_STATE);
    }

    function handleChange(event) {
        let { name, value } = event.target;
        setFormData(data => ({
            ...data, 
            [name]: value
        }));
    }

    return (
        <form className="AddProductForm" onSubmit={handleSubmit}>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        Amazing Price
                        <img src="https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/smiling-face-with-heart-eyes_1f60d.gif" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"></img>
                    </a>
                 
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        value={formData.link}
                        onChange={handleChange} 
                        placeholder="Enter an url" 
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">Add to my list</button>
             
                </div>
            </nav>
        </form>
    );

}

export default AddProductForm;