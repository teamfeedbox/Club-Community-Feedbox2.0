// import React, { useEffect, useState } from "react";
// import "./ProductList.css";
// import ProductCard from "./ProductCard";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const allProducts = await fetch(
//         "http://localhost:8000/merchandise/getallproducts"
//       );
//       const data = await allProducts.json();
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <center>
//       <div className="mt-[20vh] mx-[5vw] mb-5">
//         <div className="cards-container grid grid-cols-4 gap-[10rem] w-full">
//           {products.map((product) => {
//             return <ProductCard product={product} setProducts={setProducts} products={products} id={product._id}/>;
//               })}
//         </div>
//       </div>
//     </center>
//   );
// };
// export default ProductList;



import React, { useEffect, useState } from "react";
// import image from "./image.png";
import "./ProductList.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetch(
        "http://localhost:8000/merchandise/getallproducts"
      );
      const data = await allProducts.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <center>
      <div className="mt-[20vh] mx-[5vw] mb-5">
        <div className="cards-container flex flex-wrap gap-[10rem] w-full">
          {products.map((product) => {
            return <ProductCard product={product} setProducts={setProducts} products={products} id={product._id}/>;
              })}
        </div>
      </div>
    </center>
  );
};
export default ProductList;
