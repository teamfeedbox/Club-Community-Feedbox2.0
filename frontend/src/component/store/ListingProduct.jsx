import React from 'react';

const ListingProduct = ({ product, listProduct }) => {
    // Initialize filteredProducts array
    const filteredProducts = [];

    // Check if listProduct is defined and has length
    if (listProduct && listProduct.length > 0) {
        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i]._id !== product._id) {
                filteredProducts.push(listProduct[i]);
                // Break if we have collected four unique products
                if (filteredProducts.length === 4) {
                    break;
                }
            }
        }
    }

    return (
        <div className="mt-8 mb-8 flex flex-wrap space-x-4">
            {filteredProducts.map(data => (
                <div key={data._id} className="h-48 w-32 bg-blue-500 border-2 border-dashed border-red-500" style={{ borderRadius: "15px" }}>
                    <div className="h-32" style={{ borderRadius: "15px 15px 0 0" }}>
                        <img src={data.imageUrl} alt='Product Image' style={{ borderRadius: "15px 15px 0 0", width: '100%', height: '100%' }} />
                    </div>
                    <div className="text-center">
                        <h7>{data.name}</h7><br />
                        <span>{data.price}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListingProduct;
