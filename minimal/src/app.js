// added a comment
import React from 'react'
import { hot } from 'react-hot-loader'

import NocodeApp from '@nocode-works/template/app'
import ThemeMaterial from '@nocode-works/template/theme/material'

import themeProcessor from './themeProcessor'
import library from './library'

const App = ({}) => {
  return (
    <NocodeApp
      templates={ library.templates }
      ThemeModule={ ThemeMaterial }
      themeProcessor={ themeProcessor }
    />
  )
}

export default hot(module)(App)
