import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import MovieResultRow from "./MovieResultRow";
import "./MovieResults.css";

export default class MovieResults extends PureComponent {
  static propTypes = {
    movieData: PropTypes.array,
    likeFunc: PropTypes.func
  };

  render() {
    return (
      <div className="component-movie-results">
        {this.props.movieData.map(movieData => (
          <MovieResultRow
            year={movieData.year}
            image={movieData.image}
            title={movieData.title}
            index={movieData.index}
            liked={movieData.hasOwnProperty("liked") ? movieData.liked : false}
            description={movieData.text}
            likeFunc={this.props.likeFunc}
          />
        ))}
      </div>
    );
  }
}
