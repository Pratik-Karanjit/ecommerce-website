import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import CreateAccount from './ProjectComponent/CreateAccount'
import NavBar from './ProjectComponent/Navbar'
import CreateLogin from './ProjectComponent/CreateLogin'
import RegistrationSuccessPage from './ProjectComponent/RegistrationSuccess'
import VerifyEmailPage from './ProjectComponent/VerifyEmail'
import CreateProductForm from './ProjectComponent/CreateProductForm'
import ProductList from './ProjectComponent/ProductListItem'
import ProductDetailPage from './ProjectComponent/ProductDetailPage'
import CheckoutPage from './ProjectComponent/CheckoutPage'
import ThankYou from './ProjectComponent/ThankYou'
import LogoutAccount from './ProjectComponent/Logout'
import AdminPage from './ProjectComponent/AdminPage'
import DeleteProduct from './ProjectComponent/DeleteProduct'


const MyProject = () => {
  const [cart, setCart] = useState([]);
  return (
    <div>

{/* Routes */}
    <Routes>
        <Route path = "/" element = {<div><NavBar></NavBar><Outlet></Outlet></div>}>
                
              <Route path="/" element={<ProductList cart={cart} setCart={setCart}/>}></Route>
              <Route path = "create" element = {<CreateAccount></CreateAccount>}></Route>
              <Route path = "login" element = {<CreateLogin></CreateLogin>}></Route>
              <Route path = "thank-you" element = {<ThankYou></ThankYou>}></Route>
              <Route path = "/admin/create-product" element = {<CreateProductForm></CreateProductForm>}></Route>
              <Route path="/products/:productId" element={<ProductDetailPage></ProductDetailPage>}></Route>
        <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart}></CheckoutPage>}></Route>
              <Route path = "logout" element = {<LogoutAccount></LogoutAccount>}></Route>
              <Route path = "admin" element = {<AdminPage></AdminPage>}></Route>
              <Route path = "/admin/delete" element = {<DeleteProduct></DeleteProduct>}></Route>
              <Route path="registration-success" element={<RegistrationSuccessPage></RegistrationSuccessPage>} />
        <Route path="verify-email" element={<VerifyEmailPage />}querystring/>
            </Route>

        {/* </Route> */}
    </Routes>

    </div>
  )
}

export default MyProject