import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handlePurchase = async () => {
    const updatedCart = cart.map(item => ({ ...item, quantity: item.quantity - 1 }));
    setCart(updatedCart);
    try {
      await axios.post('http://localhost:8000/users/update-product-quantities', cart);
    } catch (error) {
      console.error('Error updating product quantities:', error);
    }
    navigate('/thank-you');
  };

  return (
    <div className="container-logout">
      <h2 style={{"padding-left": "100px"}}>Checkout</h2>
      <p style={{"padding-left": "30px"}}>Click "Purchase" to finalize your order:</p>
      <button onClick={handlePurchase} className="form-logout">
        Purchase
      </button>
    </div>
  );
};

export default CheckoutPage;
