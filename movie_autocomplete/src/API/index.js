const API_KEY = "7d124435897d06997d4d72551781a401";

export const movies = (keyWord) => fetch("https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&language=en-US&query="+keyWord)
.then(res => res.json())
.then(res => res && res.results)
.catch(err => console.log(err))