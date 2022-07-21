import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Card, Collapse, Spinner, Alert } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Like from "./like";
import Comment from "./comment";
import "./cardList.css";

const CardList = ({
  items,
  titleProperty,
  textProperty,
  valueProperty,
  cardButton,
  onLike,
  onComment,
}) => {
  return (
    <div>
      <div className="GroupPage flex-grid">
        {items.map((item) => (
          <Card border="dark" className="flex-col" key={item[valueProperty]}>
            <Card.Body>
              <Card.Img
                variant="right"
                src={item.imgSrc}
                className="card-image"
                alt="Image not available"
              />
              <Card.Title className="card-title">{item[titleProperty]}</Card.Title>
              <Card.Text>{item[textProperty]}</Card.Text>
            </Card.Body>
            <Card.Footer>
              {cardButton === "countries" && (
                <Link to={`/country/cities?countryId=${item._id}`} className="btn btn-primary">
                  Explore cities
                </Link>
              )}
              {cardButton === "cities" && (
                <div>
                  <Like liked={item.liked} onClick={() => onLike(item)} />
                  <Link to={`/city/locations?cityId=${item._id}`} className="btn btn-primary">
                    Explore locations
                  </Link>
                </div>
              )}
              {cardButton === "locations" && (
                <div>
                  <Like liked={item.liked} onClick={() => onLike(item)} />
                  <Comment onClick={() => onComment(item)} />
                  <Rating
                    className="rating"
                    name="half-rating-read"
                    value={item.averageRating ? item.averageRating : 0}
                    precision={0.5}
                    readOnly
                  />
                </div>
              )}
            </Card.Footer>
          </Card>
        ))}
      </div>

      {items.length === 0 && <p>There are no entries registered in the database.</p>}
    </div>
  );
};

CardList.defaultProps = {
  titleProperty: "name",
  textProperty: "description",
  valueProperty: "_id",
};

export default CardList;
