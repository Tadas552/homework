import React, { Component } from 'react';
import './NavBar.css';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:"",
            movies: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({searchText : e.target.value})
        if(e.target.value) {
            fetch("https://api.themoviedb.org/3/search/movie?api_key=7d124435897d06997d4d72551781a401&language=en-US&query="+e.target.value)
            .then(res => res.json())
            .then((result) => {this.setState({movies:result.results})})
        }
    }


    render() {
        return (
            <nav>
                <input type="text" className="search_input" value={this.state.searchText} onChange={this.handleChange} placeholder="Enter movie name" autoFocus></input>

                <button onClick={() => this.state.movies.forEach(movie => console.log(movie.original_title))} className="search_button">
                <svg className="search" width="30px" height="30px" viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83 0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25c3.357-4.363 5.376-9.835 5.376-15.788 0-14.16-11.32-25.67-25.232-25.67-13.923 0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85c1.77 1.8 4.664 1.8 6.432 0 1.77-1.8 1.77-4.744 0-6.544z"/></svg>
                </button>
            </nav>
        )
    }
}
