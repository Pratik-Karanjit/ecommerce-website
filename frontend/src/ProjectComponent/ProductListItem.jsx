import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'; // Import the SearchBar component
import '../ProjectCss/ProductListItem.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);

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


  const handleAddToCart = (productId) => {
    const updatedCart = [...cart];
    const productToAdd = products.find((product) => product._id === productId);

    // Check if the product is already in the cart
    const existingCartItem = updatedCart.find((item) => item._id === productId);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      updatedCart.push({ ...productToAdd, quantity: 1 });
    }

    setCart(updatedCart);
    setIsRemoveButtonDisabled(false);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
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
      <button className="btn-add" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
      
      <button
        className={`btn-remove ${isRemoveButtonDisabled ? 'btn-disabled-button' : ''}`}
        onClick={() => handleRemoveFromCart(product._id)}
        disabled={isRemoveButtonDisabled}
      >
        Remove from Cart
      </button>
    </div>
  ))}
</div>
        <div className="cart-section">
          <h2 className="page-title">Shopping Cart</h2>
          {/* <ol className="product-item-cart">
            {cart.map((item) => (
              <li key={item._id} className="cart-item">
                {item.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ol> */}

          {cart.length > 0 ? (
            <ol className="product-item-cart">
              {cart.map((item) => (
                <li key={item._id} className="cart-item">
                  {item.title} - Quantity: {item.quantity}
                </li>
              ))}
            </ol>
          ) : (
            <p className="product-item-cart">Your cart is empty.</p>
          )}
          <button className="btn-purchase" onClick={() => navigate('/checkout')}>Purchase</button>
        </div>  
</div>
);
};

export default ProductList;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import Rating from 'react-rating';
// import '../ProjectCss/ProductListItem.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/users/products');
//       console.log('API Response:', response.data);
//       setProducts(response.data.result);
//       setFilteredProducts(response.data.result);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSearch = (query) => {
//     const filtered = products.filter(
//       (product) =>
//         product.title.toLowerCase().includes(query.toLowerCase()) ||
//         product.description.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   // Function to handle submitting feedback and rating for a specific product
//   const handleSubmitFeedback = async (productId, feedbackMessage, rating) => {
//     try {
//       // Send the feedback and rating to the server
//       const response = await axios.post(`http://localhost:8000/users/feedback/${productId}`, {
//         productId,
//         feedback: feedbackMessage, // Send the feedback message directly
//         rating,
//       });
  
//       // Handle success, e.g., show a success message
//       console.log('Feedback submitted:', response.data);
  
//       // Update the feedback in the state optimistically
//       const updatedProducts = products.map((product) => {
//         if (product._id === productId) {
//           return {
//             ...product,
//             feedback: [
//               {
//                 user: 'Current User', // You can replace 'Current User' with the actual user name
//                 message: feedbackMessage,
//               },
//               ...product.feedback,
//             ],
//           };
//         }
//         return product;
//       });
//       setProducts(updatedProducts);
  
//       // Optionally, you can fetch products again to ensure consistency
//       // fetchProducts();
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };
  

//   return (
//     <div className="product-list-container">
//       <h2 className="page-title">Product List</h2>
//       <SearchBar onSearch={handleSearch} />
//       <div className="product-list">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="product-item">
//             <h3 className="product-title">{product.title}</h3>
//             <p className="product-info">Price: ${product.price}</p>
//             <p className="product-info">In Stock: {product.quantity}</p>
//             <p className="product-description">Description: {product.description}</p>
  
//             {/* Display Feedback */}
//             {/* <div className="product-feedback">
//   <h4>Feedbacks:</h4>
//   {product.feedback.map((feedback, index) => (
//     <div key={index}>
//       <p><strong>{feedback.user}:</strong> {feedback.message}</p>
//     </div>
//   ))}
// </div> */}
  
//             {/* Rating Component */}
//             <Rating
//               initialRating={product.averageRating}
//               emptySymbol={<span className="rating-empty">☆</span>}
//               fullSymbol={<span className="rating-full">★</span>}
//               readonly={true}
//             />
  
//             {/* Feedback Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSubmitFeedback(product._id, product.feedback, product.rating);
//               }}
//             >
//               {/* <textarea
//                 placeholder="Enter your feedback..."
//                 value={product.feedback.map((feedback) => feedback.message).join('\n') || ''}

//                 onChange={(e) => {
//                   const updatedProducts = [...products];
//                   const productIndex = updatedProducts.findIndex((p) => p._id === product._id);
//                   updatedProducts[productIndex].feedback = [
//                     {
//                       user: 'Current User', // You can replace 'Current User' with the actual user name
//                       message: e.target.value,
//                     },
//                     ...updatedProducts[productIndex].feedback.slice(1), // Preserve the latest feedback
//                   ];
//                   setProducts(updatedProducts);
//                 }}
//                 rows={product.feedback.length + 1} 
//                 className="feedback-textarea" // Add a CSS class for styling
//                 style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
//               /> */}
//               <Rating
//                 initialRating={product.rating || 0}
//                 onChange={(value) => {
//                   const updatedProducts = [...products];
//                   const productIndex = updatedProducts.findIndex((p) => p._id === product._id);
//                   updatedProducts[productIndex].rating = value;
//                   setProducts(updatedProducts);
//                 }}
//                 emptySymbol={<span className="rating-empty">☆</span>}
//                 fullSymbol={<span className="rating-full">★</span>}
//               />
//               <br></br>
//               <button type="submit" className="btn-view">Submit Rating</button>
//             </form>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;