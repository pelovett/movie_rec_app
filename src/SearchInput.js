import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./SearchInput.css";

export default class SearchInput extends PureComponent {
  static propTypes = {
    textChange: PropTypes.func,
    resultUpdate: PropTypes.func
  };

  handleChange = event => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input
            onChange={this.handleChange}
            placeholder="Search for your favorite movies here"
          />
          <button
            className="rec-button"
            onClick={this.props.resultUpdate}>
            Get Recommendations
          </button>
        </div>
      </div>
    );
  }
}
