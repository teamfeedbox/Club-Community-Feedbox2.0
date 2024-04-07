// import React, { useState, useEffect } from "react";
// import EditModal from "./EditModal";
// import "./ProductCard.css";
// import Vibrant from "node-vibrant";
// import Swal from "sweetalert2";

// const ProductCard = ({ product, setProducts, products, id }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [buttonColor, setButtonColor] = useState("#000"); // Default color

//   const handleDeleteClick = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Are you sure you want to delete this resource?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const deleteCall = await fetch(
//           `http://localhost:8000/merchandise/product/delete/${id}`,
//           {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("jwt"),
//             },
//           }
//         );

//         const response = await deleteCall.json();
//         console.log(response);

//         const updatedData = products.filter((item) => {
//           return item._id !== id;
//         });

//         setProducts([...updatedData]);

//         Swal.fire("Deleted!", response, "success");
//       }
//     });
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="card-content relative w-full mx-auto flex-col hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
//         <div className="w-full h-[278px]">
//           <img
//             className="w-full h-full object-contain"
//             // style={{  transform: "translate3d(0, 0, 1px )"}}
//             src={product.imageUrl}
//             alt=""
//             srcSet=""
//           />
//         </div>
//         <div className="mt-5 font-serif text-3xl mx-2 hover:underline">
//           {product.name}
//         </div>
//         <div className="my-2 price flex items-center justify-center gap-1">
//           <span className="font-serif text-xl">{product.price}</span>
//           <span className="material-symbols-outlined relative top-[2px]">
//             monetization_on
//           </span>
//         </div>
//         <button style={{ color: buttonColor }} onClick={openModal}>
//           <span className="material-symbols-outlined absolute top-1 right-0 z-10 opacity-100">
//             edit
//           </span>
//         </button>
//         <button style={{ color: buttonColor }} onClick={handleDeleteClick}>
//           <span className="material-symbols-outlined absolute top-1 right-8">
//             delete
//           </span>
//         </button>
//       </div>
//       <EditModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         product={product}
//         setProducts={setProducts}
//         products={products}
//         id={id}
//       />
//     </>
//   );
// };

// export default ProductCard;


import React, { useState, useEffect } from "react";
// import image from "./image.png";
import EditModal from "./EditModal";
import "./ProductCard.css";
import Vibrant from "node-vibrant";
import Swal from "sweetalert2";

const ProductCard = ({ product, setProducts, products, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("#000"); // Default color

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this resource?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteCall = await fetch(
          `http://localhost:8000/merchandise/product/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );

        const response = await deleteCall.json();
        console.log(response);

        const updatedData = products.filter((item) => {
          return item._id !== id;
        });

        setProducts([...updatedData]);

        Swal.fire("Deleted!", response, "success");
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card-content relative  mx-auto flex-wrap hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
        <div className="w-full h-[278px]">
          <img
            className="w-full h-full object-contain"
            // style={{  transform: "translate3d(0, 0, 1px )"}}
            src={product.imageUrl}
            alt=""
            srcSet=""
          />
        </div>
        <div className="mt-5 font-serif text-3xl mx-2 hover:underline">
          {product.name}
        </div>
        <div className="my-2 price flex items-center justify-center gap-1">
          <span className="font-serif text-xl">{product.price}</span>
          <span className="material-symbols-outlined relative top-[2px]">
            monetization_on
          </span>
        </div>
        <button style={{ color: buttonColor }} onClick={openModal}>
          <span className="material-symbols-outlined absolute top-1 right-0 z-10 opacity-100">
            edit
          </span>
        </button>
        <button style={{ color: buttonColor }} onClick={handleDeleteClick}>
          <span className="material-symbols-outlined absolute top-1 right-8">
            delete
          </span>
        </button>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
        setProducts={setProducts}
        products={products}
        id={id}
      />
    </>
  );
};

export default ProductCard;
