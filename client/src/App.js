import React, { Component } from 'react';
import { Search } from 'carbon-components-react';
import Content from './Content';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      appCache: {},
      data: {}
    };
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let search = event.target.value
      // return cached data
      if(Object.keys(this.state.appCache).includes(search)){
        this.cache(event.target.value, this.state.response)
      } else {
        this.fetchCall(search)
      }
    }
  }

  fetchCall = (search) => {
    fetch('search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        search: search
      })
    })
    .then(data => data.json())
    .then(data => {
      // cache data for the first time
      this.cache(search, data)
      if(data.itemListElement){
        this.setState({
          response: data
        })
        this.passContent(data)
      } else {
        // consistent formatting for when appending to the dom
        const err = 'try your search again, we did not find anything'
        this.passContent(err)
      }
    })
  }

  passContent = (data) => {
    this.setState({
      data: data
    })
  }

  cache = (search, response) => {
    if(Object.keys(this.state.appCache).includes(search)){
      this.passContent(this.state.appCache[search])
    } else {
      this.state.appCache[search] = response
    }
  }

  render() {
    return (
      <div className="App">
        <Search
          className="some-class"
          id="search-1"
          labelText="Search"
          placeHolderText="Search"
          onKeyPress={this.handleKeyPress}
        />

        <Content data={this.state.data}/>
      </div>
    );
  }
}
