import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCategoryForm.css";
import { FaTimes } from "react-icons/fa";

function AddCategoryForm({ isOpen, closeForm, category, onCategoryAdd, onCategoryUpdate }) {
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isActive, setIsActive] = useState(category?.isActive !== undefined ? category.isActive : true);
  const [isFeatured, setIsFeatured] = useState(category?.isFeatured || false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    type: category?.type || "",
    properties: {
      hardness: category?.properties?.hardness || "",
      porosity: category?.properties?.porosity || "",
      origin: category?.properties?.origin || "",
      finish: category?.properties?.finish || ""
    },
    applications: category?.applications || "",
    priceRange: {
      min: category?.priceRange?.min || "",
      max: category?.priceRange?.max || ""
    },
    maintenance: category?.maintenance || "",
    availability: category?.availability || ""
  });

  // Category types for marble, granite, and tiles
  const categoryTypes = [
    { value: "marble", label: "Marble" },
    { value: "granite", label: "Granite" },
    { value: "tiles", label: "Tiles" },
    { value: "natural_stone", label: "Natural Stone" },
    { value: "engineered_stone", label: "Engineered Stone" }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        type: category.type,
        properties: {
          hardness: category.properties?.hardness || "",
          porosity: category.properties?.porosity || "",
          origin: category.properties?.origin || "",
          finish: category.properties?.finish || ""
        },
        applications: category.applications || "",
        priceRange: {
          min: category.priceRange?.min || "",
          max: category.priceRange?.max || ""
        },
        maintenance: category.maintenance || "",
        availability: category.availability || ""
      });
      setIsActive(category.isActive !== undefined ? category.isActive : true);
      setIsFeatured(category.isFeatured || false);
      if (category.image) {
        setImage(category.image);
      }
      if (category.galleryImages) {
        setGalleryImages(category.galleryImages || []);
      }
    }
  }, [category]);

  const handleImageChange = (e) => {
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

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      properties: {
        ...prevData.properties,
        [name]: value
      }
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      priceRange: {
        ...prevData.priceRange,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!formData.name.trim()) {
      alert("Please enter category name");
      return;
    }
    if (!formData.type) {
      alert("Please select category type");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter category description");
      return;
    }

    // Create category object for local state management
    const categoryData = {
      _id: category?._id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      properties: formData.properties,
      applications: formData.applications,
      priceRange: {
        min: parseFloat(formData.priceRange.min) || 0,
        max: parseFloat(formData.priceRange.max) || 0
      },
      maintenance: formData.maintenance,
      availability: formData.availability,
      isActive: isActive,
      isFeatured: isFeatured,
      image: null,
      galleryImages: []
    };

    // Handle main image
    if (image) {
      categoryData.image = {
        url: image instanceof File ? URL.createObjectURL(image) : (image?.url || image)
      };
    }

    // Handle gallery images
    categoryData.galleryImages = galleryImages.map(img => ({
      url: img instanceof File ? URL.createObjectURL(img) : (img?.url || img)
    }));

    try {
      if (category) {
        // Update existing category
        onCategoryUpdate(categoryData);
        alert("Category updated successfully");
      } else {
        // Add new category
        onCategoryAdd(categoryData);
        alert("Category added successfully");
      }
      closeForm();
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        type: "",
        properties: {
          hardness: "",
          porosity: "",
          origin: "",
          finish: ""
        },
        applications: "",
        priceRange: {
          min: "",
          max: ""
        },
        maintenance: "",
        availability: ""
      });
      setImage(null);
      setGalleryImages([]);
      setIsActive(true);
      setIsFeatured(false);
      
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to submit category");
    }
  };

  return (
    <div className={`add-category-form-container ${isOpen ? "open" : ""}`}>
      <div className="add-category-form mx-auto p-4">
        <FaTimes className="close-icon" onClick={closeForm} />
        <h2 className="text-center mb-4">{category ? "Edit Category" : "Add New Category"}</h2>
        
        <form onSubmit={handleSubmit} className="form">
          {/* Basic Category Information */}
          <div className="section-header">
            <h5 className="fw-bold text-primary mb-3">Basic Information</h5>
          </div>
          
          <div className="form-group">
            <label className="fw-bold">Category Name: <span className="text-danger">*</span></label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g., White Marble, Black Granite, Ceramic Tiles"
              required
            />
          </div>

          <div className="form-group">
            <label className="fw-bold">Category Type: <span className="text-danger">*</span></label>
            <select 
              name="type" 
              className="form-control" 
              value={formData.type} 
              onChange={handleChange}
              required
            >
              <option value="">Select category type</option>
              {categoryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Field 1: Category Description */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-success mb-3">📝 1. Category Description</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Category Description: <span className="text-danger">*</span></label>
            <textarea 
              name="description" 
              className="form-control" 
              value={formData.description} 
              onChange={handleChange}
              rows="4"
              placeholder="Detailed description of this category including characteristics, typical uses, and distinguishing features..."
              required
            />
            <small className="text-muted">Describe the category's characteristics, quality, and typical applications</small>
          </div>

          {/* Field 2: Properties */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-warning mb-3">🔧 2. Properties</h5>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">a) Hardness:</label>
                <select 
                  name="hardness" 
                  className="form-control" 
                  value={formData.properties.hardness} 
                  onChange={handlePropertyChange}
                >
                  <option value="">Select hardness level</option>
                  <option value="Very Soft (1-2)">Very Soft (1-2)</option>
                  <option value="Soft (3-4)">Soft (3-4)</option>
                  <option value="Medium (5-6)">Medium (5-6)</option>
                  <option value="Hard (7-8)">Hard (7-8)</option>
                  <option value="Very Hard (9-10)">Very Hard (9-10)</option>
                </select>
                <small className="text-muted">Mohs hardness scale rating</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">b) Porosity:</label>
                <select 
                  name="porosity" 
                  className="form-control" 
                  value={formData.properties.porosity} 
                  onChange={handlePropertyChange}
                >
                  <option value="">Select porosity level</option>
                  <option value="Low">Low (Dense, less absorption)</option>
                  <option value="Medium">Medium (Moderate absorption)</option>
                  <option value="High">High (Porous, high absorption)</option>
                </select>
                <small className="text-muted">Water absorption characteristics</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">c) Origin/Source:</label>
                <input 
                  type="text" 
                  name="origin" 
                  className="form-control" 
                  value={formData.properties.origin} 
                  onChange={handlePropertyChange}
                  placeholder="e.g., Italy, India, Brazil, China"
                />
                <small className="text-muted">Country or region of origin</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">d) Available Finishes:</label>
                <input 
                  type="text" 
                  name="finish" 
                  className="form-control" 
                  value={formData.properties.finish} 
                  onChange={handlePropertyChange}
                  placeholder="e.g., Polished, Honed, Brushed, Flamed"
                />
                <small className="text-muted">Common surface finishes available</small>
              </div>
            </div>
          </div>

          {/* Field 3: Applications */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-info mb-3">🏠 3. Applications</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Applications & Uses:</label>
            <textarea 
              name="applications" 
              className="form-control" 
              value={formData.applications} 
              onChange={handleChange}
              rows="3"
              placeholder="Kitchen countertops, flooring, wall cladding, bathroom vanities, outdoor applications, commercial spaces..."
            />
            <small className="text-muted">Specify where and how products in this category are commonly used</small>
          </div>

          {/* Field 4: Price Range */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-success mb-3">💰 4. Price Range</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">Minimum Price (₹/sq.ft):</label>
                <input 
                  type="number" 
                  name="min" 
                  className="form-control" 
                  value={formData.priceRange.min} 
                  onChange={handlePriceRangeChange}
                  min="0"
                  step="1"
                  placeholder="Minimum price per sq.ft"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-bold">Maximum Price (₹/sq.ft):</label>
                <input 
                  type="number" 
                  name="max" 
                  className="form-control" 
                  value={formData.priceRange.max} 
                  onChange={handlePriceRangeChange}
                  min="0"
                  step="1"
                  placeholder="Maximum price per sq.ft"
                />
              </div>
            </div>
          </div>

          {/* Field 5: Maintenance */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-danger mb-3">🧽 5. Maintenance</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Maintenance Guidelines:</label>
            <textarea 
              name="maintenance" 
              className="form-control" 
              value={formData.maintenance} 
              onChange={handleChange}
              rows="3"
              placeholder="Cleaning instructions, sealing requirements, do's and don'ts, recommended products..."
            />
            <small className="text-muted">Care and maintenance instructions for this category</small>
          </div>

          {/* Field 6: Availability */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-secondary mb-3">📦 6. Availability</h5>
          </div>
          <div className="form-group">
            <label className="fw-bold">Availability Information:</label>
            <textarea 
              name="availability" 
              className="form-control" 
              value={formData.availability} 
              onChange={handleChange}
              rows="2"
              placeholder="Stock status, lead times, seasonal availability, special order information..."
            />
            <small className="text-muted">Information about stock levels and availability</small>
          </div>

          {/* Category Status */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-purple mb-3">Category Status</h5>
          </div>
          <div className="d-flex gap-4 mb-4">
            <div className="form-group">
              <label className="fw-bold me-2">
                <input 
                  type="checkbox" 
                  className="me-2"
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)} 
                />
                Active Category
              </label>
            </div>
            <div className="form-group">
              <label className="fw-bold me-2">
                <input 
                  type="checkbox" 
                  className="me-2"
                  checked={isFeatured} 
                  onChange={(e) => setIsFeatured(e.target.checked)} 
                />
                Featured Category
              </label>
            </div>
          </div>

          {/* Main Image Section */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-primary mb-3">Category Image</h5>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <div className="image-upload-container">
              <label htmlFor="category-image-input" className="image-label">
                <div className="image-preview">
                  <img 
                    src={
                      image instanceof File 
                        ? URL.createObjectURL(image) 
                        : image?.url || "https://via.placeholder.com/120x120/e9ecef/6c757d?text=Upload+Image"
                    } 
                    alt="Category Preview" 
                  />
                </div>
              </label>
              <input
                id="category-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <p className="fw-bold text-center">Category Image</p>
            </div>
          </div>

          {/* Field 7: Gallery Section */}
          <div className="section-header mt-4">
            <h5 className="fw-bold text-warning mb-3">🖼️ 7. Gallery</h5>
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
            <small className="text-muted">Add sample images showcasing products from this category</small>
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
              <strong>Fields Summary:</strong>
            </p>
            <ul className="text-muted small mb-3">
              <li>✅ 1. Category Description - {formData.description ? '✓ Completed' : '❌ Required'}</li>
              <li>✅ 2. Properties - {Object.values(formData.properties).some(val => val) ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 3. Applications - {formData.applications ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 4. Price Range - {formData.priceRange.min || formData.priceRange.max ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 5. Maintenance - {formData.maintenance ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 6. Availability - {formData.availability ? '✓ Added' : '⚠️ Optional'}</li>
              <li>✅ 7. Gallery - {galleryImages.length > 0 ? `✓ ${galleryImages.length} images` : '⚠️ Optional'}</li>
            </ul>
            
            <button 
              type="submit" 
              className="btn btn-success text-light w-100 fw-bold py-3"
            >
              {category ? "Update Category" : "Add New Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;