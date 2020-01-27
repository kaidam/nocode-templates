import library from '@nocode-toolkit/ui/types/library'

/*

  the schemas we want - i.e. what kind of content can be added to this website

*/
import localSchemas from '@nocode-toolkit/ui/types/local/schemas'
import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
import unsplashSchemas from '@nocode-toolkit/ui/types/unsplash/schemas'

/*

  the plugins we want to be available

*/
import StripePlugin from '@nocode-toolkit/plugin-stripe/ui/pluginMaterial'
import ContactFormPlugin from '@nocode-toolkit/plugin-contactform/ui/pluginMaterial'
import SocialLinksPlugin from '@nocode-toolkit/plugin-sociallinks/ui/plugin'

import MaterialLibrary from '@nocode-toolkit/website-material-ui/library'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'


const plugins = {
  stripe: StripePlugin(),
  contactform: ContactFormPlugin(),
  sociallinks: SocialLinksPlugin(),
}

library.add(googleDriveSchemas)
library.add(unsplashSchemas)
library.add(localSchemas)

library.addPlugin(plugins.stripe)
library.addPlugin(plugins.contactform)
library.addPlugin(plugins.sociallinks)

MaterialLibrary(library)

library.addTab('local.settings', {
  id: 'layout',
  title: 'Layout',
  schema: [
    [
      {
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
      }
    ],[
      {
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
      },
      {
        id: 'search',
        title: 'Search Bars',
        helperText: 'Choose which search bars are active',
        component: 'multipleCheckbox',
        options: [{
          title: 'Left Hand Search',
          value: 'left',
        },{
          title: 'Right Hand Search',
          value: 'right',
        }]
      }
    ],
  ]
}, {
  topbarHeight: 80,
  footerHeight: 80,
  navigation: {
    left: true,
    right: false,
  },
  search: {
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
  plugins,
  templates,
}