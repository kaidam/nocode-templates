import React from 'react'
import { hot } from 'react-hot-loader'

import NocodeApp from '@nocode-toolkit/frontend/app'
import ThemeMaterial from '@nocode-toolkit/frontend/theme/material'

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