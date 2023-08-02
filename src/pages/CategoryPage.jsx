import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function CategorPage() {
  const { categoryName } = useParams();

  const [meals, setMeals] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => {
        console.log(response.data.meals);
        setMeals(response.data.meals);
      })
      .catch((error) => console.log(error));
  }, [categoryName]);

  return (
    <div className="row mt-5 m-4 gap-4 crd">
      {meals !== null ? (
        meals.map((meal) => (
          <Card key={meal.idMeal} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={meal.strMealThumb} />
            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
