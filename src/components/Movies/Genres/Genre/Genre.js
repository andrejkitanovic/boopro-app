import React, { Component } from "react";
import "./Genre.css";

//Importujemo axios
import axios from "axios";

import Movie from "./Movie/Movie";

class Genre extends Component {
  state = {
    displayMovies: 6,
    movies: [],
    error: false,
  };

  componentDidMount() {
    // Izostavio sam stavljanje baseUrl i Authorization tokena za axios posto bi bio suvisan kod jer se samo u ovde poziva dati URL
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${this.props.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
      )
      .then((response) => {
        const moviesSliced = response.data.results.slice(0, this.state.displayMovies);
        this.setState({ movies: moviesSliced });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updateNumberofMoviesPerGenre = () => {
    this.props.numberOfMoviesPerGenre(this.state.displayMovies);
  };


  componentWillMount(){
    this.updateNumberofMoviesPerGenre()
  }

  render() {
    let genre = this.props.currentColumn;

    if(!this.props.selectedGenre){
      genre = null;
    }

    //Ukoliko dodje do greske prikazujemo dati paragraf
    let movies = <p>Something went wrong!</p>;

    //Ukoliko nema problema sa izvlacenjem podataka iz Api-ja mapiramo podatke
    if (!this.state.error) {
      let column = 0;

      movies = this.state.movies.map((movie) => {
        column++;
        return (
          <Movie
            title={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
            backdropSrc={movie.backdrop_path}
            key={movie.id}
            imgSrc={movie.poster_path}
            activeMovie={column === genre}
            currentMovie={this.props.currentMovie}
          />
        );
      });
    }

   
    return (
      <div className={genre ? "Genre current" : "Genre"}>
        <h2 >{this.props.genre}</h2>
        <div className="movie-container">{movies}</div>
      </div>
    );
  }
}

export default Genre;
