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
    <div className="mt-3 row ">
      <h2 className="text-center">Categories</h2>
      {categories.map((category, idCategory) => (
        // <ul key={idCategory}>
        //   <li>{category.strCategory}</li>
        // </ul>

        <div className="col-3 ">
          <Card key={idCategory} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={category.strCategoryThumb} />
            <Card.Body className="crd">
              <Card.Title className="text-light">{category.strCategory}</Card.Title>
              <Card.Text className="text-light">{category.strCategoryDescription}</Card.Text>
              <Link to={`/categorysec/categorypage/${category.strCategory}`}>
                Go somewhere
              </Link>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}
