import React, { Component } from "react";
import "./commentBox.css";
import Rating from "@material-ui/lab/Rating";
import Joi from "joi-browser";
import Form from "./form";
import { getCurrentUserName } from "../../services/userService";
import { deleteLocationReview, addLocationReview } from "../../services/locationService";
import { getCurrentUser } from "../../services/authService";

class CommentBox extends Form {
  state = {
    data: {
      comment: "",
      rating: 1,
    },
    showReviews: false,
    reviews: [],
    currentUser: {},
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: {
  //       comment: "",
  //       rating: 1,
  //     },
  //     showReviews: false,
  //     reviews: this.props.reviews,
  //   };

  //   this.handleClick = this.handleClick.bind(this);
  // }

  async componentDidMount() {
    const { data: userName } = await getCurrentUserName();
    this.setState({ currentUser: userName, reviews: this.props.reviews });
  }

  schema = {
    comment: Joi.string(),
    rating: Joi.number(),
  };

  handleClick() {
    this.setState({
      showReviews: !this.state.showReviews,
    });
  }

  getReviews() {
    return (
      <div>
        {this.state.reviews.map((review) => (
          <Comment
            author={review.userName}
            body={review.comment}
            rating={review.rating}
            key={this.state.reviews.indexOf(review)}
            _id={review._id}
            onDelete={this.onDelete}
            showDelete={this.state.currentUser._id === review.userId}
          />
        ))}
      </div>
    );
  }

  doSubmit = async () => {
    let review = { ...this.state.data };
    review["userId"] = getCurrentUser()._id;
    review["userName"] = this.state.currentUser.name;

    const { data: updatedReviews } = await addLocationReview(this.props.selectedItem._id, review);
    this.setState({ reviews: updatedReviews.reviews });
    this.props.updateLocation(updatedReviews.reviews);
  };

  onDelete = async (reviewId) => {
    const { data: updatedLocation } = await deleteLocationReview(
      this.props.selectedItem._id,
      reviewId
    );

    this.setState({ reviews: updatedLocation.reviews });

    this.props.updateLocation(updatedLocation.reviews);
  };

  getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    let reviews = [];
    if (this.state.currentUser._id !== undefined) reviews = this.getReviews();
    //const reviews = this.getReviews();

    let buttonText = "Show Reviews";

    if (this.state.showComments) {
      buttonText = "Hide Reviews";
    }

    return (
      <div className="comment-box">
        <form onSubmit={this.handleSubmit}>
          {this.renderTextArea("comment", "Comment", "textarea")}
          <Rating
            name="rating"
            value={this.state.data.rating}
            onChange={(event, newValue) => {
              let data = { ...this.state.data };
              data.rating = newValue;
              this.setState({ data });
            }}
          />
          <br></br>
          {this.renderButton("Submit")}
        </form>
        <br></br>
        {/* <button id="comment-reveal" onClick={this.handleClick} className="btn btn-secondary">
          {buttonText}
        </button> */}
        <h4 className="comment-count">{this.getCommentsTitle(this.state.reviews.length)}</h4>
        <div className="ScrollStyle">{reviews}</div>
      </div>
    );
  }
}
export default CommentBox;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <hr></hr>
        <p className="comment-header">{this.props.author.name}</p>
        <p className="comment-body"> {this.props.body}</p>
        <Rating name="rating" value={this.props.rating} readOnly size="small" />
        <div className="comment-footer">
          {this.props.showDelete && (
            <a
              href="#"
              className="comment-footer-delete"
              onClick={() => this.props.onDelete(this.props._id)}
            >
              Delete Comment
            </a>
          )}
        </div>
      </div>
    );
  }
}
