import library from '@nocode-works/template/library'

import systemActions from '@nocode-works/template/store/modules/system'
import uiActions from '@nocode-works/template/store/modules/ui'
import settingsActions from '@nocode-works/template/store/modules/settings'
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

import utils from './utils'
import config from './config'

const {
  DOCUMENT_SETTINGS_DEFAULT_VALUES,
  SECTIONS,
  QUICKSTARTS,
  getInitialResources,
} = config

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

library.topbarHeight = 80
library.autoSnackbar = false
library.sections = SECTIONS.map(section => section.id)
library.quickstarts = QUICKSTARTS

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

const injectDocumentSettings = (form, extra = {}) => {
  const initialValues = form.initialValues || {}
  const processFormValues = form.processFormValues

  let injectSchema = (
    extra.schema ?
      extra.schema :
      []
  )
    .concat([{
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
    }])
    .concat(getDocumentSettingsSchema(`annotation.`))

  form.tabs[0].schema = form.tabs[0].schema.concat(injectSchema)

  return Object.assign({}, form, {
    initialValues: {
      annotation: Object.assign({}, DOCUMENT_SETTINGS_DEFAULT_VALUES, initialValues.annotation, extra.initialValues, {
        useDefaults: 'inherit',
      }),
    },
    handlers: {
      isVisible: ({
        name,
        values,
      }) => {
        if(values.id) return true
        if(name == 'annotation.folderLayoutTemplate') return true
        if(name == 'name') return true
        return false
      },
      isDisabled: ({
        name,
        values,
      }) => {
        if(name == 'annotation.useDefaults') return false
        if(name == 'annotation.folderLayoutTemplate') return false
        if(name == 'name') return false
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
        if(name == 'annotation.folderLayoutTemplate') return value
        if(name == 'name') return value
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
      let returnValues = values
      if(useDefaults == 'inherit') {
        const newAnnotation = Object.assign({}, values.annotation)
        Object.keys(DOCUMENT_SETTINGS_DEFAULT_VALUES).forEach(field => delete(newAnnotation[field]))
        returnValues = Object.assign({}, values, {
          annotation: newAnnotation,
        })
      }
      return processFormValues ?
        processFormValues(returnValues) :
        returnValues
    },
    contextSelector: (state) => {
      return {
        settings: settingsSelectors.settings(state),
      }
    },
    
  }) 
}

library.forms = Object.assign({}, defaultForms, {
  'drive.folder': injectDocumentSettings(defaultForms['drive.folder'], {
    initialValues: {
      folderLayoutTemplate: 'default',
    },
    schema: [{
      id: 'annotation.folderLayoutTemplate',
      title: 'Layout Template',
      component: 'radio',
      row: true,
      options: [{
        value: 'default',
        title: 'Default',
      }, {
        value: 'blog',
        title: 'Blog',
      }],
      helperText: 'Choose how the content in this folder will display',
    }]
  }),
  'drive.document': injectDocumentSettings(defaultForms['drive.document']),
  logo: {
    initialValues: {
      logo_mode: 'both',
      logo: null,
      company_name: '',
    },
    schema: [
      {
        id: 'logo_mode',
        title: 'Show',
        component: 'radio',
        row: true,
        options: [{
          value: 'both',
          title: 'Text & Image',
        }, {
          value: 'text',
          title: 'Just Text',
        }, {
          value: 'image',
          title: 'Just Image',
        }],
        helperText: 'Choose whether to include your company name in the logo',
      },
      {
        id: 'company_name',
        title: 'Company / Project name',
        helperText: 'The name of your company or project',
      }, {
        id: 'logo',
        title: 'Logo',
        helperText: 'Upload an image for your logo',
        component: 'image',
        providers: ['local', 'google'],
      }
    ],
  },
  copyright: {
    initialValues: {
      copyright_mode: 'auto',
      copyright_message: utils.autoCopyrightMessage({
        company_name: '',
      }),
      company_name: '',
    },
    schema: [
      {
        id: 'copyright_mode',
        title: 'Mode',
        component: 'radio',
        row: true,
        options: [{
          value: 'auto',
          title: 'Auto',
        }, {
          value: 'manual',
          title: 'Manual',
        }, {
          value: 'none',
          title: 'None',
        }],
        helperText: 'Choose which style of copyright message you want',
      },
      {
        id: 'company_name',
        title: 'Company / Project name',
        helperText: 'The name of your company or project',
      },
      {
        id: 'copyright_message',
        title: 'Copyright Message',
        helperText: 'The copyright message to appear in the footer',
      },
    ],
    contextSelector: (state) => {
      return {
        settings: settingsSelectors.settings(state),
      }
    },
    handlers: {
      filter: ({
        name,
        values,
      }) => {
        if(name == 'company_name') {
          return values.copyright_mode == 'auto'
        }
        return true
      },
      isDisabled: ({
        name,
        values,
      }) => {
        if(name == 'copyright_message') return values.copyright_mode != 'manual'
        return false
      },
      getValue: ({
        name,
        values,
        value,
        context,
      }) => {
        if(name == 'copyright_message') {
          if(values.copyright_mode == 'auto') {
            return utils.autoCopyrightMessage({
              company_name: values.company_name,
            })
          }
          else if(values.copyright_mode == 'none') return 'disabled'
          else return value
        }
        return value
      },
    },
  }
})

library.settings = {
  initialValues: Object.assign({
    company_name: '',
    title: '',
    description: '',
    keywords: '',
    color: {color: "#3f51b5"},
    topbarHeight: 80,
    sidebarWidth: 280,
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
      id: 'company_name',
      title: 'Company / Project name',
      helperText: 'Enter the name of your company or project',
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
      {
        id: 'color',
        title: 'Color',
        helperText: 'Choose your color',
        component: 'color',
      },
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

    ].concat(getDocumentSettingsSchema())
  }],
}

library.handlers = {
  // should we expand a menu for a navbar folder
  // or treat it like a document
  isFolder: (node) => {
    if(node.type != 'folder') return false
    return node.annotation && node.annotation.folderLayoutTemplate == 'blog' ?
      false :
      true
  }
}

/*

  we auto initialise the drive folders for them here

*/
library.initialise = (params = {}) => async (dispatch, getState) => {
  const website = systemSelectors.website(getState())

  const ret = {}

  if(website.meta.autoFoldersEnsure && !website.meta.autoFoldersCreated) {
    const quickstartParams = await dispatch(uiActions.getQuickstartConfig({}))
    
    dispatch(uiActions.setLoading({
      message: 'Setting up your website for the first time...',
    }))

    const resourceDescriptors = getInitialResources({
      quickstart: quickstartParams.quickstart,
    })

    const resources = await dispatch(systemActions.ensureSectionResources({
      driver: 'drive',
      resources: resourceDescriptors.resources,
    }))

    let useSettings = resourceDescriptors.settings

    const topbar = resources.find(resource => resource.id == 'topbar')
    const homepage = (topbar.children || []).find(child => child.name == 'Home')

    await dispatch(systemActions.updateWebsiteMeta({
      autoFoldersCreated: true,
    }))

    if(homepage) {
      useSettings = Object.assign({}, useSettings, {
        homepage: homepage.id,
      })
    }

    await dispatch(settingsActions.updateSettings(useSettings, false))

    ret.reload = true
  }
  
  return ret
}

export default library