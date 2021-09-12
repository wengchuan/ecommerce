import React from 'react'
import ProductCard from './ProductCard'
function index({handleAddToCart}) {
    return (
        <div>
            <ProductCard handleAddToCart={handleAddToCart} />
        </div>
    )
}

export default index
