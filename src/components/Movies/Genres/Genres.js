import React, { Component } from "react";
import Data from "./Genres.json";

import Genre from "./Genre/Genre";

class Genres extends Component {
  updateNumberOfGenres = () => {
    this.props.numberOfGenres(Data.length);
  };

  componentWillMount() {
    this.updateNumberOfGenres();
  }

  render() {
    let number = 0;
    return (
      <div className="Genres">
        {Data.map((genre) => {
          number++;
          return (
            <Genre
              genre={genre.name}
              id={genre.id}
              key={genre.id}
              numberOfMoviesPerGenre={this.props.numberOfMoviesPerGenre}
              selectedGenre={this.props.currentRow === number}
              currentColumn={this.props.currentColumn}
              currentMovie={this.props.currentMovie}
            />
          );
        })}
      </div>
    );
  }
}

export default Genres;
