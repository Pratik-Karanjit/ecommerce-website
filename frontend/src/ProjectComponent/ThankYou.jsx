import React from 'react'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  let navigate = useNavigate()
  return (
    <div className='thank-you'>
    <div>
      <h2>Thank You for purchasing!</h2>
      <button className="form-button" onClick={() => navigate('/')}>Back to Products</button>
    </div>
    </div>
  )
}

export default ThankYou