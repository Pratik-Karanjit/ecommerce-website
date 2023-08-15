import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import '../ProjectCss/ProductListItem.css'

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/products');
      console.log('API Response:', response.data);
      setProducts(response.data.result);
      setFilteredProducts(response.data.result); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/users/delete-products/${productId}`
      );
  
      console.log('Product deleted successfully:', response.data);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  return (
<div className="product-list-container">
<h2 className="page-title">Product List</h2>
<SearchBar onSearch={handleSearch} />
<div className="product-list">
  {filteredProducts.map((product) => (
    <div key={product._id} className="product-item">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-info">Price: ${product.price}</p>
      <p className="product-info">In Stock: {product.quantity}</p>
      <p className="product-description">Description: {product.description}</p>
      <button className="btn-view" onClick={() => handleViewProduct(product._id)}>View</button>

   
      <button className="btn-view" onClick={() => handleDeleteProduct(product._id)}>Delete</button>

    </div>
    
  ))}
</div>     
<button className="btn-view" onClick={() => navigate('create-product')} style={{"margin-top":"2rem", height:"40px"}}>Add Products</button>
</div>
);
};

export default AdminPage;
