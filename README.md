# Mini IMDB Clone App

This is a vanilla JavaScript application that mimics some functionalities of IMDB. It allows users to search for movies, add them to favorites, view detailed information about each movie, and manage their favorite movies list.

## Features

### Home Page

1. **Search Movies**
   - Users can search for movies using an external API.
   - Search results are displayed as suggestions as the user types (like Google search).

2. **Favorite Movies**
   - Each search result has a favorite button that allows users to add movies to their favorites list.
   - Clicking on a movie from the search results opens a detailed Movie Page.

### Movie Page

1. **Detailed Movie Information**
   - Displays comprehensive information about a selected movie.
   - Includes movie title, poster image, plot summary, and additional details.

### My Favorite Movies Page

1. **Favorites List**
   - Shows a persistent list of all movies that the user has marked as favorites.
   - The list remains unchanged even after closing or refreshing the browser.

2. **Remove from Favorites**
   - Each movie in the favorites list has a button to remove it from the list.

## Implementation Details

- **Frontend**: Pure JavaScript (no frameworks or libraries used for JavaScript), HTML, CSS (Bootstrap for styling).
- **API**: Utilizes an external movie database API (e.g., OMDB API) for movie data.
- **Persistence**: Favorites list is stored locally using browser storage (localStorage).
- **Routing**: Simple routing implemented for navigating between Home, Movie Details, and Favorites pages (can be simulated using hash routing or simple page loads).

## Technologies Used

- HTML
- CSS (Bootstrap for styling)
- JavaScript

## Setup Instructions

**Clone the repository:**

   ```sh
   git clone https://github.com/adityavinchu/mini_IMDB.git
   cd mini-imdb-clone
```
