import React from 'react'
import { hot } from 'react-hot-loader'

import Router from '@nocode-toolkit/ui/Router'

import library from './library'

const App = ({}) => {
  return (
    <Router
      templates={ library.templates }
    />
  )
}

export default hot(module)(App)