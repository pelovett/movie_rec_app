import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LikedMovieBox.css"

export default class LikedMovieBox extends Component {
    static propTypes = {
        likedMovies: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            hoveredButton: ""
        };
    }

    setHoveredButton(movie) {
        if (movie !== 0) {
            movie.last_hovered = (new Date()).getTime();
        }
        this.setState({
            hoveredButton: movie.index
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 200);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="liked-movie-container">
                <div className="liked-movie-box">
                    {this.props.likedMovies.length < 1 ?
                        "No liked movies." :
                        (<ul className="liked-movie-list">
                            {this.props.likedMovies.map(movie => (
                                <li
                                    className="liked-movie"
                                    onMouseEnter={() => this.setHoveredButton(movie)}
                                    onMouseLeave={() => this.setHoveredButton(0)}>
                                    <p
                                        style={{ margin: "0px", display: "inline-block" }}>
                                        {"(" + movie.year + ") " + movie.title}
                                    </p>
                                    {
                                        this.state.hoveredButton === movie.index ||
                                            movie.last_hovered > (new Date()).getTime() - 2000 ?
                                            <button
                                                className="Unlike-button"
                                                onClick={(event) =>
                                                    this.props.handleUnlikedMovie(event, movie)}>
                                                X
                                            </button> : ""
                                    }
                                </li>
                            ))}
                        </ul>)
                    }
                </div>
            </div >
        )
    }
}