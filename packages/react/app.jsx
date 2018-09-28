import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Home from './views/home'

class App extends Component {
  render() {
    return (
      <Home />
    )
  }
}

export default hot(module)(App)
