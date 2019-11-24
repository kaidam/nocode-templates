import React from 'react'
import { hot } from 'react-hot-loader'

import Router from '@nocode-toolkit/ui/Router'
import Theme from '@nocode-toolkit/ui/Theme'

import library from './library'

const App = ({}) => {
  return (
    <Router
      templates={ library.templates }
      themeModule={ Theme }
    />
  )
}

export default hot(module)(App)