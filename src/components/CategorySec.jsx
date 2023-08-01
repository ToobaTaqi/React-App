import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CategorySec() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        console.log(response.data.categories);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {categories.map((category, idCategory) => (
        // <ul key={idCategory}>
        //   <li>{category.strCategory}</li>
        // </ul>

        <Card key={idCategory} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={category.strCategoryThumb} />
          <Card.Body>
            <Card.Title>{category.strCategory}</Card.Title>
            <Card.Text>{category.strCategoryDescription}</Card.Text>
            <Link to={`/categorysec/categorypage/${category.meals}`}>
           Go somewhere
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
