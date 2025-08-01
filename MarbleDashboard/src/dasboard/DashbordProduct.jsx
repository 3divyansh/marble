import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashbordProduct.css";
import AddProductForm from './AddProductForm';

const DashbordProduct = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Sample data with Unsplash images
  const sampleProducts = [
    {
      _id: '1',
      name: 'Italian Carrara White Marble',
      price: 850,
      category: { _id: 'cat1', name: 'White Marble' },
      description: 'Premium quality Italian Carrara white marble with elegant veining pattern. Perfect for luxury interiors and architectural applications.',
      productEnquiry: 'Available in various sizes and finishes. Bulk orders get 15% discount. Free installation within city limits. Professional cutting and polishing services available.',
      specifications: {
        thickness: '18mm, 20mm, 25mm',
        color: 'Pure White with Grey Veins',
        material: 'Natural Italian Marble',
        quality: 'Premium'
      },
      usageArea: 'Ideal for flooring, wall cladding, kitchen countertops, bathroom vanities, and luxury interiors. Perfect for hotels, offices, and residential spaces.',
      images: [{ url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: true
    },
    {
      _id: '2',
      name: 'Black Galaxy Granite',
      price: 650,
      category: { _id: 'cat2', name: 'Black Granite' },
      description: 'Stunning black granite with golden specks that sparkle like stars in the night sky. Highly durable and perfect for modern designs.',
      productEnquiry: 'Available in slabs and tiles. Custom cutting service available. 2-year warranty on installation. Waterjet cutting facility for intricate designs.',
      specifications: {
        thickness: '15mm, 20mm, 30mm',
        color: 'Deep Black with Golden Flecks',
        material: 'Natural Indian Granite',
        quality: 'Premium'
      },
      usageArea: 'Perfect for kitchen platforms, bathroom counters, dining tables, and commercial spaces. Highly durable and stain-resistant. Suitable for high-traffic areas.',
      images: [{ url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop' }
      ],
      newArrival: false,
      bestSeller: true
    },
    {
      _id: '3',
      name: 'Premium Ceramic Floor Tiles',
      price: 120,
      category: { _id: 'cat9', name: 'Ceramic Tiles' },
      description: 'High-quality ceramic floor tiles with excellent durability and water resistance. Available in multiple designs and patterns for modern homes.',
      productEnquiry: 'Available in boxes of 10 pieces. Bulk orders get special pricing. Free samples available. Professional laying service with 5-year warranty.',
      specifications: {
        thickness: '8mm, 10mm, 12mm',
        color: 'Multiple Colors Available',
        material: 'Premium Ceramic',
        quality: 'Premium'
      },
      usageArea: 'Perfect for residential and commercial flooring, bathrooms, kitchens, living rooms. Suitable for indoor applications with high foot traffic.',
      images: [{ url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: true
    },
    {
      _id: '4',
      name: 'Makrana White Marble',
      price: 450,
      category: { _id: 'cat1', name: 'White Marble' },
      description: 'Pure Makrana white marble, the same stone used in Taj Mahal construction. Timeless elegance with superior quality and heritage value.',
      productEnquiry: 'Available in different grades. Antique finish and modern polish both available. Export quality available. Historical significance adds premium value.',
      specifications: {
        thickness: '16mm, 18mm, 20mm',
        color: 'Pure Milky White',
        material: 'Natural Makrana Marble',
        quality: 'Standard'
      },
      usageArea: 'Excellent for temple construction, luxury homes, heritage buildings, and premium interiors. Perfect for sculptures and decorative elements.',
      images: [{ url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: false
    },
    {
      _id: '5',
      name: 'Vitrified Tiles - Wood Finish',
      price: 180,
      category: { _id: 'cat10', name: 'Vitrified Tiles' },
      description: 'Premium vitrified tiles with realistic wood finish. Combines the beauty of wood with the durability of tiles. Water-resistant and easy to maintain.',
      productEnquiry: 'Available in 600x600mm and 800x800mm sizes. Anti-skid surface available. Suitable for both indoor and outdoor use. Installation guidance provided.',
      specifications: {
        thickness: '8mm, 10mm',
        color: 'Wood Brown with Natural Grain',
        material: 'Vitrified Ceramic',
        quality: 'Premium'
      },
      usageArea: 'Ideal for living rooms, bedrooms, offices, restaurants, and commercial spaces. Perfect for those who want wood look without maintenance.',
      images: [{ url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: false
    },
    {
      _id: '6',
      name: 'Red Multi Granite',
      price: 280,
      category: { _id: 'cat3', name: 'Red Granite' },
      description: 'Beautiful red granite with multi-color patterns. Durable and affordable option for various applications with attractive natural variations.',
      productEnquiry: 'Available in both polished and flamed finish. Custom sizes available on order. Installation team available. Cost-effective solution for large projects.',
      specifications: {
        thickness: '15mm, 20mm',
        color: 'Red with Multi-color Patterns',
        material: 'Natural Indian Granite',
        quality: 'Standard'
      },
      usageArea: 'Suitable for outdoor flooring, garden paths, commercial buildings, and budget-friendly residential projects. Weather-resistant and low maintenance.',
      images: [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8YQGCS5W_Abv-vkwFhV2529QEuCPbKFORw&s' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' }
      ],
      newArrival: false,
      bestSeller: false
    },
    {
      _id: '7',
      name: 'Porcelain Wall Tiles',
      price: 95,
      category: { _id: 'cat11', name: 'Porcelain Tiles' },
      description: 'High-quality porcelain wall tiles with smooth finish and excellent water absorption properties. Perfect for bathroom and kitchen walls.',
      productEnquiry: 'Available in 300x450mm and 300x600mm sizes. Matching border tiles available. Grouting service included. Easy cleaning and maintenance.',
      specifications: {
        thickness: '7mm, 9mm',
        color: 'White, Cream, Light Grey',
        material: 'Porcelain Ceramic',
        quality: 'Standard'
      },
      usageArea: 'Excellent for bathroom walls, kitchen backsplash, interior wall cladding, and wet areas. Suitable for residential and commercial use.',
      images: [{ url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }
      ],
      newArrival: false,
      bestSeller: true
    },
    {
      _id: '8',
      name: 'Green Forest Marble',
      price: 380,
      category: { _id: 'cat4', name: 'Green Marble' },
      description: 'Exotic green marble with forest-like patterns. Adds natural beauty to any space with unique veining and rich color variations.',
      productEnquiry: 'Limited stock available. Pre-booking recommended. Waterjet cutting facility available. Special finishing options for premium applications.',
      specifications: {
        thickness: '18mm, 20mm',
        color: 'Forest Green with Dark Veins',
        material: 'Natural Indian Marble',
        quality: 'Premium'
      },
      usageArea: 'Perfect for feature walls, reception areas, luxury bathrooms, and statement flooring. Creates stunning visual impact in interior design.',
      images: [{ url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: false
    },
    {
      _id: '9',
      name: 'Designer Mosaic Tiles',
      price: 220,
      category: { _id: 'cat12', name: 'Mosaic Tiles' },
      description: 'Premium designer mosaic tiles with intricate patterns and multiple color combinations. Perfect for creating artistic feature walls and decorative elements.',
      productEnquiry: 'Available in sheets for easy installation. Custom patterns available on order. Professional design consultation included. Suitable for both indoor and outdoor use.',
      specifications: {
        thickness: '4mm, 6mm',
        color: 'Multi-color Designer Patterns',
        material: 'Glass & Ceramic Mix',
        quality: 'Premium'
      },
      usageArea: 'Ideal for swimming pool areas, bathroom feature walls, kitchen backsplash, bar counters, and artistic interior designs.',
      images: [{ url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop' }
      ],
      newArrival: true,
      bestSeller: true
    },
    {
      _id: '10',
      name: 'Absolute Black Granite',
      price: 420,
      category: { _id: 'cat2', name: 'Black Granite' },
      description: 'Pure absolute black granite with mirror finish. Most popular choice for modern kitchens and contemporary architectural designs.',
      productEnquiry: 'Available in jumbo slabs. Edge polishing included. Maintenance kit provided free. Professional installation with lifetime support.',
      specifications: {
        thickness: '20mm, 30mm',
        color: 'Deep Absolute Black',
        material: 'Natural Indian Granite',
        quality: 'Premium'
      },
      usageArea: 'Ideal for kitchen countertops, modern interiors, commercial spaces, and contemporary designs. Perfect for minimalist and luxury applications.',
      images: [{ url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop' }],
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=300&h=200&fit=crop' }
      ],
      newArrival: false,
      bestSeller: true
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Add new product function
  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      _id: Date.now().toString(),
      images: newProduct.images ? newProduct.images.map(img => ({ url: img })) : [],
      galleryImages: newProduct.galleryImages ? newProduct.galleryImages.map(img => ({ url: img })) : []
    };
    setProducts(prevProducts => [productWithId, ...prevProducts]);
  };

  // Update product function
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === updatedProduct._id 
          ? {
              ...updatedProduct,
              images: updatedProduct.images ? updatedProduct.images.map(img => ({ url: img })) : product.images,
              galleryImages: updatedProduct.galleryImages ? updatedProduct.galleryImages.map(img => ({ url: img })) : product.galleryImages
            }
          : product
      )
    );
  };

  // Delete product function
  const handleDeleteProduct = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setProducts(products.filter(product => product._id !== productId));
    alert("Product deleted successfully");
  };

  // Edit product handler
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditFormOpen(true);
  };

  // Close form handler
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditFormOpen(false);
    setCurrentProduct(null);
  };

  // View product details handler
  const viewProductDetails = (product) => {
    const galleryCount = product.galleryImages?.length || 0;
    const specs = product.specifications || {};
    
    const detailsMessage = `
PRODUCT DETAILS
================

📋 DESCRIPTION:
${product.description || 'No description available'}

💬 ENQUIRY INFORMATION:
${product.productEnquiry || 'No enquiry information available'}

🔧 SPECIFICATIONS:
• Thickness: ${specs.thickness || 'Not specified'}
• Color: ${specs.color || 'Not specified'}
• Material: ${specs.material || 'Not specified'}
• Quality: ${specs.quality || 'Not specified'}

🏠 USAGE AREA:
${product.usageArea || 'Usage area not specified'}

🖼️ GALLERY:
Total Images: ${galleryCount} image(s)
    `;
    
    alert(detailsMessage);
  };

  // Enhanced search functionality for all fields
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      (product.description && product.description.toLowerCase().includes(searchLower)) ||
      (product.productEnquiry && product.productEnquiry.toLowerCase().includes(searchLower)) ||
      (product.usageArea && product.usageArea.toLowerCase().includes(searchLower)) ||
      (product.specifications?.thickness && product.specifications.thickness.toLowerCase().includes(searchLower)) ||
      (product.specifications?.color && product.specifications.color.toLowerCase().includes(searchLower)) ||
      (product.specifications?.material && product.specifications.material.toLowerCase().includes(searchLower)) ||
      (product.specifications?.quality && product.specifications.quality.toLowerCase().includes(searchLower))
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="dashboard-title">Marble, Granite & Tiles Dashboard</h1>
              <p className="dashboard-subtitle">Manage your marble, granite, and tiles products inventory</p>
            </div>
            <div className="col-md-4 text-md-end">
              <button 
                className="btn btn-primary btn-lg add-product-btn"
                onClick={() => setIsFormOpen(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Product
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
                    placeholder="Search in all fields (name, description, enquiry, usage, specifications...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Count and Pagination Info */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="products-count mb-0">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </p>
          {totalPages > 1 && (
            <p className="pagination-info mb-0">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

          {/* Products Display - Grid View Cards */}
        <div className="row g-4">
          {currentProducts.map(product => (
            <div key={product._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="card product-card h-100">
                <div className="product-image-container">
                  <img 
                    src={product.images && product.images.length > 0 
                      ? product.images[0].url
                      : "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop"} 
                    alt={product.name}
                    className="card-img-top product-image"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  {product.bestSeller && (
                    <span className="best-seller-badge">
                      <i className="fas fa-star"></i> Best Seller
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="new-arrival-badge">
                      <i className="fas fa-sparkles"></i> New
                    </span>
                  )}
                </div>
                
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title product-name">{product.name}</h5>
                    <span className="category-badge">
                      {product.category?.name || 'No Category'}
                    </span>
                  </div>
                  
                  <p className="card-text product-description">
                    {product.description ? product.description.substring(0, 80) + '...' : 'No description'}
                  </p>
                  
                  {/* Specifications Preview */}
                  {product.specifications && (
                    <div className="specifications-preview mb-2">
                      <small className="text-muted">
                        <strong>Material:</strong> {product.specifications.material || 'N/A'} | 
                        <strong> Quality:</strong> {product.specifications.quality || 'N/A'}
                      </small>
                    </div>
                  )}

                  {/* Gallery Count */}
                  <div className="mb-2">
                    <small className="text-info">
                      <i className="fas fa-images"></i> Gallery: {product.galleryImages?.length || 0} images
                    </small>
                  </div>
                  
                  {/* Price on separate line for mobile */}
                  <div className="mb-3">
                    <span className="product-price">₹{product.price}/sq.ft</span>
                  </div>
                  
                  {/* Action buttons with proper flex - push to bottom */}
                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <button 
                      className="btn btn-sm btn-outline-info flex-fill"
                      onClick={() => viewProductDetails(product)}
                      title="View All Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-primary flex-fill"
                      onClick={() => handleEditProduct(product)}
                      title="Edit Product"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger flex-fill"
                      onClick={() => handleDeleteProduct(product._id)}
                      title="Delete Product"
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
            <nav aria-label="Product pagination">
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

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="no-products-container">
            <div className="no-products-icon">📦</div>
            <h3 className="no-products-title">No products found</h3>
            <p className="no-products-text">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* AddProductForm components */}
      {isFormOpen && (
        <AddProductForm 
          isOpen={isFormOpen} 
          closeForm={handleCloseForm}
          onProductAdd={handleAddProduct}
        />
      )}

      {isEditFormOpen && currentProduct && (
        <AddProductForm 
          isOpen={isEditFormOpen}
          closeForm={handleCloseForm}
          product={currentProduct}
          onProductUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default DashbordProduct;