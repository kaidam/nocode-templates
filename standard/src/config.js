import Promise from 'bluebird'
import React from 'react'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import uiActions from '@nocode-works/template/store/modules/ui'
import routerActions from '@nocode-works/template/store/modules/router'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import driveUtils from '@nocode-works/template/utils/drive'

export const DOCUMENT_SETTINGS_DEFAULT_VALUES = {
  breadcrumbs: true,
  documentTitle: true,
  documentInfo: true,
  backNextButtons: true,
  imageDropshadow: false,
  autoLineHeight: true,
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

const FolderInfoDescription = ({
  store,
}) => {
  const folderId = store.getState().system.website.meta.nocodeFolderId
  const openFolderUrl = driveUtils.getEditUrl({
    id: folderId,
    mimeType: 'folder',
  })
  return (
    <>
      <DialogContentText>
        A nocode website will load it's content from a folder on your Google Drive.        
      </DialogContentText>
      <DialogContentText>
        To help you get setup, we have created a folder in your drive for this website.
      </DialogContentText>
      <DialogContentText>
        <Button
          color="primary"
          variant="outlined"
          onClick={ () => {
            window.open(openFolderUrl)
          }}
        >
          View Drive Folder
        </Button>
      </DialogContentText>
    </>
  )
}

const ONBOARDING_STEPS = {
  sectionFolders: () => ({
    id: 'sectionSettings_topbar',
    type: 'focus',
    title: 'Welcome',
    disableClick: true,
    offset: '0, 20',
    placement: 'left',
    description: FolderInfoDescription,
    smallDescription: FolderInfoDescription,
  }),
  editDocument: () => ({
    id: 'editDocument',
    type: 'focus',
    title: 'Editing Content',
    offset: '0, 20',
    initialise: async (dispatch, getState) => {
      const website = systemSelectors.website(getState())
      if(!website || !website.meta) return
      if(website.meta.quickstart == 'blog') {
        await dispatch(routerActions.navigateTo('my-first-blog-post'))
        await Promise.delay(300)
      }
    },
    description: [
      'Each page on a nocode website is a Google Document.',
      'Click "Edit Document" and the Document will open in Google Drive.',
      'Enter some content, then come back to this screen and the content will automatically reload.', 
    ],
    smallDescription: [
      'Each page on a nocode website is a Google Document.',
      'Clicking on "Edit Document" will cause the Document to open in Google Drive.',
      'Once you have entered some content - you can return to nocode and it will automatically load your new content.', 
    ],
  }),
  addSectionContent: () => ({
    id: 'sectionSettings_sidebar',
    type: 'focus',
    title: 'Creating Content',
    offset: '0, 20',
    disableClick: true,
    description: [
      'Create new content in any section by clicking the "nocode" button.',
      'You can create Folders and Google Documents and any content you create will appear in this section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
    smallDescription: [
      'Create new content in any section by clicking the "nocode" button.',
      'You can create Folders and Google Documents and any content you create will appear in the section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
  }),
  addBlogContent: () => ({
    id: 'addBlogContent',
    type: 'focus',
    title: 'Creating Content',
    offset: '0, 20',
    disableClick: true,
    initialise: async (dispatch, getState) => {
      await dispatch(routerActions.navigateTo('root'))
      await Promise.delay(300)
    },
    cleanup: async (dispatch, getState) => {
      await dispatch(routerActions.navigateTo('my-first-blog-post'))
      await Promise.delay(300)
    },
    description: [
      'Click "add content" to create new blog posts.',
      'You can also add widgets like images or videos that can spruce up your page.',
    ],
    smallDescription: [
      'Click "add content" to create new blog posts.',
      'You can also add widgets like images or videos that can spruce up your page.',
    ],
  }),
  editSettings: () => ({
    id: 'editSettings',
    type: 'focus',
    title: 'Editing Settings',
    offset: '0, 20',
    disableClick: true,
    initialise: async (dispatch, getState) => {
      await dispatch(uiActions.setSettingsOpen(true))
      await Promise.delay(300)
    },
    description: [
      'You can configure many things for your website using the settings button.',
      'Change layout settings, activate plugins, add custom domains, configure security and many more settings can configured here.',
    ],
    smallDescription: [
      'You can configure many things for your website using the settings button.',
      'Change layout settings, activate plugins, add custom domains, configure security and many more settings can configured here.',
    ],
  }),
  publishWebsite: () => ({
    id: 'publishWebsite',
    type: 'focus',
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
      ONBOARDING_STEPS.sectionFolders(),
      ONBOARDING_STEPS.editDocument(),
      ONBOARDING_STEPS.addBlogContent(),
      ONBOARDING_STEPS.editSettings(),
      ONBOARDING_STEPS.publishWebsite(),
    ]
  },
  default: {
    steps: [
      ONBOARDING_STEPS.sectionFolders(),
      ONBOARDING_STEPS.editDocument(),
      ONBOARDING_STEPS.addSectionContent(),
      ONBOARDING_STEPS.editSettings(),
      ONBOARDING_STEPS.publishWebsite(),
    ]
  },
}

export const DOCUMENT = {
  topLayoutId: 'topLayout',
  bottomLayoutId: 'bottomLayout',
}

export const DOCUMENT_LAYOUTS = [{
  id: DOCUMENT.topLayoutId,
  title: 'Top',
},{
  id: DOCUMENT.bottomLayoutId,
  title: 'Bottom',
}]

const getSettings = (params = {}) => {
  if(params.quickstart == 'blog') {
    return {
      folderPages: true,
      leftNavigation: false,
      rightNavigation: false,
      footer: true,
      breadcrumbs: true,
      documentTitle: true,
      documentInfo: true,
      backNextButtons: true,
      imageDropshadow: true,
      autoLineHeight: true,
    }
  }
  else if(params.quickstart == 'documentation') {
    return {
      folderPages: true,
      leftNavigation: true,
      rightNavigation: false,
      footer: true,
      breadcrumbs: true,
      documentTitle: true,
      documentInfo: true,
      backNextButtons: true,
      imageDropshadow: true,
      autoLineHeight: true,
    }
  }
  else if(params.quickstart == 'intranet') {
    return {
      folderPages: true,
      leftNavigation: true,
      rightNavigation: false,
      footer: true,
      breadcrumbs: true,
      documentTitle: true,
      documentInfo: true,
      backNextButtons: true,
      imageDropshadow: true,
      autoLineHeight: true,
    }
  }
  else if(params.quickstart == 'portfolio') {
    return {
      folderPages: false,
      leftNavigation: true,
      rightNavigation: true,
      footer: true,
      breadcrumbs: false,
      documentTitle: true,
      documentInfo: false,
      backNextButtons: false,
      imageDropshadow: false,
      autoLineHeight: true,
    }
  }
  else {
    return {
      folderPages: true,
      leftNavigation: true,
      rightNavigation: false,
      footer: true,
      breadcrumbs: false,
      documentTitle: true,
      documentInfo: false,
      backNextButtons: false,
      imageDropshadow: false,
      autoLineHeight: true,
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
    Object.assign({}, getInitialResource('footer'), {
      children: [{
        name: 'Privacy Policy',
        type: 'document',
        wordDocument: 'privacypolicy.docx',
      }]
    }),
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