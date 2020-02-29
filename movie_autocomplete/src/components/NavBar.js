import React, { Component } from 'react';
import {movies} from '../API'
import './NavBar.css';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:"",
            movies: [],
            isOpen: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    async handleChange(e) {
        this.setState({searchText : e.target.value});

        const fetchedMovies = await movies(e.target.value);
        if(fetchedMovies) {
            this.setState({movies: fetchedMovies.slice(0,8)});   
        } else {
            this.setState({movies: []});
        }
    }

    handleFocus = () => this.setState({isOpen:true});
    handleBlur = () => this.setState({isOpen:false});
    handleSelect = (title) => this.setState({searchText:title});


    render() {
        return (
            <nav>
                <div className="autocomplete">
                    <div className="input_container">
                        <div className="search_svg"/>
                        <input name="search" type="text" className="search_input" 
                        value={this.state.searchText} onChange={this.handleChange} 
                        placeholder="Enter a movie name" onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        autoComplete="off"></input>
                    </div>
                        {this.state.isOpen && this.state.searchText.length>2 && this.state.movies.length > 0
                        && <div className="autocomplete-items">
                                {this.state.movies.map(movie => 
                                    {return <div onMouseDown={this.handleSelect.bind(this, movie.original_title)} key={movie.id}>{movie.original_title}
                                        <p>{movie.vote_average} Rating, 
                                        {movie.release_date && movie.release_date.substring(0,4)}</p>
                                        </div>})}
                        </div>}
                </div>
                <button className="search_button"></button>
            </nav>
        )
    }
}
