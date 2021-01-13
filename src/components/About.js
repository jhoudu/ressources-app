import React, { Component } from 'react'
import marked from 'marked'
import './About.css'

class About extends Component {

  state = {
    markdown: ''
  }

  constructor(props) {
    super(props);
    const readmePath = require("../../README.md");
    const fetch = require('node-fetch');  

    fetch(readmePath)
    .then(response => {
      return response.text()
    })
    .then(text => {
      this.setState({
        markdown: marked(text)
      })
    })
  }

    render () {

  const { markdown } = this.state;

        return (
            <>
              <div style={{overflowY: 'scroll', height:'calc(100vh - 250px)'}} dangerouslySetInnerHTML={{__html: markdown}}></div>
            </>
        )
    }
}

export default About