import library from '@nocode-works/template/library'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

import onboarding from './onboarding'
import settings from './settings'
import utils from './utils'

import {
  HERO_FORM_NAME,
} from './constants'

library.autoSnackbar = false
library.onboarding = onboarding
library.settings = settings
library.sections = settings.sections

library.templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

library.forms[HERO_FORM_NAME] = {
  processFormValues: (values) => {
    values.mimeType = 'document'
    return values
  },
  tabFilter: (tab, values) => {
    const exists = values && values.id
    if(tab.id == 'actions') return exists
    return true
  },
  tabs: [{
    id: 'settings',
    title: 'Settings',
    noTitle: true,
    schema: [{
      id: 'name',
      title: 'Name',
      helperText: 'Enter the name of the page',
      default: '',
      validate: {
        type: 'string',
        methods: [
          ['required', 'The name is required'],
        ],
      }
    }, {
      id: 'annotation.summary',
      title: 'Summary',
      helperText: 'Enter a summary of what the page is about',
      default: '',
    }, {
      id: 'annotation.image',
      title: 'Image',
      helperText: 'Choose an image to display above this page',
      component: 'image',
      providers: ['local', 'google', 'unsplash', 'unsplash_random'],
      random_query_field: 'name',
      default: null,
    }],
  }, {
    id: 'actions',
    title: 'Actions',
    schema: [{
      id: 'annotation.hideItem',
      title: 'Hide Page',
      helperText: 'Don\'t show this page on the website',
      component: 'hideItem',
    }],
  }]
}

library.initialise = async (dispatch, getState) => {
  await utils.autoAssignPages({
    dispatch,
    getState,
  })
}

library.hooks = utils.hooks

export default library