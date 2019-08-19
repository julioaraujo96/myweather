import React from "react";
import styles from "./Search.module.scss";

const Search = props => (
  <form onSubmit={props.getWeather}>
    <input type="text" name="city" placeholder="City..." />
    <input type="text" name="country" placeholder="Country..." />
    <button>Search</button>
  </form>
);

export default Search;
