import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    
    <div className="card text-center d-flex w-100%">
    <div className="card-header">Footer</div>
    <div className="card-body">
      <h5 className="card-title">We offers best quality food</h5>
      <p className="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, cumque.
      </p>
      <Link to="/" className="butn">
        Let's Eat
      </Link>
    </div>
  </div>
  
  )
}
