import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardCategory.css";
import AddCategoryForm from './AddCategoryForm';

const DashboardCategory = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;

  // Sample categories data with Unsplash images
  const sampleCategories = [
    {
      _id: '1',
      name: 'White Marble',
      type: 'marble',
      description: 'Premium white marble collection featuring various shades and patterns of white marble from around the world. Perfect for luxury interiors and architectural excellence.',
      properties: {
        hardness: 'Soft (3-4)',
        porosity: 'Medium',
        origin: 'Italy, India, Greece',
        finish: 'Polished, Honed, Brushed'
      },
      applications: 'Ideal for flooring, wall cladding, kitchen countertops, bathroom vanities, sculptures, and luxury interior designs. Perfect for hotels, offices, and residential spaces.',
      priceRange: {
        min: 200,
        max: 1500
      },
      maintenance: 'Regular sealing required every 6-12 months. Clean with pH-neutral cleaners. Avoid acidic substances like lemon juice or vinegar. Use marble-specific polishing compounds.',
      availability: 'Available year-round. Italian varieties may have seasonal availability. Custom sizes available with 2-3 weeks lead time.',
      image: { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    },
    {
      _id: '2',
      name: 'Black Granite',
      type: 'granite',
      description: 'Stunning collection of black granite with various patterns and finishes. Known for exceptional durability and timeless elegance that complements modern and contemporary designs.',
      properties: {
        hardness: 'Hard (7-8)',
        porosity: 'Low',
        origin: 'India, Brazil, South Africa',
        finish: 'Polished, Flamed, Leather'
      },
      applications: 'Perfect for kitchen countertops, bathroom vanities, flooring, wall cladding, commercial spaces, and high-traffic areas. Excellent for both indoor and outdoor applications.',
      priceRange: {
        min: 150,
        max: 800
      },
      maintenance: 'Low maintenance. Annual sealing recommended. Clean with stone-specific cleaners. Resistant to heat, scratches, and stains. Very durable for daily use.',
      availability: 'Excellent availability throughout the year. Various finishes in stock. Custom fabrication services available with quick turnaround times.',
      image: { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    },
    {
      _id: '3',
      name: 'Ceramic Tiles',
      type: 'tiles',
      description: 'Versatile ceramic tiles collection offering excellent durability, water resistance, and design flexibility. Available in numerous colors, patterns, and sizes for all applications.',
      properties: {
        hardness: 'Medium (5-6)',
        porosity: 'Low to Medium',
        origin: 'India, China, Italy',
        finish: 'Glazed, Matte, Textured'
      },
      applications: 'Suitable for bathroom walls, kitchen backsplash, floor tiles, commercial spaces, residential areas, and wet areas. Perfect for both wall and floor applications.',
      priceRange: {
        min: 25,
        max: 300
      },
      maintenance: 'Easy to clean and maintain. Regular cleaning with mild detergents. Grout sealing recommended annually. Stain and water resistant surface.',
      availability: 'Excellent stock availability. Wide range of sizes and designs. Quick delivery and installation services available nationwide.',
      image: { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    },
    {
      _id: '4',
      name: 'Red Granite',
      type: 'granite',
      description: 'Vibrant red granite collection featuring rich colors and natural patterns. Adds warmth and elegance to any space with its distinctive appearance and durability.',
      properties: {
        hardness: 'Hard (7-8)',
        porosity: 'Low',
        origin: 'India, Finland, China',
        finish: 'Polished, Flamed, Brushed'
      },
      applications: 'Excellent for outdoor applications, monuments, decorative walls, kitchen platforms, and commercial buildings. Weather-resistant and durable.',
      priceRange: {
        min: 120,
        max: 600
      },
      maintenance: 'Minimal maintenance required. Annual sealing for outdoor applications. Clean with stone cleaners. Highly resistant to weathering and fading.',
      availability: 'Good availability with seasonal variations. Custom cutting and finishing services available. Bulk orders processed efficiently.',
      image: { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: false
    },
    {
      _id: '5',
      name: 'Vitrified Tiles',
      type: 'tiles',
      description: 'Premium vitrified tiles offering superior strength, low water absorption, and exceptional durability. Available in various sizes and finishes for modern applications.',
      properties: {
        hardness: 'Hard (7-8)',
        porosity: 'Very Low',
        origin: 'India, Italy, Spain',
        finish: 'Polished, Matt, Rustic'
      },
      applications: 'Perfect for high-traffic areas, commercial spaces, residential flooring, outdoor applications, and areas requiring low maintenance solutions.',
      priceRange: {
        min: 40,
        max: 400
      },
      maintenance: 'Very low maintenance. Easy cleaning with regular floor cleaners. No sealing required. Stain and scratch resistant surface.',
      availability: 'Excellent availability throughout the year. Multiple size options in stock. Fast delivery and professional installation services.',
      image: { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    },
    {
      _id: '6',
      name: 'Green Marble',
      type: 'marble',
      description: 'Exotic green marble collection featuring unique patterns and natural beauty. Adds a distinctive character to interiors with its rich green tones and elegant veining.',
      properties: {
        hardness: 'Soft (3-4)',
        porosity: 'Medium',
        origin: 'India, Guatemala, Pakistan',
        finish: 'Polished, Honed, Antiqued'
      },
      applications: 'Ideal for feature walls, decorative elements, bathroom applications, luxury interiors, and artistic installations. Creates stunning visual impact.',
      priceRange: {
        min: 180,
        max: 900
      },
      maintenance: 'Regular sealing every 6-12 months. Use marble-specific cleaners. Avoid acidic cleaners. Professional polishing recommended annually.',
      availability: 'Limited seasonal availability. Pre-booking recommended for large projects. Custom cutting and finishing services available.',
      image: { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: false
    },
    {
      _id: '7',
      name: 'Porcelain Tiles',
      type: 'tiles',
      description: 'High-quality porcelain tiles offering exceptional durability and design versatility. Perfect for both residential and commercial applications with superior performance.',
      properties: {
        hardness: 'Very Hard (8-9)',
        porosity: 'Very Low',
        origin: 'Italy, Spain, India',
        finish: 'Polished, Matte, Textured'
      },
      applications: 'Excellent for high-end residential projects, commercial spaces, outdoor areas, wet areas, and applications requiring maximum durability.',
      priceRange: {
        min: 60,
        max: 500
      },
      maintenance: 'Minimal maintenance required. Easy cleaning with standard cleaners. No sealing needed. Highly resistant to stains and scratches.',
      availability: 'Good stock levels maintained. Premium imported varieties available on order. Professional installation services included.',
      image: { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    },
    {
      _id: '8',
      name: 'Mosaic Tiles',
      type: 'tiles',
      description: 'Artistic mosaic tiles collection offering creative design possibilities. Perfect for creating unique patterns and decorative elements in residential and commercial spaces.',
      properties: {
        hardness: 'Medium (5-6)',
        porosity: 'Low',
        origin: 'Italy, Turkey, India',
        finish: 'Glazed, Natural, Iridescent'
      },
      applications: 'Perfect for swimming pools, bathroom feature walls, kitchen backsplash, artistic installations, and decorative accent areas.',
      priceRange: {
        min: 80,
        max: 600
      },
      maintenance: 'Regular cleaning with mild cleaners. Grout sealing recommended. Avoid abrasive cleaners on glass mosaics. Professional installation recommended.',
      availability: 'Designer collections available on order. Custom patterns and colors possible. Installation guidance and support provided.',
      image: { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=250&fit=crop' },
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' }
      ],
      isActive: true,
      isFeatured: true
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setCategories(sampleCategories);
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Add new category function
  const handleAddCategory = (newCategory) => {
    const categoryWithId = {
      ...newCategory,
      _id: Date.now().toString(),
      image: newCategory.image ? { url: newCategory.image } : null,
      galleryImages: newCategory.galleryImages ? newCategory.galleryImages.map(img => ({ url: img })) : []
    };
    setCategories(prevCategories => [categoryWithId, ...prevCategories]);
  };

  // Update category function
  const handleUpdateCategory = (updatedCategory) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category._id === updatedCategory._id 
          ? {
              ...updatedCategory,
              image: updatedCategory.image ? { url: updatedCategory.image } : category.image,
              galleryImages: updatedCategory.galleryImages ? updatedCategory.galleryImages.map(img => ({ url: img })) : category.galleryImages
            }
          : category
      )
    );
  };

  // Delete category function
  const handleDeleteCategory = (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setCategories(categories.filter(category => category._id !== categoryId));
    alert("Category deleted successfully");
  };

  // Edit category handler
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditFormOpen(true);
  };

  // Close form handler
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditFormOpen(false);
    setCurrentCategory(null);
  };

  // View category details handler
  const viewCategoryDetails = (category) => {
    const galleryCount = category.galleryImages?.length || 0;
    const props = category.properties || {};
    const priceRange = category.priceRange || {};
    
    const detailsMessage = `
CATEGORY DETAILS
================

📋 DESCRIPTION:
${category.description || 'No description available'}

🔧 PROPERTIES:
• Hardness: ${props.hardness || 'Not specified'}
• Porosity: ${props.porosity || 'Not specified'}
• Origin: ${props.origin || 'Not specified'}
• Finish: ${props.finish || 'Not specified'}

🏠 APPLICATIONS:
${category.applications || 'Applications not specified'}

💰 PRICE RANGE:
Min: ₹${priceRange.min || 0}/sq.ft - Max: ₹${priceRange.max || 0}/sq.ft

🧽 MAINTENANCE:
${category.maintenance || 'Maintenance information not available'}

📦 AVAILABILITY:
${category.availability || 'Availability information not specified'}

🖼️ GALLERY:
Total Images: ${galleryCount} image(s)

📊 STATUS:
Active: ${category.isActive ? 'Yes' : 'No'}
Featured: ${category.isFeatured ? 'Yes' : 'No'}
    `;
    
    alert(detailsMessage);
  };

  // Enhanced search functionality for all fields
  const filteredCategories = categories.filter(category => {
    const searchLower = searchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchLower) ||
      category.type.toLowerCase().includes(searchLower) ||
      (category.description && category.description.toLowerCase().includes(searchLower)) ||
      (category.applications && category.applications.toLowerCase().includes(searchLower)) ||
      (category.maintenance && category.maintenance.toLowerCase().includes(searchLower)) ||
      (category.availability && category.availability.toLowerCase().includes(searchLower)) ||
      (category.properties?.hardness && category.properties.hardness.toLowerCase().includes(searchLower)) ||
      (category.properties?.porosity && category.properties.porosity.toLowerCase().includes(searchLower)) ||
      (category.properties?.origin && category.properties.origin.toLowerCase().includes(searchLower)) ||
      (category.properties?.finish && category.properties.finish.toLowerCase().includes(searchLower))
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  // Get category type badge color
  const getCategoryTypeColor = (type) => {
    switch(type) {
      case 'marble': return 'bg-primary';
      case 'granite': return 'bg-success';
      case 'tiles': return 'bg-warning';
      case 'natural_stone': return 'bg-info';
      case 'engineered_stone': return 'bg-secondary';
      default: return 'bg-dark';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="dashboard-title">Category Management Dashboard</h1>
              <p className="dashboard-subtitle">Manage marble, granite, and tiles categories</p>
            </div>
            <div className="col-md-4 text-md-end">
              <button 
                className="btn btn-primary btn-lg add-category-btn"
                onClick={() => setIsFormOpen(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4">
        {/* Search Only */}
        <div className="card filter-card mb-4">
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="search-box">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search in all fields (name, type, description, properties, applications...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Count and Pagination Info */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="categories-count mb-0">
            Showing {indexOfFirstCategory + 1}-{Math.min(indexOfLastCategory, filteredCategories.length)} of {filteredCategories.length} categories
          </p>
          {totalPages > 1 && (
            <p className="pagination-info mb-0">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Categories Display - Grid View Cards */}
        <div className="row g-4">
          {currentCategories.map(category => (
            <div key={category._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="card category-card h-100">
                <div className="category-image-container">
                  <img 
                    src={category.image?.url || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop"} 
                    alt={category.name}
                    className="card-img-top category-image"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  {category.isFeatured && (
                    <span className="featured-badge">
                      <i className="fas fa-star"></i> Featured
                    </span>
                  )}
                  {!category.isActive && (
                    <span className="inactive-badge">
                      <i className="fas fa-pause"></i> Inactive
                    </span>
                  )}
                </div>
                
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title category-name">{category.name}</h5>
                    <span className={`type-badge ${getCategoryTypeColor(category.type)}`}>
                      {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                    </span>
                  </div>
                  
                  <p className="card-text category-description">
                    {category.description ? category.description.substring(0, 80) + '...' : 'No description'}
                  </p>
                  
                  {/* Properties Preview */}
                  {category.properties && (
                    <div className="properties-preview mb-2">
                      <small className="text-muted">
                        <strong>Origin:</strong> {category.properties.origin || 'N/A'} | 
                        <strong> Hardness:</strong> {category.properties.hardness || 'N/A'}
                      </small>
                    </div>
                  )}

                  {/* Price Range */}
                  <div className="mb-2">
                    <small className="text-success fw-bold">
                      <i className="fas fa-rupee-sign"></i> ₹{category.priceRange?.min || 0} - ₹{category.priceRange?.max || 0}/sq.ft
                    </small>
                  </div>

                  {/* Gallery Count */}
                  <div className="mb-3">
                    <small className="text-info">
                      <i className="fas fa-images"></i> Gallery: {category.galleryImages?.length || 0} images
                    </small>
                  </div>
                  
                  {/* Action buttons with proper flex - push to bottom */}
                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <button 
                      className="btn btn-sm btn-outline-info flex-fill"
                      onClick={() => viewCategoryDetails(category)}
                      title="View All Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-primary flex-fill"
                      onClick={() => handleEditCategory(category)}
                      title="Edit Category"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger flex-fill"
                      onClick={() => handleDeleteCategory(category._id)}
                      title="Delete Category"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <nav aria-label="Category pagination">
              <ul className="pagination pagination-custom justify-content-center">
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left me-1"></i>
                    <span className="d-none d-sm-inline">Previous</span>
                  </button>
                </li>

                {/* First Page */}
                {currentPage > 3 && totalPages > 5 && (
                  <>
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageChange(1)}>
                        1
                      </button>
                    </li>
                    {currentPage > 4 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                  </>
                )}

                {/* Page Numbers */}
                {getPageNumbers().map(pageNumber => (
                  <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}

                {/* Last Page */}
                {currentPage < totalPages - 2 && totalPages > 5 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                      </button>
                    </li>
                  </>
                )}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <span className="d-none d-sm-inline">Next</span>
                    <i className="fas fa-chevron-right ms-1"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* No Categories Found */}
        {filteredCategories.length === 0 && (
          <div className="no-categories-container">
            <div className="no-categories-icon">🗂️</div>
            <h3 className="no-categories-title">No categories found</h3>
            <p className="no-categories-text">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* AddCategoryForm components */}
      {isFormOpen && (
        <AddCategoryForm 
          isOpen={isFormOpen} 
          closeForm={handleCloseForm}
          onCategoryAdd={handleAddCategory}
        />
      )}

      {isEditFormOpen && currentCategory && (
        <AddCategoryForm 
          isOpen={isEditFormOpen}
          closeForm={handleCloseForm}
          category={currentCategory}
          onCategoryUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default DashboardCategory;