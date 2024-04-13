import React, { useState } from "react";
import Swal from "sweetalert2";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    image: null,
  });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price <= 0 || formData.quantity <= 0) {
      return Swal.fire({
        title: "Invalid Credentials",
        text: "Price or quantity must be greater than zero!",
      });
    }

    setLoading(true);
    const fdata = new FormData();
    const { name, description, category, price, quantity, image } = formData;

    fdata.append("imageUrl", image);
    fdata.append("name", name);
    fdata.append("description", description);
    fdata.append("category", category);
    fdata.append("quantity", quantity);
    fdata.append("price", price);

    const data = await fetch(
      `http://localhost:8000/merchandise/createproduct`,
      {
        method: "POST",
        body: fdata,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    const product = await data.json();
    console.log(product);

    if (product.error) {
      Swal.fire({
        title: product.error,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Product Added Successfully",
        icon: "success",
      });
    }

    setLoading(false);

    setFormData({
      name: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      image: null,
    });

    setFile(null);
  };

  return (
    <div
      className="max-w-[50vw] mx-auto  pt-[100px] pb-[5vh] p-8 bg-[#cbcbd9] rounded-lg shadow-lg"
      style={{
        background:
          "transparent linear-gradient(185deg, #29abe2 , #0071bc ) 30% 30%",
      }}
    >
      <div className="font-bold text-center text-white text-3xl">
        Add Product
      </div>
      <form
        className="w-full max-w-[50vw] mx-auto mt-[5vh]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-name"
              type="text"
              placeholder="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0 ">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              placeholder="Product Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-category"
            >
              Category
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-category"
              type="text"
              placeholder="Product Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              type="number"
              placeholder="Product Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-quantity"
            >
              Quantity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-quantity"
              type="number"
              placeholder="Product Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-image"
            >
              Image
            </label>

            <div className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <div>
                <input
                  id="grid-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full flex flex-wrap"
                />
              </div>
              {file && (
                <img
                  src={file}
                  alt=""
                  style={{
                    maxHeight: "175px",
                    minHeight: "175px",
                    width: "200px",
                    marginTop: "15px",
                  }}
                  className="mx-auto object-cover	"
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-[100%] bg-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {!loading ? (
            <span>Submit</span>
          ) : (
            <>
              {" "}
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...{" "}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
