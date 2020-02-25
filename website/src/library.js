import library from '@nocode-toolkit/ui/types/library'

import {
  LAYOUT_CELLS,
} from '@nocode-toolkit/ui/config'

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

const SECTIONS = [
  'sidebar',
  'rightbar',
  'topbar',
  'footer',
]

SECTIONS.forEach(section => {
  library.addSection(section)
})

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
      },
      {
        id: 'sidebarWidth',
        title: 'Side Bar Width',
        helperText: 'The pixel width of the side bars',
        inputProps: {
          type: 'number',
        },
      },
    ],

    {
      id: 'navigation',
      title: 'Navigation Bars',
      helperText: 'Choose which navigation bars are active',
      component: 'multipleCheckbox',
      row: true,
      options: [{
        title: 'Left Hand Navigation',
        value: 'left',
      },{
        title: 'Right Hand Navigation',
        value: 'right',
      }]
    },

    [
      {
        id: 'breadcrumbs',
        title: 'Breadcrumbs',
        helperText: 'Include links to parent folders above the document',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
      {
        id: 'backNextButtons',
        title: 'Back / Next Buttons',
        helperText: 'Include back & next buttons to the previous and next pages',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
    ],[
      {
        id: 'documentTitle',
        title: 'Document Title',
        helperText: 'Include the name of the Google document as the page title',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
      {
        id: 'documentInfo',
        title: 'Document Info',
        helperText: 'Include the author and date of when the document was created',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
    ],[
      {
        id: 'folderPages',
        title: 'Folder Pages',
        helperText: 'Render a page for folders with links to their contents',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
      {
        id: 'imageDropshadow',
        title: 'Image Drop Shadow',
        helperText: 'Apply a drop shadow to any images in a google document',
        component: 'radio',
        row: true,
        options: [{
          title: 'Enable',
          value: 'yes',
        },{
          title: 'Disable',
          value: 'no',
        }]
      },
    ]
  ]
}, {
  topbarHeight: 80,
  sidebarWidth: 240,
  breadcrumbs: 'yes',
  documentTitle: 'yes',
  documentInfo: 'yes',
  backNextButtons: 'yes',
  folderPages: 'yes',
  imageDropshadow: 'no',
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

library.addHandler('documentLayout', ({
  layout,
  settings,
}) => {
  const rows = [
    settings.breadcrumbs != 'no' ? [LAYOUT_CELLS.breadcrumbs] : null,
    settings.documentTitle != 'no' ? [LAYOUT_CELLS.documentTitle] : null,
    settings.documentInfo != 'no' ? [LAYOUT_CELLS.documentInfo] : null,
  ]
    .concat(layout)
    .concat([
      settings.backNextButtons != 'no' ? [LAYOUT_CELLS.backNextButtons] : null,
    ])
    .filter(r => r)

  return rows
})

export default {
  library,
  plugins,
  templates,
}