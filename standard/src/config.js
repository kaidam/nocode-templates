import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'
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
  image: '/images/onboarding/blog.jpg',
}, {
  id: 'documentation',
  title: 'Documentation',
  description: 'Documentation website with nested folders of content',
  image: '/images/onboarding/documentation.jpg',
}, {
  id: 'portfolio',
  title: 'Portfolio',
  description: 'Perfect for showcasing your product or services',
  image: '/images/onboarding/portfolio.jpg',
}, {
  id: 'intranet',
  title: 'Intranet',
  description: 'Publish internal documents to team-members',
  image: '/images/onboarding/intranet.jpg',
}]

const ONBOARDING_STEPS = {
  highlightDefaultFolder: () => ({
    id: 'highlightDefaultFolder',
    type: 'focus',
    element: 'defaultFolder',
    title: 'Let\'s get started...',
    description: [
      'We have created a Google drive folder for your blog posts.',
      'Click "Add Google Document" to add your first post.', 
    ],
    submitTitle: 'Add Google Document',
  }),
  waitForFormWindow: () => ({
    id: 'waitForFormWindow',
    type: 'wait',
    noSubmit: true,
    handler: async (dispatch, getState) => {
      const formWindow = contentSelectors.formWindow(getState())
      if(!formWindow) {
        return {
          cancel: true
        }
      }
      else if(formWindow.accepted) {
        return true
      }
      else {
        return false
      }
    },
  }),
  waitForNewDocumentPage: () => ({
    id: 'waitForNewDocumentPage',
    type: 'wait',
    noSubmit: true,
    handler: async (dispatch, getState) => {
      const nodes = nocodeSelectors.nodes(getState())
      const settings = settingsSelectors.settings(getState())
      const homepageNode = nodes[settings.homepage]
      const currentRoute = routerSelectors.route(getState())
      if(!homepageNode || !homepageNode.children || homepageNode.children.length <= 0) return false
      const postId = homepageNode.children[0]
      return currentRoute.item == postId
    },
  }),
  // open the default homepage to edit
  highlightDefaultBody: ({
    title = 'Let\'s get started...',
    description = [
      'Each page on a nocode website is a Google Document, let\'s add some content to our Homepage.',
      'Click "Edit Document" and the Document will open, enter some content and then come back to this screen.', 
    ],
  } = {}) => ({
    id: 'highlightDefaultBody',
    type: 'focus',
    element: 'defaultBody',
    title,
    description,
    submitTitle: 'Edit Document',
  }),
  // wait for them to have typed some text
  waitForText: ({
    title = 'Waiting for homepage content',
    idSelector = (getState) => {
      const settings = settingsSelectors.settings(getState())
      return settings.homepage
    },
  } = {}) => ({
    id: 'waitForText',
    type: 'wait',
    element: 'defaultBody',
    title,
    description: [
      'Enter some content into the Google Document that just opened.',
    ],
    noSubmit: true,
    noProgress: true,
    handler: async (dispatch, getState) => {
      const id = idSelector(getState)
      if(!id) return false
      const externals = nocodeSelectors.externals(getState())
      const html = externals[`drive:${id}.html`]
      if(!html) return false
      return documentUtils.hasContent(html)
    },
  }),
  publishWebsite: () => ({
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
  }),
}

export const ONBOARDING = {
  blog: {
    steps: [
      ONBOARDING_STEPS.highlightDefaultFolder(),
      ONBOARDING_STEPS.waitForFormWindow(),
      ONBOARDING_STEPS.waitForNewDocumentPage(),
      ONBOARDING_STEPS.highlightDefaultBody({
        title: 'Good Job!',
        description: [
          'Each page on a nocode website is a Google Document, let\'s add some content to your new Blog Post.',
          'Click "Edit Document" and the Document will open, enter some content and then come back to this screen.', 
        ],
      }),
      ONBOARDING_STEPS.waitForText({
        title: 'Waiting for blog post content',
        idSelector: (getState) => {
          const nodes = nocodeSelectors.nodes(getState())
          const settings = settingsSelectors.settings(getState())          
          const homepageNode = nodes[settings.homepage]
          return homepageNode && homepageNode.children ?
            homepageNode.children[0] :
            null
        },
      }),
      ONBOARDING_STEPS.publishWebsite(),
    ]
  },
  default: {
    steps: [
      ONBOARDING_STEPS.highlightDefaultBody(),
      ONBOARDING_STEPS.waitForText(),
      ONBOARDING_STEPS.publishWebsite(),
    ]
  },
}

export const DOCUMENT = {
  topLayoutId: 'topLayout',
  bottomLayoutId: 'bottomLayout'
}

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

const getInitialResource = (name) => ({
  name,
  type: 'folder',
  location: `section:${name}`,
  data: {
    ghost: true,
    linked: true,
  },
})

export const getInitialResources = (params = {}) => {
  const quickstart = params.quickstart
  const baseSettings = getSettings(params)
  const settings = Object.assign({}, baseSettings, {
    driveMode: params.driveMode,
    driveExperience: params.driveExperience,
  })
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
        name: 'Home',
        type: quickstart == 'blog' ? 'folder' : 'document',
        wordDocument: quickstart == 'blog' ? null : 'homepage.docx',
        annotation: params.quickstart == 'blog' ? {
          initialHomepage: true,
          folderLayoutTemplate: 'blog',
          sorting: {
            type: 'date',
            direction: 'desc',
          },
        } : {
          initialHomepage: true,
        },
        children: params.quickstart == 'blog' ? [{
          name: 'My First Blog Post',
          type: 'document',
          wordDocument: quickstart == 'blog' ? 'homepage.docx' : null,
        }] : [],
      }]
    })
  ]
  return {
    settings,
    resources,
    redirect: params.quickstart == 'blog' ?
      'my-first-blog-post' :
      null
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