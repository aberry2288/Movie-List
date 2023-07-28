const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZkZGM2MGNkMmY4YmU5OWNmMTY4YjI2ZGY0YmNjMSIsInN1YiI6IjY0YzE2ODI4MWNmZTNhMGViNDI5NDhiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bQnztwiv1mKrqLiF4y2FytksVOG8365dJjo2N_3zFCA'

//https://api.themoviedb.org/3/movie/popular

async function getMovies() {

    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }
}

async function displayMovies() {

    const movieListDiv = document.getElementById('movie-list');

    const moviePosterTemplate = document.getElementById('movie-card-template');

    let data = await getMovies();

    let movies = data.results; //movies is an array of objects

    movies.forEach(movie => {

        let movieCard = moviePosterTemplate.content.cloneNode(true);

        let titleElement = movieCard.querySelector('.card-body > h5')
        titleElement.textContent = movie.title;

        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

        let infoButton = movieCard.querySelector('button.btn');
        infoButton.setAttribute('data-movieId', movie.id);

     

        movieListDiv.appendChild(movieCard);
    });
}

async function getMovieDetails(movieId) {


    try {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }
}

async function showMovieDetails(btn) {

    let movieId = btn.getAttribute('data-movieID');

    let movie = await getMovieDetails(movieId);

 

    let modal = document.getElementById('movie-modal');


    let modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = movie.title;

    

    let modalParagraph = document.getElementById('movie-modal-paragraph');
    modalParagraph.textContent = movie.overview;

}

