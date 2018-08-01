import React, { Component } from 'react';
import './App.css';

export default class Content extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
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

  render() {

    console.log(this.state.content)
      return (
        <div>
          {this.state.content.itemListElement ? this.state.content.itemListElement.map(data => {
            <li>{data.result.detailedDescription.articleBody}</li>
          }):null}
        </div>
      )
  }
}
