import React from 'react'
import { hot } from 'react-hot-loader'

import Root from '@nocode-toolkit/ui/root'
import library from '@nocode-toolkit/ui/types/library'
import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
import localSchemas from '@nocode-toolkit/ui/types/local/schemas'

import themeFactory from './theme'
import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

library.add(googleDriveSchemas)
library.add(localSchemas)

const templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

const App = ({}) => {
  return (
    <Root
      templates={ templates }
      themeFactory={ themeFactory }
    />
  )
}

export default hot(module)(App)