import React, { Component } from 'react';
import './App.css';

export default class Content extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: [{result:{detailedDescription:{articleBody:'please enter a search'}}}]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if(this.props.data === 'try your search again, we did not find anything'){
        this.setState({
          content: [{result:{detailedDescription:{articleBody:'try your search again, we did not find anything'}}}]
        })
      } else {
        const filteredData = []
        // removing inconsisent data
        this.props.data.itemListElement.map((data) => {
          data.result.detailedDescription ? filteredData.push(data) : null
        })
        this.setState({
          content: filteredData
        })
      }
    }
  }

  render() {
      return (
        <div>
          <ul>
            {this.state.content.map((data, i) => (<li key={i}>{data.result.detailedDescription.articleBody}</li>))}
          </ul>
        </div>
      )
  }
}
