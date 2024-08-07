import React from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {
    let { productID } = useParams();

    console.log('productID', productID);


    return (
        <div>Product</div>
    )
}

export default Product