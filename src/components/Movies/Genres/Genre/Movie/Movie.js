import React, { Component } from "react";
import classes from "./Movie.module.css"

class Movie extends Component {
  state = {
    imageServer: "https://image.tmdb.org/t/p/w500"
  };

  update = () => {
    if(this.props.activeMovie){
      this.props.currentMovie(this)
    }
  }

  shouldComponentUpdate(nextProps,nextState){

    return nextProps.activeMovie !== this.props.activeMovie
    
  }

  someFn = () => {
    this.props.currentMovie({
      title:this.props.title,
      overview:this.props.overview,
      vote_average:this.props.vote_average,
      imgSrc:this.props.imgSrc
    })
  }

  componentDidUpdate(){
    if(this.props.activeMovie){
      this.someFn()
    }
  }

  componentDidMount(){
    if(this.props.activeMovie){
      this.someFn()
    }
  }

  render() {
      
    let str = [classes.Movie];

    if (this.props.activeMovie) {
      str.push(classes.active);
    }

    return (
      <div className={str.join(" ")} onKeyPress={this.update.bind(this)}>
        {/* Ukoliko je link nevalidan stavljamo titl samog filma u alt koji ce se prikazati u tom slucaju */}
        <img
          src={`${this.state.imageServer}${this.props.imgSrc}`}
          alt={this.props.title}
        ></img>
      </div>
    );
  }

}

export default Movie;
