import React, { Component } from "react";
import "./SelectedMovie.css";

class SelectedMovie extends Component {
  state = {
    imageServer: "https://image.tmdb.org/t/p/w500",
  };

  render() {
    return (
      <div className="SelectedMovie">
        <img
          src={`${this.state.imageServer}${this.props.imgSrc}`}
          alt={this.props.title}
        ></img>
        <div className="about">
          <h3>{this.props.title}</h3>
          <p>{this.props.overview}</p>
          <span>Vote score: <b>{this.props.vote_average} / 10</b></span>
        </div>
      </div>
    );
  }
}

export default SelectedMovie;
