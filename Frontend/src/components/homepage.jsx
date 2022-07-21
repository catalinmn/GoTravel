import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import "./homepage.css";
const Homepage = ({ user }) => {
  return (
    <div class="tm-container">
      <div>
        <div class="tm-row pt-4">
          <div class="tm-col-left">
            <div class="tm-site-header media">
              <i class="fas fa-umbrella-beach fa-3x mt-1 tm-logo"></i>
              <div class="media-body">
                <h1 class="tm-sitename text-uppercase">Go Travel</h1>
                <p class="tm-slogon">a new way of travelling</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tm-row">
          <div class="tm-col-left"></div>
          <main class="tm-col-right">
            <section class="tm-content">
              <h2 class="mb-5-custom tm-content-title">Why choose GoTravel?</h2>
              <p class="mb-5-custom">
                Go Travel has a user friendly interface that can be accessed on any device.
              </p>
              <p class="mb-5-custom">
                You can see which&nbsp;
                {user && <Link to="/countries">countries</Link>}
                {!user && <Link to="/login">countries</Link>} to visit or maybe its{" "}
                {user && <Link to="/cities">cities</Link>}
                {!user && <Link to="/login">cities</Link>}
              </p>
              <hr class="mb-5-custom" />
              <p class="mb-5-white">
                Leave a review for every location and help us improve the experience of travelling
              </p>
              <Link to="about.html" class="btn btn-primary">
                Read more
              </Link>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
