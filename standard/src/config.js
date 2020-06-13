import Promise from 'bluebird'
import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'
import uiActions from '@nocode-works/template/store/modules/ui'
import routerActions from '@nocode-works/template/store/modules/router'
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
  image: './images/onboarding/blog.jpg',
}, {
  id: 'documentation',
  title: 'Documentation',
  description: 'Documentation website with nested folders of content',
  image: './images/onboarding/documentation.jpg',
}, {
  id: 'portfolio',
  title: 'Portfolio',
  description: 'Perfect for showcasing your product or services',
  image: './images/onboarding/portfolio.jpg',
}, {
  id: 'intranet',
  title: 'Intranet',
  description: 'Publish internal documents to team-members',
  image: './images/onboarding/intranet.jpg',
}]

const ONBOARDING_STEPS = {
  highlightEditDocument: () => ({
    id: 'highlightEditDocument',
    type: 'focus',
    element: 'editDocument',
    title: 'Editing Content',
    offset: '0, 20',
    description: [
      'Each page on a nocode website is a Google Document.',
      'Click "edit document" and the Document will open in Google Drive.',
      'Enter some content and then come back to this screen.', 
    ],
    smallDescription: [
      'Each page on a nocode website is a Google Document.',
      'Clicking on "Edit Document" will cause the Document to open in Google Drive.',
      'Once you have entered some content - you can return to nocode and it will automatically load your new content.', 
    ],
  }),
  highlightAddSectionContent: () => ({
    id: 'highlightAddSectionContent_sidebar',
    type: 'focus',
    element: 'highlightAddSectionContent_sidebar',
    title: 'Creating Content',
    offset: '0, 20',
    disableClick: true,
    description: [
      'Create new content in any section by clicking the plus button.',
      'You can create Folders and Google Documents and any content you create will appear in this section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
    smallDescription: [
      'Create new content in any section by clicking the plus button.',
      'You can create Folders and Google Documents and any content you create will appear in the section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
  }),
  highlightAddBlogContent: () => ({
    id: 'highlightAddBlogContent',
    type: 'focus',
    element: 'addContent',
    title: 'Creating Content',
    offset: '0, 20',
    disableClick: true,
    initialise: async (dispatch, getState) => {
      await dispatch(routerActions.navigateTo('root'))
      await Promise.delay(300)
    },
    description: [
      'Your blog posts live in a folder on Google drive.',
      'Click "add content" to create new blog posts.',
      'Also, you can create new content in any section by clicking the plus button.',
      'You can also add widgets like images or videos that can spruce up your page.',
    ],
    smallDescription: [
      'Your blog posts live in a folder on Google drive.',
      'Click "add content" to create new blog posts.',
      'Also, you can create new content in any section by clicking the plus button.',
      'You can also add widgets like images or videos that can spruce up your page.',
    ],
  }),
  editSettings: () => ({
    id: 'editSettings',
    type: 'focus',
    element: 'settingsButton',
    title: 'Editing Settings',
    offset: '0, 20',
    disableClick: true,
    initialise: async (dispatch, getState) => {
      await dispatch(uiActions.setSettingsOpen(true))
      await Promise.delay(300)
    },
    description: [
      'You can configure many things for your website using the settings button.',
      'Change the colour, change layout settings and many more settings can configured here.',
    ],
    smallDescription: [
      'You can configure many things for your website using the settings button.',
      'Change the colour, change layout settings and many more settings can configured here.',
    ],
  }),
  publishWebsite: () => ({
    id: 'publishWebsite',
    type: 'focus',
    element: 'buildButton',
    title: 'Publishing Your Website',
    offset: '0, 20',
    disableClick: true,
    cleanup: async (dispatch, getState) => {
      await Promise.delay(300)
      await dispatch(uiActions.setSettingsOpen(false))
    },
    description: [
      'So people can see your amazing content, we need to "publish" it.',
      'This will convert all of your Google documents and combine them into a website.',
      'It will then give you a URL that you can send to your vistors.',
      'Click "Build Website" to publish now.'
    ],
    smallDescription: [
      'So people can see your amazing content, we need to "publish" it.',
      'This will convert all of your Google documents and combine them into a website.',
      'It will then give you a URL that you can send to your vistors.',
    ],
  }),
}

export const ONBOARDING = {
  blog: {
    steps: [
      ONBOARDING_STEPS.highlightEditDocument(),
      ONBOARDING_STEPS.highlightAddBlogContent(),
      ONBOARDING_STEPS.editSettings(),
      ONBOARDING_STEPS.publishWebsite(),
    ]
  },
  default: {
    steps: [
      ONBOARDING_STEPS.highlightEditDocument(),
      ONBOARDING_STEPS.highlightAddSectionContent(),
      ONBOARDING_STEPS.editSettings(),
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