import React, { Component, Fragment } from "react";
import Genres from "./Genres/Genres";
import SelectedMovie from "./SelectedMovie/SelectedMovie";

class Movies extends Component {
  state = {
    numberOfGenres: 0,
    numberOfMoviesPerGenre: 0,
    mover: {
      row: 1,
      column: 1,
    },
    currentMovie: {},
    showMovie: false,
  };

  keyPressHandle = (e) => {
    switch (e.key) {
      case "Enter":
        this.showMovie();
        break;
      case "ArrowLeft":
        this.updateMover(false, false);
        break;
      case "ArrowRight":
        this.updateMover(false, true);
        break;
      case "ArrowUp":
        this.updateMover(true, false);
        break;
      case "ArrowDown":
        this.updateMover(true, true);
        break;
      default:
        break;
    }
  };

  updateMover = (isRow, isPositive) => {
    if (!this.state.showMovie) {
      let rc = isRow ? this.state.mover.row : this.state.mover.column;
      let watched = isRow
        ? this.state.numberOfGenres
        : this.state.numberOfMoviesPerGenre;

      if (isPositive && rc < watched) {
        rc++;
      } else if (isPositive) {
        rc = 1;
      } else if (rc - 1 > 0) {
        rc--;
      } else rc = watched;

      if (isRow) {
        this.setState((prevState) => ({
          mover: {
            ...prevState.mover,
            row: rc,
          },
        }));
      } else {
        this.setState((prevState) => ({
          mover: {
            ...prevState.mover,
            column: rc,
          },
        }));
      }
    }
  };

  showMovie = () => {
    const currentState = this.state.showMovie;
    this.setState({ showMovie: !currentState });
  };

  //Dodajemo globalne eventListenere
  componentDidMount() {
    window.addEventListener("keydown", this.keyPressHandle);
  }

  //Ukoliko dolazi do iskljucivanja komponente brisemo eventListenere
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyPressHandle);
  }

  //Izvlacimo iz child elementa broj zanrova i broj filmova po zanru
  numberOfGenresHandler = (childData) => {
    this.setState({ numberOfGenres: childData });
  };

  numberOfMoviesPerGenreHandler = (childData) => {
    this.setState({ numberOfMoviesPerGenre: childData });
  };

  //Izvlacimo iz child elementa trenutni film
  currentMovieHandler = (childData) => {
    this.setState({ currentMovie: childData });
  };

  render() {
    let selectedMovie = null;

    if (this.state.showMovie) {
      selectedMovie = <SelectedMovie imgSrc={this.state.currentMovie.imgSrc} title={this.state.currentMovie.title}  overview={this.state.currentMovie.overview} vote_average={this.state.currentMovie.vote_average}/>;
    }

    return (
      <Fragment>
         {selectedMovie}
        <Genres
          numberOfGenres={this.numberOfGenresHandler}
          numberOfMoviesPerGenre={this.numberOfMoviesPerGenreHandler}
          currentRow={this.state.mover.row}
          currentColumn={this.state.mover.column}
          currentMovie={this.currentMovieHandler}
        />
       
      </Fragment>
    );
  }
}

export default Movies;
