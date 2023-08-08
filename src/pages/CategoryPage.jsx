import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';

export default function CategorPage() {
  const { categoryName } = useParams();

  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState({});
  
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => {
        console.log(response.data.meals);
        setMeals(response.data.meals);
      })
      .catch((error) => console.log(error));
  }, [categoryName]);

  const addToCart = (meal) => {
    setCart((prevCart) => ({
      ...prevCart,
      [meal.idMeal]: (prevCart[meal.idMeal] || 0) + 1,
    }));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item added to cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="row mt-5 m-4 gap-4 crd">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <Card key={meal.idMeal} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={meal.strMealThumb} />
            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <div>
                Quantity: {cart[meal.idMeal] || 0}
                <Button variant="primary" onClick={() => addToCart(meal)}>
                  Add to cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {Object.keys(cart).length > 0 && (
        <div className="cart-items m-4 text-left fixed-bottom">
          <h4>My Cart</h4>
          <ul>
            {Object.keys(cart).map((mealId) => (
              <li key={mealId}>
                {meals.find((meal) => meal.idMeal === mealId)?.strMeal} - RS:{mealId / 200} - quantity selected:{" "}
                {cart[mealId]}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
