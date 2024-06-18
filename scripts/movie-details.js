// movie-details.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');
    const apiKey = 'a5637de'; // Your OMDB API key
  
    fetchMovieDetails(imdbID);
  
    function fetchMovieDetails(id) {
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Movie Details:', data);
          displayMovieDetails(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function displayMovieDetails(movie) {
      document.getElementById('movie-title').textContent = movie.Title;
      document.getElementById('movie-year').textContent = movie.Year;
      document.getElementById('movie-plot').textContent = movie.Plot;
      document.getElementById('movie-director').textContent = movie.Director;
      document.getElementById('movie-actors').textContent = movie.Actors;
      document.getElementById('movie-genre').textContent = movie.Genre;
      document.getElementById('movie-rating').textContent = movie.imdbRating;
      
      const poster = movie.Poster !== 'N/A' ? movie.Poster : 'assets/placeholder.png';
      document.getElementById('movie-poster').src = poster;
    }
  });
  