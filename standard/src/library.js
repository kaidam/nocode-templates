import library from '@nocode-works/template/library'

import systemActions from '@nocode-works/template/store/modules/system'
import uiActions from '@nocode-works/template/store/modules/ui'
import jobActions from '@nocode-works/template/store/modules/job'
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

import ParrotLoading from './components/ParrotLoading'
import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

import utils from './utils'
import config from './config'

const {
  DOCUMENT_SETTINGS_DEFAULT_VALUES,
  SECTIONS,
  QUICKSTARTS,
  ONBOARDING,
  getInitialResources,
} = config

library.topbarHeight = 80
library.autoSnackbar = false
library.sections = SECTIONS.map(section => section.id)
library.quickstarts = QUICKSTARTS
library.onboarding = ONBOARDING

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

library.components.loading = ParrotLoading

library.templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

library.forms = Object.assign({}, defaultForms, {
  logo: {
    initialValues: {
      logo: null,
      favicon: null,
      logo_text: '',
    },
    schema: [
      {
        id: 'logo',
        title: 'Logo',
        helperText: 'Upload an image for your logo',
        component: 'image',
        providers: ['local', 'google'],
      },
      {
        id: 'logo_text',
        title: 'Logo Text',
        helperText: 'Text that will appear next to your logos',
      },
      {
        id: 'favicon',
        title: 'Favicon',
        helperText: 'Upload an image for your favicon',
        component: 'image',
        providers: ['local', 'google'],
      },
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
      filter: `({
        name,
        values,
      }) => {
        if(name == 'company_name') {
          return values.copyright_mode == 'auto'
        }
        return true
      }`,
      isDisabled: `({
        name,
        values,
      }) => {
        if(name == 'copyright_message') return values.copyright_mode != 'manual'
        return false
      }`,
      getValue: `({
        name,
        values,
        value,
        settings,
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
      }`,
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
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    pinterestUrl: '',
    navigation: {
      left: true,
      right: false,
    },
  }, DOCUMENT_SETTINGS_DEFAULT_VALUES),
  tabs: [{
    id: 'main',
    title: 'General',
    schema: [{
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
    },{
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
    title: 'Features',
    schema: [
      'Navigation',
      [
        {
          id: 'sidebarWidth',
          title: 'Width',
          helperText: 'The pixel width of the side bars',
          inputProps: {
            type: 'number',
          },
        },
        {
          id: 'topbarHeight',
          title: 'Height',
          helperText: 'The pixel height of the top bar',
          inputProps: {
            type: 'number',
          },
        },
      ],
      [{
        id: 'leftNavigation',
        title: 'Left Navigation',
        helperText: 'Show a navigation bar on the left hand side.',
        component: 'checkbox',
        showTitle: false,
      },{
        id: 'rightNavigation',
        title: 'Right Navigation',
        helperText: 'Show a navigation bar on the right hand side.',
        component: 'checkbox',
        showTitle: false,
      }],[{
        id: 'footer',
        title: 'Footer',
        helperText: 'Show a footer at the bottom of the website.',
        component: 'checkbox',
        showTitle: false,
      },{
        id: 'folderPages',
        title: 'Folder Pages',
        helperText: 'Render a page for folders with links to their contents',
        component: 'checkbox',
        showTitle: false,
      }],
    ]
  }, {
    id: 'social',
    title: 'Social Links',
    schema: [{
      id: 'facebookUrl',
      title: 'Facebook URL',
      helperText: 'The url of your Facebook profile',
    },{
      id: 'twitterUrl',
      title: 'Twitter URL',
      helperText: 'The url of your Twitter profile',
    },{
      id: 'linkedinUrl',
      title: 'LinkedIn URL',
      helperText: 'The url of your LinkedIn profile',
    },{
      id: 'youtubeUrl',
      title: 'Youtube URL',
      helperText: 'The url of your Youtube profile',
    },{
      id: 'pinterestUrl',
      title: 'Pinterest URL',
      helperText: 'The url of your Pinterest profile',
    },{
      id: 'instagramUrl',
      title: 'Instagram URL',
      helperText: 'The url of your Instagram profile',
    }],
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

    dispatch(systemActions.updateUserMeta({
      driveExperience: quickstartParams.driveExperience,
    }))

    const resourceDescriptors = getInitialResources(quickstartParams)

    const {
      id,
    } = await dispatch(systemActions.ensureSectionResources({
      driver: 'drive',
      resources: resourceDescriptors.resources,
      settings: resourceDescriptors.settings,
      quickstart: quickstartParams.quickstart,
    }))

    await dispatch(jobActions.waitForJobWithLoading({
      jobId: id,
      message: 'Setting up your website for the first time...',
    }))

    ret.reload = true
    ret.redirect = resourceDescriptors.redirect
  }
  
  return ret
}

export default library