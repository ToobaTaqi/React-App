import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import { render } from "react-dom";
import Swal from "sweetalert2";

export default function Products() {
  const [meals, setMeals] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [review, setReview] = useState("");
  const [mealQuantity, setMealQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const submitReview = () => {
    const payload = {
      productId: meals.idMeal,
      review: review,
    };
    Swal.fire("Review Submitted!", "Thanks for your feedback!", "success");
  };

  const addToCart = (meal) => {
    setCart([...cart, meal]);
    Swal.fire("cart Updated", "item is added to cart", "success");
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${selectedLetter}`
        );
        setMeals(response.data.meals || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedLetter) {
      fetchMeals();
    }
  }, [selectedLetter]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSelectedMeal(null); // Reset selected meal when a letter is clicked
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="mt-5 p">

      <div className="fixed-top pro">
      <div className="letters">
        {Array.from(Array(26)).map((_, index) => (
          <button
            className="m-2 nvbtn "
            key={index}
            onClick={() => handleLetterClick(String.fromCharCode(65 + index))}
          >
            {String.fromCharCode(65 + index)}
          </button>
        ))}
      </div>
      </div>

      {meals.length === 0 ? (
        <p>No meals found starting with {selectedLetter}.</p>
      ) : (
        <div className="mt-5  d-flex flex-wrap pro">
          {meals.map((meal, key) => (
            <div className="meal" key={key}>
              <button
                className="meal-button nvbtn"
                onClick={() => handleMealClick(meal)}
              >
                {meal.strMeal}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedMeal && (
        <div className="m-5 d-flex  flex-column justify-content-center pro">
          <h3>
            {selectedMeal.strMeal.toUpperCase()} - RS{" "}
            {selectedMeal.idMeal / 200}
          </h3>
          <div>
            <div>
              <button
                className="nvbtn"
                disabled={mealQuantity > 1 ? false : true}
                onClick={() => setMealQuantity(mealQuantity - 1)}
              >
                -
              </button>
              {mealQuantity}
              <button
                className=" nvbtn"
                onClick={() => setMealQuantity(mealQuantity + 1)}
              >
                +
              </button>
              <div className="mt-2 mb-2">
                <button
                  className="nvbtn"
                  btn
                  btn-dark
                  onClick={() => addToCart(selectedMeal)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex pcart">
            <img
              className="pimg"
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
            />
            <div className="d-flex flex-column pcart2">
              <h4>Recipe:</h4>
              <p style={{ width: "40vw" }}>{selectedMeal.strInstructions}</p>
            </div>
          </div>

          <div>
            <div>
              <h4>Rate us:</h4>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />

              <div className="col-md-6">
                <div className="container">
                  <h4>Your Rewiews??</h4>
                </div>

                <div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: 100 }}
                      defaultValue={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <label htmlFor="floatingTextarea2">
                      Your Reviews
                    </label>
                  </div>
                  <button onClick={submitReview} className="my-3 btn btn-dark">
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-items m-4 text-left fixed-bottom">
          <h4>My Cart</h4>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.strMeal} - RS:{item.idMeal / 200} - quantity selected:{" "}
                {mealQuantity}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
