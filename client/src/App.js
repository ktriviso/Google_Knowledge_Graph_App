import React, { Component } from 'react';
import { Search, Button, Footer, Loading } from 'carbon-components-react';
import Content from './Content';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      appCache: {},
      data: {},
      loading: false
    };
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let search = event.target.value
      // error handling for an empty input
      if(search === ''){

      } else {
        // return cached data
        if(Object.keys(this.state.appCache).includes(search)){
          this.cache(event.target.value, this.state.response)
        } else {
          this.fetchCall(search)
        }
      }
    }
  }

  fetchCall = (search) => {
    this.setState({
      loading: !this.state.loading
    })
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
          response: data,
          loading: !this.state.loading
        })
        this.passContent(data)
      } else {
        this.setState({
          response: data,
          loading: false
        })
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

  clickedBUtton = () => {
    let search = document.querySelector('input').value
    // error handling for an empty input
    if(search === ''){

    } else {
      // return cached data
      if(Object.keys(this.state.appCache).includes(search)){
        this.cache(search, this.state.response)
      } else {
        this.fetchCall(search)
      }
    }
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
        <div className="bx--grid">

          <div className="bx--row">
            <div className="bx--col-xs-12">
            <div id="film">
              <div id="title">
                <p>Google Knowledge Seach App</p>
              </div>
            </div>
            </div>
          </div>

          <div className="bx--row">
            <div className="bx--col-sm-10">
              <Search
                className="some-class"
                id="search-1"
                labelText="Search"
                placeHolderText="Search"
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="bx--col-sm-2">
              <Button
                onClick={this.clickedBUtton}
                className="some-class"
                href="#"
              >
                <p id="button-search">Search</p>
              </Button>
            </div>
          </div>

          <div className="bx--row">
            <div className="bx--col-xs-12">
              <Loading className="loader" small withOverlay={false} active={this.state.loading}/>
            </div>
          </div>

          <div className="bx--row">
            <Content data={this.state.data}/>
          </div>

          <div className="bx--row">
            <div className="bx--col-xs-12">
              <Footer>
                <p>Made By Krista Triviso</p>
              </Footer>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
