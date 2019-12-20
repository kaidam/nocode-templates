import library from '@nocode-toolkit/ui/types/library'
import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
import localSchemas from '@nocode-toolkit/ui/types/local/schemas'
import unsplashSchemas from '@nocode-toolkit/ui/types/unsplash/schemas'
import TitleCell from '@nocode-toolkit/website-material-ui/components/cells/Title'

import plugins from './plugins'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

library.add(googleDriveSchemas)
library.add(localSchemas)
library.add(unsplashSchemas)
library.addPlugin(plugins.stripe)
library.addPlugin(plugins.contactform)
library.addPlugin(plugins.sociallinks)

const titleSchema = library.get('local.title')
titleSchema.cellConfig.component = TitleCell

library.addTab('local.settings', {
  id: 'layout',
  title: 'Layout',
  schema: [{
    id: 'topbarHeight',
    title: 'Top Bar Height',
    helperText: 'The pixel height of the top bar',
    inputProps: {
      type: 'number',
    },
  },{
    id: 'footerHeight',
    title: 'Footer Height',
    helperText: 'The pixel height of the footer',
    inputProps: {
      type: 'number',
    },
  },{
    id: 'navigation',
    title: 'Navigation Bars',
    helperText: 'Choose which navigation bars are active',
    component: 'multipleCheckbox',
    options: [{
      title: 'Left Hand Navigation',
      value: 'left',
    },{
      title: 'Right Hand Navigation',
      value: 'right',
    }]
  }],
}, {
  topbarHeight: 80,
  footerHeight: 80,
  navigation: {
    left: true,
    right: false,
  },
})

const templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

export default {
  library,
  templates,
}