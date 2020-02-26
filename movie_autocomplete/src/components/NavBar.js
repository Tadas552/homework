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
    }

    async handleChange(e) {
        this.setState({searchText : e.target.value})
        if(e.target.value) {
            this.setState({movies: await movies(e.target.value)});
        }else {
            this.setState({movies: []});
        }
        
    }


    render() {
        return (
            <nav>
                <div className="autocomplete">
                    <input name="search" type="text" className="search_input" value={this.state.searchText} onChange={this.handleChange} placeholder="Enter a movie name" autocomplete="off" autoFocus></input>
                        {this.state.searchText && <div className="autocomplete-items">
                            <div className="main_input">
                                {this.state.searchText}
                                <p>Enter a movie name</p>
                            </div>
                                 {this.state.movies.slice(0,3).map(movie => 
                                    {return <div>{movie.original_title}<p>{movie.vote_average} Rating, {movie.release_date && movie.release_date.substring(0,4)}</p></div>})}
                        </div>}
                </div>
                <button className="search_button"/>
            </nav>
        )
    }
}
