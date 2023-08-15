import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../ProjectCss/ProductListItem.css'

async function fetchProduct(productId) {
  const response = await axios.get(`http://localhost:8000/users/products/${productId}`);
  return response.data;
}

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const productData = await fetchProduct(productId);
      setProduct(productData);
      console.log('Fetched product data:', productData); 
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <div className='product-detail-wrap'>
      {product ? (
        <div className='product-details'>
          <h2>Product Detail</h2>
          <h3>{product.result.title}</h3>
          <p>Price: ${product.result.price}</p>
          <p>Description: {product.result.description}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
        )}
        <button className='btn-view' onClick={() => navigate('/')}>Back to Products</button>
    </div>
  );
}

export default ProductDetailPage;
