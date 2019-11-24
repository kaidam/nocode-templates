import React from 'react'
import { hot } from 'react-hot-loader'

import Router from '@nocode-toolkit/ui/Router'
import Theme from '@nocode-toolkit/ui/ThemeMaterial'

import library from './library'
import themeProcessor from './theme'

const App = ({}) => {
  return (
    <Router
      templates={ library.templates }
      themeModule={ Theme }
      themeProcessor={ themeProcessor }
    />
  )
}

export default hot(module)(App)