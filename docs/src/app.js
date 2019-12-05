import React from 'react'
import { hot } from 'react-hot-loader'

import Router from '@nocode-toolkit/ui/Router'
import ThemeMaterial from '@nocode-toolkit/ui/ThemeMaterial'

import themeProcessor from './theme'
import library from './library'

const App = ({}) => {
  return (
    <Router
      templates={ library.templates }
      ThemeModule={ ThemeMaterial }
      themeProcessor={ themeProcessor }
    />
  )
}

export default hot(module)(App)