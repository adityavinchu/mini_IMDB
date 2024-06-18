// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const movieList = document.getElementById('movie-list'); // List to display favorite movies
    const backBtn = document.getElementById('back-btn'); // Button to navigate back to index.html
  
    // Load favorite movies from localStorage or initialize as empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Display favorite movies initially when the page loads
    displayFavoriteMovies();
  
    // Event listener for the back button click
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html'; // Redirect to index.html
    });
  
    // Function to display favorite movies in the movie list
    function displayFavoriteMovies() {
      movieList.innerHTML = ''; // Clear previous list
  
      if (favorites.length > 0) {
        // Iterate over each favorite movie and create a card for it
        favorites.forEach(movie => {
          const movieCard = createMovieCard(movie);
          movieList.appendChild(movieCard);
        });
      } else {
        // Display a message when no favorite movies are found
        movieList.innerHTML = '<p>No favorite movies found.</p>';
      }
    }
  
    // Function to create a movie card based on the movie object
    function createMovieCard(movie) {
      const card = document.createElement('div');
      card.className = 'card col-md-5 mb-3'; // Bootstrap card styling
      card.innerHTML = `
        <div class="row no-gutters">
          <div class="card col-md-5 mb-3">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'assets/placeholder.png'}" class="card-img" alt="${movie.Title}">
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year: ${movie.Year}</p>
              <button class="btn btn-danger remove-btn">Remove</button>
            </div>
          </div>
        </div>
      `;
  
      // Add event listener to remove button
      const removeBtn = card.querySelector('.remove-btn');
      removeBtn.addEventListener('click', () => {
        removeFromFavorites(movie);
      });
  
      return card;
    }
  
    // Function to remove a movie from favorites
    function removeFromFavorites(movie) {
      favorites = favorites.filter(fav => fav.imdbID !== movie.imdbID); // Filter out the movie to remove
      localStorage.setItem('favorites', JSON.stringify(favorites)); // Save updated favorites to localStorage
      displayFavoriteMovies(); // Refresh the displayed list of favorite movies
    }
});
