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

    let data = await getMovies();

    let movies = data.results; //movies is an array of objects

    movies.forEach(movie => {        

        let paragraphTag = document.createElement('p');

        paragraphTag.innerText = movie.title;

        movieListDiv.appendChild(paragraphTag);
    });

}

