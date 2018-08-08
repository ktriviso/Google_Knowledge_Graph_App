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
        <div className="wrapper">
          {this.state.content[0].result.detailedDescription.articleBody === 'please enter a search' ? <div className="default">{this.state.content[0].result.detailedDescription.articleBody}</div> : null}

          {this.state.content[0].result.detailedDescription.articleBody === 'try your search again, we did not find anything' ? <div className="default">{this.state.content[0].result.detailedDescription.articleBody}</div> : null}

          {this.state.content.length > 1 ? this.state.content.map((data, i) => (<div className="content" key={i}>{data.result.detailedDescription.articleBody}</div>)) : null}
        </div>
      )
  }
}
