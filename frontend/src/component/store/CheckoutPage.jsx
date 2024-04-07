import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ModalWithForm = ({ show, onClose, product, quantity }) => {
  // const [message, setMessage] = useState({});
  // const [message2, setMessage2] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    size: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const priceAquantity = {
  //         price: product.price,
  //         quantity: quantity,
  //     };

  //     let message
  //     let message2

  //     console.log("-------->", product.price, quantity);
  //     //to fetch product details
  //     const callPurchase = async () => {
  //         let data = await fetch(http://localhost:8000/purchase/${product._id}, {
  //             method: "PUT",
  //             headers: {
  //                 Authorization: "Bearer " + localStorage.getItem("jwt"),
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(priceAquantity),
  //         });
  //         data = await data.json();
  //         message = {...data};
  //     };

  //     const emailBody = {
  //         name: formData.name,
  //         email: formData.email,
  //         size: formData.size,
  //     };

  //     const sendMail = async () => {
  //         let data = await fetch(http://localhost:8000/sendmail, {
  //             method: "POST",
  //             headers: {
  //                 Authorization: "Bearer " + localStorage.getItem("jwt"),
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(emailBody)
  //         });
  //         data = await data.json();
  //         console.log(data);
  //         message2 = {...data};
  //         console.log(message2);
  //     };

  //     callPurchase();

  //     if(message.status === true) {
  //         sendMail();

  //         Swal.fire({
  //             title: message.message,
  //             text : message2.message,
  //             icon : "success"
  //         })
  //     }
  //     else {
  //         console.log(message);
  //         Swal.fire({
  //             title: message.message,
  //             text : message2.message,
  //             icon : "error"
  //         })
  //     }

  //     console.log("Form Data Submitted: ", formData);
  //     // Clear the form
  //     setFormData({
  //         name: "",
  //         email: "",
  //         address: "",
  //         size: "",
  //     });
  //     onClose(); // Optionally close the modal on form submission
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // const priceAquantity = {
    //   price: product.price,
    //   quantity: quantity,
    // };

    // let message;
    // let message2;

    // console.log("-------->", product.price, quantity);

    // // Define callPurchase as an async function directly
    // const callPurchase = async () => {
    //   let data = await fetch(`http://localhost:8000/purchase/${product._id}`, {
    //     method: "PUT",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(priceAquantity),
    //   });
    //   return await data.json(); // Return the parsed JSON directly
    // };

    // const emailBody = {
    //   name: formData.name,
    //   email: formData.email,
    //   size: formData.size,
    // };

    // // Define sendMail as an async function directly
    // const sendMail = async () => {
    //   let data = await fetch(`http://localhost:8000/sendmail`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(emailBody),
    //   });
    //   return await data.json(); // Return the parsed JSON directly
    // };

    // const updateToSheet = async () => {
    //   let data = await fetch(
    //     `http://localhost:8000//uploadToSheet/${product._id}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       },
    //     }
    //   );
    //   return await data.json();
    // };

    // // Await the callPurchase function and then decide to call sendMail
    // try {
    //   message = await callPurchase();

    //   if (message.status === true) {
    //     message2 = await updateToSheet();

    //     if (message2.status === true) {
    //       const message3 = await sendMail();

    //       if (message3.status === true) {
    //         Swal.fire({
    //           title: message.message,
    //           text: message2.message,
    //           icon: "success",
    //         });
    //       }
    //     }
    //   } else {
    //     console.log(message);
    //     Swal.fire({
    //       title: message.message,
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error during the purchase or email send process:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "An error occurred. Please try again.",
    //     icon: "error",
    //   });
    // }

    const apiBody = {
      price: product.price,
      quantity: quantity,
      name: formData.name,
      email: formData.email,
      size: formData.size,
    };

    console.log(apiBody);

    const updateToSheet = async () => {
      let data = await fetch(
        `http://localhost:8000/submitProduct/${
          window.location.pathname.split("/")[
            window.location.pathname.split("/").length - 1
          ]
        }`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiBody),
        }
      );
      return await data.json();
    };

    const message = await updateToSheet();

    if (message.status === true) {
      Swal.fire({
        title: message.message,
        text: message.message2,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: message.message,
        icon: "error",
      });
    }

    setLoading(false);

    console.log("Form Data Submitted: ", formData);
    // Clear the form
    setFormData({
      name: "",
      email: "",
      address: "",
      size: "",
    });
    onClose(); // Optionally close the modal on form submission
  };

  // Check if Name, Email, and Address fields are not empty
  const isFormIncomplete =
    !formData.name || !formData.email || !formData.address;

  if (!show) {
    return null;
  }
  console.log(localStorage.getItem("jwt"));
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-70 h-200 border-solid border-2 border-sky-500 flex flex-col justify-center items-center mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {product.category === "cloth" && (
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Size
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={formData.size}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={
                !loading
                  ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  : "bg-green-500 text-white font-bold py-2 px-4 rounded"
              }
              disabled={loading || isFormIncomplete}
            >
              {!loading ? (
                <span>Submit</span>
              ) : (
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CheckoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
  const [product, setProduct] = useState();

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Prevent quantity from going below 1
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // useEffect(() => {
  //     async function fetchData() {
  //       // You can await here
  //       const response = await MyAPI.getData(someId);
  //       // ...
  //     }
  //     fetchData();
  //   },
  let id =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetch(`http://localhost:8000/getProduct/${id}`);
      const data = await productData.json();
      setProduct(data);
      console.log("106", product);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCoin = async () => {
      const coinData = await fetch(`http://localhost:8000/getCoins`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const coinsData = await coinData.json();
      console.log(coinsData);
    };
    fetchCoin();
  }, []);
  console.log(product);
  // let imgURL = product.imageUrl;
  // using  lg:justify-between for space
  return (
    <div className="parentDiv flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 xl:space-x-12 justify-center mt-12 px-5 py-5">
      {/* Adjustments for desktop: more spacing between elements and larger overall layout */}
      <div className="productImage w-full md:w-1/2 lg:w-2/5 xl:w-1/3 h-64 md:h-96 lg:h-auto bg-gray-200 border rounded shadow overflow-hidden">
        <img
          src={product && product.imageUrl}
          alt="product_img"
          className="w-full h-full "
        />
        {/* <img
                    src={imgURL}
                    className="w-full h-full "
                    alt=""
                /> */}
      </div>
      <div className="productDetail w-full md:w-1/2 lg:w-1/2 xl:w-1/3 h-auto bg-white shadow-md rounded-lg p-4 lg:p-8">
        <h1 className="py-4 text-xl md:text-2xl lg:text-3xl">
          Product Name: {!product ? "N/A" : product.name}
        </h1>
        <p className="py-1 text-base md:text-lg lg:text-xl">
          Product Description: {!product ? "N/A" : product.description}
        </p>
        <p className="py-1 text-sm md:text-base lg:text-lg">
          Coins need for product: {!product ? "N/A" : product.price}
        </p>
        {/* below code quantity button whole code and functionality is written */}
        {/* <div className="flex items-center  mt-4 lg:mt-8">
                        <button
                            onClick={decrement}
                            className="bg-sky-500 px-2 py-1 text-lg font-semibold border rounded-l lg:text-xl lg:px-4 lg:py-2"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            className="w-12 px-2 py-1 text-center border-t border-b lg:w-16 lg:px-4 lg:py-2 lg:text-xl"
                            readOnly
                            value={quantity}
                        />
                        <button
                            onClick={increment}
                            className="bg-sky-500 px-2 py-1 text-lg font-semibold border rounded-r lg:text-xl lg:px-4 lg:py-2"
                        >
                            +
                        </button>
                    </div> */}
        <div className="flex py-4 justify-center mt-4 lg:mt-8">
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 lg:py-3 lg:px-6 lg:text-xl"
          >
            Buy Now
          </button>
        </div>
      </div>
      {/* Modal Usage */}
      <ModalWithForm
        show={isModalOpen}
        onClose={toggleModal}
        product={product}
        quantity={quantity}
      >
        <p>
          This is a modal! Place your content here, such as a form or product
          details.
        </p>
      </ModalWithForm>
    </div>
  );
};
