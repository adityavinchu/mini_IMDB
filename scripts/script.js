document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const searchBtn = document.getElementById('search-btn');
    const cardContainer = document.getElementById('card-container');
    const favoritesBtn = document.getElementById('favorites-btn'); // Favorites button
  
    const apiKey = 'a5637de'; // Your OMDB API key
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
  
    // Load and display previously searched movies
    displayMovies(searchResults);
  
    // Event listener for search button click
    searchBtn.addEventListener('click', () => {
      const query = searchBox.value.trim();
      if (query) {
        fetchMovies(query);
      }
    });
  
    // Event listener for Enter key in search box
    searchBox.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const query = searchBox.value.trim();
        if (query) {
          fetchMovies(query);
        }
      }
    });
  
    // Event listener for Favorites button click
    favoritesBtn.addEventListener('click', () => {
      window.location.href = 'favorites.html'; // Navigate to favorites.html
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
          cardContainer.innerHTML = ''; // Clear previous results
  
          if (data.Search && data.Search.length > 0) {
            searchResults = data.Search;
            localStorage.setItem('searchResults', JSON.stringify(searchResults));
            displayMovies(searchResults);
          } else {
            cardContainer.innerHTML = '<p>No results found.</p>';
            localStorage.removeItem('searchResults');
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Function to display movies
    function displayMovies(movies) {
      cardContainer.innerHTML = ''; // Clear previous results
      movies.forEach(movie => {
        const card = createCard(movie);
        cardContainer.appendChild(card);
      });
    }
  
    // Function to create a movie card based on the movie object
    function createCard(movie) {
      const card = document.createElement('div');
      card.className = 'card col-md-3 mb-3 p-3';
      card.style.width = '14rem';
  
      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = movie.Poster !== 'N/A' ? movie.Poster : 'assets/placeholder.png';
      img.alt = movie.Title;
      card.appendChild(img);
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body d-flex flex-column'; // Use flexbox to align items
  
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = movie.Title;
      cardBody.appendChild(cardTitle);
  
      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = `Year: ${movie.Year}`;
      cardBody.appendChild(cardText);
  
      // Button to add movie to favorites
      const addToFavoritesBtn = document.createElement('button');
      addToFavoritesBtn.className = 'btn btn-success mt-auto';
      addToFavoritesBtn.textContent = 'Add to Favorites';
      addToFavoritesBtn.addEventListener('click', () => {
        addToFavorites(movie);
      });
      cardBody.appendChild(addToFavoritesBtn);
  
      // View Details button
      const viewDetailsBtn = document.createElement('a');
      viewDetailsBtn.className = 'btn btn-primary mt-2'; // mt-2 for spacing
      viewDetailsBtn.textContent = 'View Details';
      viewDetailsBtn.href = `movie-details.html?imdbID=${movie.imdbID}`;
      cardBody.appendChild(viewDetailsBtn);
  
      card.appendChild(cardBody);
  
      return card;
    }
  
    // Function to add a movie to favorites
    function addToFavorites(movie) {
      const existsInFavorites = favorites.some(fav => fav.imdbID === movie.imdbID);
      if (!existsInFavorites) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.Title} added to favorites!`);
      } else {
        alert(`${movie.Title} is already in favorites!`);
      }
    }
  });
  