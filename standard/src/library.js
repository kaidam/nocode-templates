import library from '@nocode-works/template/library'

import systemActions from '@nocode-works/template/store/modules/system'
import uiActions from '@nocode-works/template/store/modules/ui'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'

import StripePlugin from '@nocode-works/plugin-stripe/ui'
import ContactFormPlugin from '@nocode-works/plugin-contactform/ui'

import ImageWidget from '@nocode-works/template/widgets/image'
import VideoWidget from '@nocode-works/template/widgets/video'
import SocialLinksWidget from '@nocode-works/template/widgets/social_links'
import RichTextWidget from '@nocode-works/template/widgets/richtext'
import HeadingWidget from '@nocode-works/template/widgets/heading'
import SearchWidget from '@nocode-works/template/widgets/search'
import HTMLWidget from '@nocode-works/template/widgets/html'
import SnippetWidget from '@nocode-works/template/widgets/snippet'

import defaultForms from '@nocode-works/template/forms'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

const SECTIONS = [
  'sidebar',
  'rightbar',
  'topbar',
  'footer',
]

const DOCUMENT_SETTINGS_DEFAULT_VALUES = {
  breadcrumbs: 'yes',
  documentTitle: 'yes',
  documentInfo: 'yes',
  backNextButtons: 'yes',
  imageDropshadow: 'no',
}

const getDocumentSettingsSchema = (prefix = '') => {
  return [
    [
      {
        id: prefix + 'breadcrumbs',
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
        id: prefix + 'backNextButtons',
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
        id: prefix + 'documentTitle',
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
        id: prefix + 'documentInfo',
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
        id: prefix + 'imageDropshadow',
        title: 'Image Drop Shadow & Border',
        helperText: 'Apply a drop shadow and border to any images in a google document',
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
}

library.autoSnackbar = false
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

const baseDocumentSettingsFields = [
  'breadcrumbs',
  'backNextButtons',
  'documentTitle',
  'documentInfo',
  'imageDropshadow',
]

library.forms = Object.assign({}, defaultForms, {
  documentSettings: {
    id: 'documentSettings',
    title: 'Settings',
    initialValues: {
      annotation: Object.assign({}, DOCUMENT_SETTINGS_DEFAULT_VALUES, {
        useDefaults: 'inherit',
      }),
    },
    handlers: {
      isDisabled: ({
        name,
        values,
      }) => {
        if(name == 'annotation.useDefaults') return false
        const useDefaults = values.annotation.useDefaults
        return useDefaults == 'inherit'
      },
      getValue: ({
        name,
        values,
        value,
        context,
      }) => {
        if(name == 'annotation.useDefaults') return value
        const useDefaults = values.annotation.useDefaults
        if(useDefaults == 'inherit') {
          const key = name.split('.')[1]
          return context.settings[key]
        } else {
          return value
        }
      },
    },
    processFormValues: (values, context) => {
      const {
        useDefaults,
      } = values.annotation
      if(useDefaults == 'inherit') {
        const newAnnotation = Object.assign({}, values.annotation)
        baseDocumentSettingsFields.forEach(field => delete(newAnnotation[field]))
        return Object.assign({}, values, {
          annotation: newAnnotation,
        })
      }
      return values
    },
    contextSelector: (state) => {
      return {
        settings: settingsSelectors.settings(state),
      }
    },
    schema: [{
      id: 'annotation.useDefaults',
      title: 'Use Website Settings',
      helperText: 'Inherit the following values from the website settings',
      component: 'radio',
      row: true,
      options: [{
        title: 'Inherit',
        value: 'inherit',
      }, {
        title: 'Override',
        value: 'override',
      }]
    }].concat(getDocumentSettingsSchema(`annotation.`))
  }
})

library.settings = {
  initialValues: Object.assign({
    title: 'Website Title',
    logo: null,
    logo_title: '',
    copyright_message: '&copy; &year; My Company Name',
    description: '',
    keywords: '',
    color: {color: "#3f51b5"},
    topbarHeight: 80,
    sidebarWidth: 240,
    folderPages: 'yes',
    navigation: {
      left: true,
      right: false,
    },
  }, DOCUMENT_SETTINGS_DEFAULT_VALUES),
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
      id: 'logo_title',
      title: 'Logo Title',
      helperText: 'Enter the text to appear next to your logo',
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

    ]
  }, {
    id: 'document',
    title: 'Document',
    schema: getDocumentSettingsSchema(),
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