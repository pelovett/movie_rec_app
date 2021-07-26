import React, { PureComponent } from "react";
import "./Header.css";

export default class Header extends PureComponent {
  render() {
    return (
      <header className="component-header">
        <img
          src="clapperboard.svg"
          width="32"
          height="32"
          alt="Clapper board"
        />
        Movie Recommender
      </header>
    );
  }
}
