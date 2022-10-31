import React, { useState } from 'react';



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
            <label>
                <input
                    className='search input'
                    placeholder='Enter an url ' 
                    type="text"
                    value={formData.link}
                    onChange={handleChange} 
                />
            </label>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddProductForm;