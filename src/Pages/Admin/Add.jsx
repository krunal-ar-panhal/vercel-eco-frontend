import React, { useContext, useState } from "react";
import { ProductContext } from "../../Context/productContext";
import { UserContext } from "../../Context/userContext";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const {token} = useContext(UserContext)

  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    images.forEach((image, idx) => {
      if (image) formData.append(`image${idx + 1}`, image);
    });

    const success = await addProduct(formData);
    if (success) {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestseller(false);
      setSizes([]);
      setImages([false, false, false, false]);
      window.location.reload();
    }
  };

  return (
    <div className="">
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <div>
        <p className="font-semibold mb-2">Upload Images</p>
        <div className="flex space-x-4">
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer">
              <img
                src={img ? URL.createObjectURL(img) : '/upload_area.png'}
                alt="upload"
                className="w-20 h-20 object-cover border border-gray-300 rounded-lg"
              />
              <input
                type="file"
                id={`image${idx + 1}`}
                hidden
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded-md"
        />
      </div>

      <div>
        <p className="font-semibold mb-2">Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border p-2 rounded-md"
        />
      </div>

      <div>
        <p className="font-semibold mb-2">Category</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded-md">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div>
        <p className="font-semibold mb-2">Sub Category</p>
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full border p-2 rounded-md">
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className="font-semibold mb-2">Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border p-2 rounded-md"
        />
      </div>

      <div>
        <p className="font-semibold mb-2">Sizes</p>
        <div className="flex space-x-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
              className={`cursor-pointer px-4 py-2 rounded-lg border ${
                sizes.includes(size) ? "bg-pink-100 border-pink-400" : "bg-gray-200 border-gray-300"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
          id="bestseller"
          className="h-4 w-4"
        />
        <label htmlFor="bestseller" className="font-semibold">Add to Bestseller</label>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        ADD
      </button>
    </form>
    </div>
  );
};

export default AddProduct;
