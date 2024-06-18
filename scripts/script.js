// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const searchBox = document.getElementById('search-box'); // Search input element
    const searchBtn = document.getElementById('search-btn'); // Search button element
    const cardContainer = document.getElementById('card-container'); // Container to hold movie cards
    const favoritesBtn = document.getElementById('favorites-btn'); // Button to navigate to favorites page
    const apiKey = 'a5637de';  // API key for OMDB
  
    // Fetch movies with a default search term 'Batman' when the page loads
    fetchMovies('Batman');
  
    // Event listener for the search button click
    searchBtn.addEventListener('click', () => {
      const query = searchBox.value;
      if (query) {
        fetchMovies(query);
      }
    });
  
    // Event listener for the favorites button click
    favoritesBtn.addEventListener('click', () => {
      window.location.href = 'favorites.html'; // Redirect to favorites page
    });
  
    // Function to fetch movies from OMDB API based on a search query
    function fetchMovies(query) {
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response data:', data);  
          cardContainer.innerHTML = '';  // Clear previous results
  
          // Check if there are any search results
          if (data.Search && data.Search.length > 0) {
            // Iterate over each movie result and create a card for it
            data.Search.forEach(movie => {
              const card = createCard(movie);
              cardContainer.appendChild(card);
            });
          } else {
            // Display a message when no results are found
            cardContainer.innerHTML = '<p>No results found.</p>';
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Function to create a movie card based on the movie object
    function createCard(movie) {
      const card = document.createElement('div');
      card.className = 'card col-md-3 mb-3';  // Bootstrap card styling
      card.style.width = '16rem';  // Card width
      card.style.margin = '8px';   // Card margin
  
      // Create image element for the movie poster
      const img = document.createElement('img');
      img.className = 'card-img-top';
      // Set poster image or fallback to a placeholder image
      img.src = movie.Poster !== "N/A" ? movie.Poster : 'assets/placeholder.png';
      img.alt = movie.Title;
      card.appendChild(img);
  
      // Create card body for movie details
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      card.appendChild(cardBody);
  
      // Create card title element
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = movie.Title;
      cardBody.appendChild(cardTitle);
  
      // Create paragraph element for movie year
      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = `Year: ${movie.Year}`;
      cardBody.appendChild(cardText);
  
      // Create favorite button for adding/removing from favorites
      const favoriteButton = document.createElement('button');
      favoriteButton.className = 'btn btn-primary';
      favoriteButton.textContent = 'Favorite';
      favoriteButton.addEventListener('click', () => {
        handleFavorite(movie);
      });
      cardBody.appendChild(favoriteButton);
  
      return card;
    }
  
    // Function to handle adding/removing a movie from favorites
    function handleFavorite(movie) {
      // Retrieve favorites from localStorage or initialize as empty array
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      // Check if the movie is already favorited
      const isFavorited = favorites.some(fav => fav.imdbID === movie.imdbID);
      
      // Toggle favorite status
      if (isFavorited) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
        alert(`${movie.Title} removed from favorites`);
      } else {
        // Add to favorites
        favorites.push(movie);
        alert(`${movie.Title} added to favorites`);
      }
  
      // Save updated favorites back to localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
});
