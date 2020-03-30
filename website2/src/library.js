import Promise from 'bluebird'
import library from '@nocode-toolkit/frontend/library'

import systemActions from '@nocode-toolkit/frontend/store/modules/system'
import uiActions from '@nocode-toolkit/frontend/store/modules/ui'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

// import {
//   LAYOUT_CELLS,
// } from '@nocode-toolkit/ui/config'

// /*

//   the schemas we want - i.e. what kind of content can be added to this website

// */
// import localSchemas from '@nocode-toolkit/ui/types/local/schemas'
// import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
// import unsplashSchemas from '@nocode-toolkit/ui/types/unsplash/schemas'

// /*

//   the plugins we want to be available

// */
import StripePlugin from '@nocode-toolkit/plugin-stripe/ui/pluginMaterial'
import ContactFormPlugin from '@nocode-toolkit/plugin-contactform/ui/pluginMaterial'
import SocialLinksPlugin from '@nocode-toolkit/plugin-sociallinks/ui/plugin'

// import MaterialLibrary from '@nocode-toolkit/website-material-ui/library'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

const SECTIONS = [
  'sidebar',
  'rightbar',
  'topbar',
  'footer',
]

library.sections = SECTIONS

library.plugins = [
  StripePlugin(),
  ContactFormPlugin(),
  SocialLinksPlugin(),
]

/*

  we auto initialise the drive folders for them here

*/
library.initialise = () => async (dispatch, getState) => {
  const website = systemSelectors.website(getState())

  const ret = {}

  if(website.meta.autoFoldersEnsure && !website.meta.autoFoldersCreated) {
    dispatch(uiActions.setLoading({
      message: 'Setting up your website for the first time...',
    }))

    const sectionResources = SECTIONS
      .map(section => {
        return {
          id: section,
          type: 'folder',
          location: `section:${section}`,
          data: {
            ghost: true,
            linked: true,
          },
        }
      })
      .concat([{
        id: 'home',
        type: 'document',
        location: 'singleton:home'
      }])

    await dispatch(systemActions.ensureSectionResources({
      driver: 'drive',
      resources: sectionResources,
    }))
    
    await dispatch(systemActions.updateWebsiteMeta({
      autoFoldersCreated: true,
    }))

    ret.reload = true
  }
  
  return ret
}

library.templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

const valueInjector = (inject = {}) => (values = {}) => Object.assign({}, values, inject)

library.forms = {
  'section': {
    initialValues: {
      annotation: {
        sorting: {},
      },
    },
    tabs: [{
      id: 'settings',
      title: 'Settings',
      schema: [{
        id: 'annotation.sorting',
        title: 'Sorting',
        helperText: 'How are children items sorted inside this folder?',
        component: 'sorting',
      }],
    }, {
      id: 'hidden',
      title: 'Hidden Items',
      schema: [{
        title: 'Hidden Items',
        helperText: 'Manage the hidden items in this section',
        component: 'hiddenItems',
      }],
    }],
  },
  'drive.folder': {
    initialValues: {
      name: '',
      annotation: {
        sorting: {},
      },
    },
    processFormValues: valueInjector({mimeType: 'folder'}),
    tabs: [{
      id: 'main',
      title: 'Details',
      schema: [{
        id: 'name',
        title: 'Name',
        helperText: 'Enter the name of the folder',
        validate: {
          type: 'string',
          methods: [
            ['required', 'The name is required'],
          ],
        }
      }],
    },{
      id: 'settings',
      title: 'Settings',
      schema: [{
        id: 'annotation.sorting',
        title: 'Sorting',
        helperText: 'How are children items sorted inside this folder?',
        component: 'sorting',
      }],
    }]
  },
  'drive.document': {
    initialValues: {
      name: '',
    },
    processFormValues: valueInjector({mimeType: 'document'}),
    schema: [{
      id: 'name',
      title: 'Name',
      helperText: 'Enter the name of the document',
      validate: {
        type: 'string',
        methods: [
          ['required', 'The name is required'],
        ],
      }
    }],
  },
  'link': {
    initialValues: {
      name: '',
      url: '',
      noRoute: true,
    },
    schema: [{
      id: 'name',
      title: 'Name',
      helperText: 'Enter the name of the link',
      validate: {
        type: 'string',
        methods: [
          ['required', 'The name is required'],
        ],
      }
    }, {
      id: 'url',
      title: 'URL',
      helperText: 'Enter the url of the link',
      validate: {
        type: 'string',
        methods: [
          ['required', 'The url is required'],
          ['url', 'Must be a valid url - e.g. http://google.com'],
        ],
      }
    }],
  },
}

