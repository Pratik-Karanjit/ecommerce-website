import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductListItem from './ProductListItem';
import axios from 'axios';

async function fetchProducts() {
  const response = await axios.get('http://localhost:8000/products');
  return response.data;
}

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const productsData = await fetchProducts();
    setProducts(productsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <ProductListItem key={product._id} product={product} navigate={navigate} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;


