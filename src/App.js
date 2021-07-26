import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";

import Header from "./Header";
import SearchInput from "./SearchInput";
import MovieResults from "./MovieResults";
import LikedMovieBox from "./LikedMovieBox";
import filterMovies from "./filterMovies";
import RecommendationPanel from "./RecommendationPanel";

import "./App.css";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredMovies: filterMovies("", 20),
      likedMovies: [],
      showResults: false
    };
  }

  handleRecRequest = event => {
    fetch("http://localhost:8000/suggestmovies/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "user_id": "random",
        "num_suggestions": 5,
        "liked_movie_ids": this.state.likedMovies.map(x => x.index)
      })
    })
      .then(result => result.json())
      .then(
        (result) => {
          console.log("Returned result is not an error!");
          console.log(result);
          this.setState({
            recommendations: result.map(x => x[0]),
            showResults: true
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  handleSearchChange = event => {
    this.setState({
      filteredMovies: filterMovies(event.target.value, 20),
      likedMovies: this.state.likedMovies
    });
  };

  handleClickedMovie = (event, movie) => {
    let new_liked = [];
    let new_filtered = [];
    // check if this movie has already been liked
    if (this.state.likedMovies.some(film => film.index === movie.index)) {
      // Remove from liked list
      new_liked = this.state.likedMovies.filter(
        film => film.index !== movie.index
      )
      // Set the movie to be unliked
      this.state.filteredMovies.forEach(film => {
        if (film.index === movie.index) {
          film.liked = false;
        }
        new_filtered.push(film);
      });
    } else {
      // Set film to liked and add to liked list
      this.state.filteredMovies.forEach(film => {
        if (film.index === movie.index) {
          film.liked = true;
          new_liked = [film].concat(this.state.likedMovies)
        }
        new_filtered.push(film);
      });
    }
    this.setState({
      filteredMovies: new_filtered,
      likedMovies: new_liked
    })
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Movie Recommender</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
          <link rel="manifest" href="/site.webmanifest"></link>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
          <meta name="msapplication-TileColor" content="#da532c"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
        </Helmet>
        <Header />
        {this.state.showResults ?
          <div
            className="main-column"
            style={{
              "justifyContent": "center"
            }}>
            <button
              className="back-button"
              onClick={() => this.setState({ showResults: false })}
            >
              Back
            </button>
            <RecommendationPanel
              recommendations={this.state.recommendations}
            />
            <MovieResults
              movieData={this.state.likedMovies}
              likeFunc={() => null}
            />
          </div>
          :
          <div
            className="main-column"
          >
            <SearchInput
              textChange={this.handleSearchChange}
              resultUpdate={this.handleRecRequest}
            />
            <LikedMovieBox
              likedMovies={this.state.likedMovies}
              handleUnlikedMovie={this.handleClickedMovie}
            />
            <MovieResults
              movieData={this.state.filteredMovies}
              likeFunc={this.handleClickedMovie}
            />
            <div>
              Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
          </div>
        }
      </div>
    );
  }
}
