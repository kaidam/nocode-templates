import library from '@nocode-toolkit/frontend/library'

import systemActions from '@nocode-toolkit/frontend/store/modules/system'
import uiActions from '@nocode-toolkit/frontend/store/modules/ui'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import StripePlugin from '@nocode-toolkit/plugin-stripe/ui'
import ContactFormPlugin from '@nocode-toolkit/plugin-contactform/ui'

import ImageWidget from '@nocode-toolkit/frontend/widgets/image'
import VideoWidget from '@nocode-toolkit/frontend/widgets/video'
import SocialLinksWidget from '@nocode-toolkit/frontend/widgets/social_links'
import RichTextWidget from '@nocode-toolkit/frontend/widgets/richtext'
import HeadingWidget from '@nocode-toolkit/frontend/widgets/heading'
import SearchWidget from '@nocode-toolkit/frontend/widgets/search'
import HTMLWidget from '@nocode-toolkit/frontend/widgets/html'
import SnippetWidget from '@nocode-toolkit/frontend/widgets/snippet'

import defaultForms from '@nocode-toolkit/frontend/forms'

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
]

library.widgets = [
  ImageWidget(),
  SocialLinksWidget(),
  VideoWidget(),
  RichTextWidget(),
  HeadingWidget(),
  SearchWidget(),
  HTMLWidget(),
  SnippetWidget(),
]

library.templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

library.forms = defaultForms

library.settings = {
  initialValues: {
    title: 'Website Title',
    logo: null,
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
      id: 'logo',
      title: 'Logo',
      helperText: 'Upload an image for your logo',
      component: 'image',
      providers: ['local', 'google'],
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

export default library