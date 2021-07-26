import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MovieResultRow.css";

class Like extends Component {
  render() {
    let svg_link = "";
    let svg_size = "22px";
    if (this.props.liked) {
      svg_link = "heart.svg"
    } else {
      svg_link = "heart_empty.svg"
    };

    return (
      <img
        src={svg_link}
        style={{
          float: "left",
          height: svg_size,
          maxHeight: 250,
          width: svg_size,
          paddingRight: "8px",
          paddingLeft: "8px"
        }}
        alt="Like button"
        onClick={this.props.clickFunc}
      />
    )
  }
}

export default class MovieResultsRow extends Component {
  static propTypes = {
    title: PropTypes.string,
    index: PropTypes.string,
    image: PropTypes.string,
    year: PropTypes.number,
    liked: PropTypes.bool,
    likeFunc: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = event => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    if (this.state.expanded) {
      return (
        <div
          className="component-movie-result-row"
          style={{
            minHeight: "128px"
          }}
          onClick={this.handleClick}
        >
          <div
            className="headline-box"
          >
            <Like
              clickFunc={event => {
                this.props.likeFunc(event, {
                  "year": this.props.year,
                  "title": this.props.title,
                  "index": this.props.index,
                  "liked": this.props.liked
                })
              }}
              liked={this.props.liked}
            />
            <span className="year">({this.props.year})</span>
            <span className="title">{this.props.title}</span>
            <span className="info">Click to collapse</span>
          </div>
          <div
            className="info-box"
          >
            <div className="result-image">
              <img
                src={this.props.image !== "" ?
                  this.props.image
                  :
                  "question_mark.svg"
                }
                alt="Movie poster"
                className="image"
              />
            </div>
            <div className="result-description">
              <span className="description">
                {this.props.description !== "\n" ?
                  this.props.description
                  :
                  "No description available."
                }
              </span>
            </div>
          </div>

        </div >
      );
    } else {
      return (
        <div
          className="component-movie-result-row"
          onClick={this.handleClick}
        >
          <Like
            clickFunc={event => {
              this.props.likeFunc(event, {
                "year": this.props.year,
                "title": this.props.title,
                "index": this.props.index
              })
            }}
            liked={this.props.liked}
          />
          <span className="year">({this.props.year})</span>
          <span className="title">{this.props.title}</span>
          <span className="info">Click to expand</span>
        </div>
      );
    }

  }
}

// //<img alt={this.props.title} src={this.props.symbol} />
