import React, { Component } from "react";

import movieList from "./movie_data.json";

import MovieResultRow from "./MovieResultRow";
import "./RecommendationPanel.css";

export default class RecommendationPanel extends Component {
    movie_recs = movieList.filter(movie => {
        if (this.props.recommendations.includes(parseInt(movie.index, "10"))) {
            return true
        } else {
            return false
        }
    });

    render() {
        return (
            <div>
                <div className="liked-movies-header">
                    Recommended Movies:
                </div>
                <div className="recommendation-result-panel">
                    {this.movie_recs.map((rec) =>
                        <MovieResultRow
                            year={rec.year}
                            image={rec.image}
                            title={rec.title}
                            index={rec.index}
                            liked={false}
                            description={rec.text}
                            likeFunc={() => null}
                        />
                    )}
                </div>
                <div
                    className="liked-movies-header"
                    style={{ "marginTop": "15px" }}>
                    Liked Movies:
                </div>
            </div>
        )
    }
}