library.settings = {
  initialValues: {
    title: 'Website Title',
    test: 'hello',
    copyright_message: '&copy; &year; My Company Name',
    description: '',
    keywords: '',
    color: {color: "#3f51b5"},
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
  },
  tabs: [{
    id: 'main',
    title: 'Website',
    schema: [{
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
    }, {
      id: 'title',
      title: 'Title',
      helperText: 'Enter the title for your website',
    }, {
      id: 'copyright_message',
      title: 'Copyright Message',
      helperText: 'Enter the copyright message to appear in the footer',
    }, {
      id: 'description',
      title: 'Description',
      component: 'textarea',
      rows: 3,
      helperText: 'Enter the description for your website',
    }, {
      id: 'keywords',
      title: 'Keywords',
      component: 'textarea',
      rows: 3,
      helperText: 'Enter some keywords for search engines to find your website',
    }]
  }, {
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
  }],
}

// library.add(googleDriveSchemas)
// library.add(unsplashSchemas)
// library.add(localSchemas)

// library.addPlugin(plugins.stripe)
// library.addPlugin(plugins.contactform)
// library.addPlugin(plugins.sociallinks)

// MaterialLibrary(library)

// library.addTab('local.settings', {
//   id: 'layout',
//   title: 'Layout',
//   schema: [

//     [
//       {
//         id: 'topbarHeight',
//         title: 'Top Bar Height',
//         helperText: 'The pixel height of the top bar',
//         inputProps: {
//           type: 'number',
//         },
//       },
//       {
//         id: 'sidebarWidth',
//         title: 'Side Bar Width',
//         helperText: 'The pixel width of the side bars',
//         inputProps: {
//           type: 'number',
//         },
//       },
//     ],

//     {
//       id: 'navigation',
//       title: 'Navigation Bars',
//       helperText: 'Choose which navigation bars are active',
//       component: 'multipleCheckbox',
//       row: true,
//       options: [{
//         title: 'Left Hand Navigation',
//         value: 'left',
//       },{
//         title: 'Right Hand Navigation',
//         value: 'right',
//       }]
//     },

//     [
//       {
//         id: 'breadcrumbs',
//         title: 'Breadcrumbs',
//         helperText: 'Include links to parent folders above the document',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//       {
//         id: 'backNextButtons',
//         title: 'Back / Next Buttons',
//         helperText: 'Include back & next buttons to the previous and next pages',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//     ],[
//       {
//         id: 'documentTitle',
//         title: 'Document Title',
//         helperText: 'Include the name of the Google document as the page title',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//       {
//         id: 'documentInfo',
//         title: 'Document Info',
//         helperText: 'Include the author and date of when the document was created',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//     ],[
//       {
//         id: 'folderPages',
//         title: 'Folder Pages',
//         helperText: 'Render a page for folders with links to their contents',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//       {
//         id: 'imageDropshadow',
//         title: 'Image Drop Shadow',
//         helperText: 'Apply a drop shadow to any images in a google document',
//         component: 'radio',
//         row: true,
//         options: [{
//           title: 'Enable',
//           value: 'yes',
//         },{
//           title: 'Disable',
//           value: 'no',
//         }]
//       },
//     ]
//   ]
// }, {
//   topbarHeight: 80,
//   sidebarWidth: 240,
//   breadcrumbs: 'yes',
//   documentTitle: 'yes',
//   documentInfo: 'yes',
//   backNextButtons: 'yes',
//   folderPages: 'yes',
//   imageDropshadow: 'no',
//   navigation: {
//     left: true,
//     right: false,
//   },
// })



// library.addHandler('documentLayout', ({
//   layout,
//   settings,
// }) => {
//   const rows = [
//     settings.breadcrumbs != 'no' ? [LAYOUT_CELLS.breadcrumbs] : null,
//     settings.documentTitle != 'no' ? [LAYOUT_CELLS.documentTitle] : null,
//     settings.documentInfo != 'no' ? [LAYOUT_CELLS.documentInfo] : null,
//   ]
//     .concat(layout)
//     .concat([
//       settings.backNextButtons != 'no' ? [LAYOUT_CELLS.backNextButtons] : null,
//     ])
//     .filter(r => r)

//   return rows
// })

export default library