import movieList from "./movie_data.json";

export default function filterMovies(searchText, maxResults) {
  return movieList
    .filter(movie => {
      if (movie.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}
