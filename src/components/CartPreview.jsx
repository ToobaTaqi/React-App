import React from "react";

export default function CartPreview({ cart }) {
  return (
    <div className="cart-preview">
      <h4>Cart Preview</h4>
      <ul>
        {Object.keys(cart).map((mealId) => (
          <li key={mealId}>
            Meal ID: {mealId}, Quantity: {cart[mealId]}
          </li>
        ))}
      </ul>
    </div>
  );
}
