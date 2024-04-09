import React, { useState,useEffect } from 'react';
import Product from './Product';
import banner from './banner.jpeg';
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";


const App = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetch(
        `http://localhost:8000/merchandise/getallproducts`
      );
      const data = await allProducts.json();
      setProducts(data);
    };

    console.log(process.env)

    fetchProducts();
  }, [])
  

  // const deleteProduct = (id) => {
  //   setProducts(products.filter(product => product.id !== id));
  // }

  // const editProduct = (product) => {
  //   console.log('Edit product:', product);
  //   // Implementation for edit functionality
  // }

  console.log(localStorage.getItem('user'));

  return (
    // <div className='w-[100vw]'>
    // <div className="mx-auto w-full mt-[25vh] min-h-full flex flex-wrap justify-center gap-5">
    
    //   {products.map(product => (
    //     <Product
    //       key={product._id}
    //       product={product}
    //       // onDelete={deleteProduct}
    //       // onEdit={editProduct}
    //       />
    //       ))}
    //       </div>
    // </div>

    <MDBContainer fluid className="my-[90px] text-center w-full">
      <div className='banner-image w-full'>
        <img src={banner} className='w-full' alt="" srcset="" />
      </div>

      <h4 className="mt-4 mb-5">
        <strong>Product Listing</strong>
      </h4>

      <MDBRow>
        {products.map(product => (
        <Product
          key={product._id}
          product={product}
          // onDelete={deleteProduct}
          // onEdit={editProduct}
          />
          ))}
        </MDBRow>
        </MDBContainer>
  );
}

export default App;
