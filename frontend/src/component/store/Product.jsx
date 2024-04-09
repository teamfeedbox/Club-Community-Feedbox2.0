import React, { useState } from "react";
import "./Product.css";
import BuyNow from "./BuyNow";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";

const Product = ({ product }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false); // New state for BuyNow modal
  // const [quantity, setQuantity] = useState(1);

  // console.log(product);

  // const toggleModal = () => setIsModalOpen(!isModalOpen);

  // const incrementQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);

  // const decrementQuantity = () => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  // const handleBuyNowClick = () => {
  //   setIsModalOpen(false); // Close the current modal
  //   setIsBuyNowModalOpen(true); // Open the BuyNow modal
  // };

  return (
    // <div>
    //   <Link to={`product/${product._id}`} className="no-underline">
    //     <div className="product-card">
    //       <img
    //         src={product.imageUrl}
    //         alt={product.name}
    //         className="product-image"
    //       />
    //       <div className="product-info">
    //         <h5>{product.name}</h5>
    //         <div className="flex items-center justify-center text-black">
    //           <span>{product.price}</span>
    //           <span className="material-symbols-outlined relative">
    //             monetization_on
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    //   {/* {isModalOpen && (
    //     <div className="modal" style={{ display: isModalOpen ? "block" : "none" }}>
    //       <div className="modal-content custom-modal">
    //         <span className="close" onClick={toggleModal}>
    //           <img src={Close} alt="Close" className="closeIcon" />
    //         </span>
    //         <div className="productModal">
    //           <img src={product.imageUrl} alt="productIMG" className="modalImage" />
    //           <div className="productInfo">
    //             <p className="editModal">Product: {product.name}</p>
    //             <p className="editModal">Price: ${product.price}</p>
    //             <p className="editModal">Description: {product.description}</p>
    //             <div className="quantity-selector">
    //               Quantity: &nbsp; &nbsp;
    //               <button className="quantitySelect" onClick={decrementQuantity}>-</button>
    //               <span className="quantity-display quantitySelect">{quantity}</span>
    //               <button className="quantitySelect" onClick={incrementQuantity}>+</button>
    //             </div>
    //             <button className="buyNow" onClick={handleBuyNowClick}><span className="btn-text">Buy Now</span></button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )} */}
    //   {/* {isBuyNowModalOpen && <BuyNow show={isBuyNowModalOpen} onHide={() => setIsBuyNowModalOpen(false)} product={product} quantity={quantity} />} */}
    // </div>

    <MDBCol md="6" lg="4" className="mb-4">
      <MDBRipple
        rippleColor="dark"
        rippleTag="div"
        className="bg-image rounded hover-zoom shadow-1-strong mb-auto h-full"
      >
        <img
          src={product.imageUrl}
          fluid
          className="w-100 md:h-[50vh] sm:h-[75vh]"
        />
       <Link to={`product/${product._id}`} className="no-underline">
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <div className="d-flex justify-content-start align-items-start h-100">
              <h5>
                <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                  ${product.price}
                </span>
              </h5>
            </div>
          </div>
          <div className="hover-overlay">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </div>
        </Link>
      </MDBRipple>
    </MDBCol>
  );
};

export default Product;
