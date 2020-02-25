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
                <input type="text" className="searchInput" value={this.state.searchText} onChange={this.handleChange} placeholder="Enter movie name" autoFocus></input>
                
                <button onClick={() => this.state.movies.forEach(movie => console.log(movie.original_title))} className="searchButton">
                    Search    
                </button>
            </nav>
        )
    }
}
