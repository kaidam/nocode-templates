import Promise from 'bluebird'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'
import uiActions from '@nocode-works/template/store/modules/ui'
import documentUtils from '@nocode-works/template/utils/document'

export const DOCUMENT_SETTINGS_DEFAULT_VALUES = {
  breadcrumbs: 'yes',
  documentTitle: 'yes',
  documentInfo: 'yes',
  backNextButtons: 'yes',
  imageDropshadow: 'no',
}

export const SECTIONS = [
  'sidebar',
  'rightbar',
  'topbar',
  'footer',
]


export const QUICKSTARTS = [{
  id: 'blog',
  title: 'Blog',
  description: 'A blog template where each post is a Google document',
}, {
  id: 'documentation',
  title: 'Documentation',
  description: 'Documentation website with nested folders of content',
}, {
  id: 'portfolio',
  title: 'Portfolio',
  description: 'Perfect for showcasing your product or services',
}, {
  id: 'intranet',
  title: 'Intranet',
  description: 'Publish internal documents to team-members',
}]

export const ONBOARDING = {
  blog: {
    steps: [
      {
        id: 'highlightDefaultFolder',
        type: 'focus',
        element: 'defaultFolder',
        title: 'Let\'s get started...',
        description: [
          'We have created a Google drive folder for your blog posts.',
          'Click "Add Google Document" to add your first post.', 
        ],
        submitTitle: 'Add Google Document',
      },
      {
        id: 'invisibleWait',
        type: 'wait',
        noSubmit: true,
        handler: async (dispatch, getState) => {
          console.log('--------------------------------------------')
          console.log('wait for blog post')
        },
      },
    ]
  },
  default: {
    steps: [
      // open the default homepage to edit
      {
        id: 'highlightDefaultBody',
        type: 'focus',
        element: 'defaultBody',
        title: 'Let\'s get started...',
        description: [
          'Each page on a nocode website is a Google Document, let\'s add some content to our Homepage.',
          'Click "Edit Document" and the Document will open, enter some content and then come back to this screen.', 
        ],
        submitTitle: 'Edit Document',
      },
      // wait for them to have typed some text
      {
        id: 'waitForText',
        type: 'wait',
        element: 'defaultBody',
        title: 'Waiting for homepage content',
        description: [
          'Enter some content into the Google Document that just opened.',
        ],
        noSubmit: true,
        noProgress: true,
        handler: async (dispatch, getState) => {
          const settings = settingsSelectors.settings(getState())
          const externals = nocodeSelectors.externals(getState())
          const html = externals[`drive:${settings.homepage}.html`]
          if(!html) return false
          return documentUtils.hasContent(html)
        },
      },
      {
        id: 'publishWebsite',
        type: 'focus',
        element: 'buildButton',
        title: 'Good Job!',
        description: [
          'Now, let\'s publish our website to see what it will look like',
          'Click the "Build Website" button.'
        ],
        submitTitle: 'Build Website',
        initialise: async (dispatch, getState) => {
          await dispatch(uiActions.setSettingsOpen(true))
        },
      },
    ]
  },
}

export const DOCUMENT = {
  topLayoutId: 'topLayout',
  bottomLayoutId: 'bottomLayout'
}

const getInitialResource = (id) => ({
  id,
  type: 'folder',
  location: `section:${id}`,
  data: {
    ghost: true,
    linked: true,
  },
})

const getSettings = (params = {}) => {
  if(params.quickstart == 'blog') {
    return {
      folderPages: 'yes',
      navigation: {
        left: false,
        right: false
      },
      breadcrumbs: 'yes',
      documentTitle: 'yes',
      documentInfo: 'yes',
      backNextButtons: 'yes',
      imageDropshadow: 'yes',
    }
  }
  else if(params.quickstart == 'documentation') {
    return {
      folderPages: 'yes',
      navigation: {
        left: true,
        right: false
      },
      breadcrumbs: 'yes',
      documentTitle: 'yes',
      documentInfo: 'yes',
      backNextButtons: 'yes',
      imageDropshadow: 'yes',
    }
  }
  else if(params.quickstart == 'intranet') {
    return {
      folderPages: 'yes',
      navigation: {
        left: true,
        right: false
      },
      breadcrumbs: 'yes',
      documentTitle: 'yes',
      documentInfo: 'yes',
      backNextButtons: 'yes',
      imageDropshadow: 'yes',
    }
  }
  else if(params.quickstart == 'portfolio') {
    return {
      folderPages: 'no',
      navigation: {
        left: true,
        right: true
      },
      breadcrumbs: 'no',
      documentTitle: 'yes',
      documentInfo: 'no',
      backNextButtons: 'no',
      imageDropshadow: 'no',
    }
  }
  else {
    return {
      folderPages: 'yes',
      navigation: {
        left: true,
        right: false
      },
      breadcrumbs: 'no',
      documentTitle: 'yes',
      documentInfo: 'no',
      backNextButtons: 'no',
      imageDropshadow: 'no',
    }
  }
}

export const getInitialResources = (params = {}) => {
  const quickstart = params.quickstart
  const settings = getSettings(params)
  const resources = [
    getInitialResource('sidebar'),
    getInitialResource('rightbar'),
    getInitialResource('footer'),
    Object.assign({}, getInitialResource('topbar'), {
      annotation: {
        sorting: {
          type: 'date',
          direction: 'asc',
        }
      },
      children: [{
        id: 'home',
        name: 'Home',
        type: quickstart == 'blog' ? 'folder' : 'document',
        annotation: params.quickstart == 'blog' ? {
          folderLayoutTemplate: 'blog',
          sorting: {
            type: 'date',
            direction: 'desc',
          },
          topLayout: [
            [
              {
                type: 'richtext',
                settings: {
                  horizontal_align: 'left',
                  vertical_align: 'top',
                  padding: 8
                },
                data: {
                  text: 'Click to edit this text...',
                  style: 'body1'
                }
              }
            ]
          ]
        } : {},
      }]
    })
  ]
  return {
    settings,
    resources,
  }
}

export default {
  DOCUMENT_SETTINGS_DEFAULT_VALUES,
  SECTIONS,
  QUICKSTARTS,
  ONBOARDING,
  DOCUMENT,
  getInitialResources,
}