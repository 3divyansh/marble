import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProductForm.css";
import { FaTimes } from "react-icons/fa";

function AddProductForm({ isOpen, closeForm, product, onProductAdd, onProductUpdate }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isChecked, setIsChecked] = useState(product?.newArrival || false);
  const [isChecked1, setIsChecked1] = useState(product?.bestSeller || false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category?._id || product?.category || "",
    description: product?.description || "",
    productEnquiry: product?.productEnquiry || "",
    specifications: {
      thickness: product?.specifications?.thickness || "",
      color: product?.specifications?.color || "",
      material: product?.specifications?.material || "",
      quality: product?.specifications?.quality || ""
    },
    usageArea: product?.usageArea || ""
  });

  // Mock categories for marble, granite, and tiles
  const mockCategories = [
    { _id: 'cat1', name: 'White Marble' },
    { _id: 'cat2', name: 'Black Granite' },
    { _id: 'cat3', name: 'Red Granite' },
    { _id: 'cat4', name: 'Green Marble' },
    { _id: 'cat5', name: 'Beige Marble' },
    { _id: 'cat6', name: 'Grey Granite' },
    { _id: 'cat7', name: 'Brown Granite' },
    { _id: 'cat8', name: 'Multi Color' },
    { _id: 'cat9', name: 'Ceramic Tiles' },
    { _id: 'cat10', name: 'Vitrified Tiles' },
    { _id: 'cat11', name: 'Porcelain Tiles' },
    { _id: 'cat12', name: 'Mosaic Tiles' },
    { _id: 'cat13', name: 'Floor Tiles' },
    { _id: 'cat14', name: 'Wall Tiles' },
    { _id: 'cat15', name: 'Designer Tiles' }
  ];

  // Set mock categories instead of API call
  useEffect(() => {
    if (isOpen) {
      setCategories(mockCategories);
      setLoadingCategories(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category?._id || product.category,
        description: product.description,
        productEnquiry: product.productEnquiry || "",
        specifications: {
          thickness: product.specifications?.thickness || "",
          color: product.specifications?.color || "",
          material: product.specifications?.material || "",
          quality: product.specifications?.quality || ""
        },
        usageArea: product.usageArea || ""
      });
      setIsChecked(product.newArrival || false);
      setIsChecked1(product.bestSeller || false);
      if (product.images) {
        setImage1(product.images[0] || null);
        setImage2(product.images[1] || null);
        setImage3(product.images[2] || null);
      }
      if (product.galleryImages) {
        setGalleryImages(product.galleryImages || []);
      }
    }
  }, [product]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(prevImages => [...prevImages, ...files]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      specifications: {
        ...prevData.specifications,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!formData.name.trim()) {
      alert("Please enter product name");
      return;
    }
    if (!formData.price) {
      alert("Please enter product price");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter product description");
      return;
    }

    // Create product object for local state management
    const productData = {
      _id: product?._id || Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: categories.find(cat => cat._id === formData.category) || { _id: formData.category, name: 'Unknown' },
      description: formData.description,
      productEnquiry: formData.productEnquiry,
      specifications: formData.specifications,
      usageArea: formData.usageArea,
      newArrival: isChecked,
      bestSeller: isChecked1,
      images: [],
      galleryImages: []
    };

    // Handle main images
    const mainImages = [image1, image2, image3].filter(img => img);
    productData.images = mainImages.map(img => ({
      url: img instanceof File ? URL.createObjectURL(img) : (img?.url || img)
    }));

    // Handle gallery images
    productData.galleryImages = galleryImages.map(img => ({
      url: img instanceof File ? URL.createObjectURL(img) : (img?.url || img)
    }));

    try {
      if (product) {
        // Update existing product
        onProductUpdate(productData);
        alert("Product updated successfully");
      } else {
        // Add new product
        onProductAdd(productData);
        alert("Product added successfully");
      }
      closeForm();
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        productEnquiry: "",
        specifications: {
          thickness: "",
          color: "",
          material: "",
          quality: ""
        },
        usageArea: ""
      });
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setGalleryImages([]);
      setIsChecked(false);
      setIsChecked1(false);
      
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to submit product");
    }
  };

  return (
    <div className={`add-product-form-container ${isOpen ? "open" : ""}`}>
      <div className="add-product-form mx-auto p-4">
        <FaTimes className="close-icon" onClick={closeForm} />
        <h2 className="text-center mb-4">{product ? "Edit Marble/Granite/Tiles" : "Add Marble/Granite/Tiles"}</h2>
        
        <form onSubmit={handleSubmit} className="form">
          {/* Basic Product Information */}
          <div className="section-header">
            <h5 className="fw-bold text-primary mb-3">Basic Information</h5>
          </div>
          
          <div className="form-group">
            <label className="fw-bold">Product Name: <span className="text-danger">*</span></label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g., Italian Carrara White Marble, Black Galaxy Granite, Premium Ceramic Tiles"
              required
            />
          </div>

          <div className="d-flex gap-3">
            <div className="form-group flex-grow-1">
              <label className="fw-bold">Price per sq.ft (₹): <span className="text-danger">*</span></label>
              <input 
                type="number" 
                name="price"
                className="form-control" 
                value={formData.price} 
                onChange={handleChange} 
                min="0"
                step="1"
                placeholder="Price per square feet"
                required
              />
            </div>
            <div className="form-group flex-grow-1">
              <label className="fw-bold">Category: <span className="text-danger">*</span></label>
              <select 
                name="category" 
                className="form-control" 
                value={formData.category} 
                onChange={handleChange}
                required
                disabled={loadingCategories}
              >
                <option value="">
                  {loadingCategories ? "Loading categories..." : "Select a category"}
                </option>
                {
                  categories && categories.length > 0 && categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Field 1: Product Description */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-success mb-3">📝 1. Product Description</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Product Description: <span className="text-danger">*</span></label>
            <textarea 
              name="description" 
              className="form-control" 
              value={formData.description} 
              onChange={handleChange}
              rows="4"
              placeholder="Detailed description of the marble/granite/tiles including origin, pattern, finish, unique features..."
              required
            />
            <small className="text-muted">Describe the appearance, origin, quality, and special features of this product</small>
          </div>

          {/* Field 2: Product Enquiry */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-info mb-3">💬 2. Product Enquiry</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Product Enquiry Information:</label>
            <textarea 
              name="productEnquiry" 
              className="form-control" 
              value={formData.productEnquiry} 
              onChange={handleChange}
              rows="3"
              placeholder="Installation details, bulk order discounts, warranty information, availability, special offers..."
            />
            <small className="text-muted">Include pricing details, offers, installation services, and customer support information</small>
          </div>

          {/* Field 3: Specifications */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-warning mb-3">🔧 3. Specifications</h5>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">a) Thickness:</label>
                <input 
                  type="text" 
                  name="thickness" 
                  className="form-control" 
                  value={formData.specifications.thickness} 
                  onChange={handleSpecificationChange}
                  placeholder="e.g., 15mm, 18mm, 20mm, 30mm"
                />
                <small className="text-muted">Available thickness options</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">b) Color/Pattern:</label>
                <input 
                  type="text" 
                  name="color" 
                  className="form-control" 
                  value={formData.specifications.color} 
                  onChange={handleSpecificationChange}
                  placeholder="e.g., Pure White, Black with Gold Flecks, Multi-color"
                />
                <small className="text-muted">Color and pattern description</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">c) Material Origin:</label>
                <input 
                  type="text" 
                  name="material" 
                  className="form-control" 
                  value={formData.specifications.material} 
                  onChange={handleSpecificationChange}
                  placeholder="e.g., Natural Italian Marble, Indian Granite, Premium Ceramic, Vitrified"
                />
                <small className="text-muted">Material type and origin</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">d) Quality Grade:</label>
                <select 
                  name="quality" 
                  className="form-control" 
                  value={formData.specifications.quality} 
                  onChange={handleSpecificationChange}
                >
                  <option value="">Select Quality Grade</option>
                  <option value="Premium">Premium (A+ Grade)</option>
                  <option value="Standard">Standard (A Grade)</option>
                  <option value="Commercial">Commercial (B Grade)</option>
                  <option value="Economy">Economy (C Grade)</option>
                </select>
                <small className="text-muted">Quality classification</small>
              </div>
            </div>
          </div>

          {/* Field 4: Usage Area */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-danger mb-3">🏠 4. Usage Area</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Usage Area & Applications:</label>
            <textarea 
              name="usageArea" 
              className="form-control" 
              value={formData.usageArea} 
              onChange={handleChange}
              rows="3"
              placeholder="Kitchen counters, flooring, wall cladding, bathroom vanities, commercial spaces, tiles applications..."
            />
            <small className="text-muted">Specify where and how this product can be used effectively</small>
          </div>

          {/* Product Status */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-secondary mb-3">Product Status</h5>
          </div>
          <div className="d-flex gap-4 mb-4">
            <div className="form-group">
              <label className="fw-bold me-2">
                <input 
                  type="checkbox" 
                  className="me-2"
                  checked={isChecked} 
                  onChange={(e) => setIsChecked(e.target.checked)} 
                />
                New Arrival
              </label>
            </div>
            <div className="form-group">
              <label className="fw-bold me-2">
                <input 
                  type="checkbox" 
                  className="me-2"
                  checked={isChecked1} 
                  onChange={(e) => setIsChecked1(e.target.checked)} 
                />
                Best Seller
              </label>
            </div>
          </div>

          {/* Main Images Section */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-primary mb-3">Main Product Images</h5>
          </div>

          <div className="d-flex gap-3 mb-4">
            {[image1, image2, image3].map((image, index) => (
              <div key={index} className="image-upload-container">
                <label htmlFor={`file-input-${index + 1}`} className="image-label">
                  <div className="image-preview">
                    <img 
                      src={
                        image instanceof File 
                          ? URL.createObjectURL(image) 
                          : image?.url || "https://via.placeholder.com/100x100/e9ecef/6c757d?text=Upload+Image"
                      } 
                      alt="Preview" 
                    />
                  </div>
                </label>
                <input
                  id={`file-input-${index + 1}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, [setImage1, setImage2, setImage3][index])}
                  style={{ display: "none" }}
                />
                <p className="fw-bold text-center">Image {index + 1}</p>
              </div>
            ))}
          </div>

          {/* Field 5: Gallery Section */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-purple mb-3">🖼️ 5. Gallery</h5>
          </div>

          <div className="form-group">
            <label className="fw-bold">Add Gallery Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImageChange}
              className="form-control"
            />
            <small className="text-muted">You can select multiple images at once for the product gallery</small>
          </div>

          {/* Gallery Preview */}
          {galleryImages.length > 0 && (
            <div className="gallery-preview mt-3">
              <h6 className="fw-bold">Gallery Preview ({galleryImages.length} images):</h6>
              <div className="d-flex flex-wrap gap-2">
                {galleryImages.map((image, index) => (
                  <div key={index} className="gallery-item position-relative">
                    <img
                      src={
                        image instanceof File 
                          ? URL.createObjectURL(image)
                          : image?.url || "https://via.placeholder.com/80"
                      }
                      alt={`Gallery ${index + 1}`}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      style={{ fontSize: "10px", padding: "2px 5px" }}
                      onClick={() => removeGalleryImage(index)}
                      title="Remove Image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4 p-3 bg-light rounded">
            <p className="mb-2 text-muted">
              <strong>Required Fields Summary:</strong>
            </p>
            <ul className="text-muted small mb-3">
              <li>✅ 1. Product Description - {formData.description ? '✓ Completed' : '❌ Required'}</li>
              <li>✅ 2. Product Enquiry - {formData.productEnquiry ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 3. Specifications - {Object.values(formData.specifications).some(val => val) ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 4. Usage Area - {formData.usageArea ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 5. Gallery - {galleryImages.length > 0 ? `✓ ${galleryImages.length} images` : '⚠️ Optional'}</li>
            </ul>
            
            <button 
              type="submit" 
              className="btn btn-success text-light w-100 fw-bold py-3"
              disabled={loadingCategories}
            >
              {product ? "Update Marble/Granite/Tiles Product" : "Add Marble/Granite/Tiles Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;