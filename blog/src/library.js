import library from '@nocode-works/template/library'
import widgets from '@nocode-works/template/widgets'

import DocumentInfo from './widgets/DocumentInfo'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

import onboarding from './onboarding'
import settings from './settings'
import utils from './utils'

widgets.documentInfo = DocumentInfo
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

library.forms['drive.blogpost'] = {
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
      helperText: 'Enter the name of the blog post',
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
      helperText: 'Enter a summary of what the blog post is about',
      default: '',
    }, {
      id: 'annotation.image',
      title: 'Image',
      helperText: 'Choose an image to display above this blog post',
      component: 'image',
      providers: ['local', 'google', 'unsplash', 'unsplash_random'],
      random_query_field: 'name',
      default: null,
    },
    {
      id: 'annotation.blogpost_tags',
      title: 'Tags',
      helperText: 'Associate this blog post with the following tags',
      component: 'tags',
      field: 'blogpost_tags',
      default: [],
    }],
  }, {
    id: 'actions',
    title: 'Actions',
    schema: [{
      id: 'annotation.hideItem',
      title: 'Hide Blogpost',
      helperText: 'Don\'t show this blog post on the website',
      component: 'hideItem',
    }],
  }]
}

library.initialise = async (dispatch, getState) => {
  await utils.autoAssignImages({
    dispatch,
    getState,
  })
}

library.hooks = {
  createContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    await utils.postCreatedHandler({
      dispatch,
      getState,
      item,
    })
  },
  hideContent: async ({
    dispatch,
    getState,
    id,
  }) => {
    await utils.postHideHandler({
      dispatch,
      getState,
      id,
    })
  },
  importContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    await utils.postImportHandler({
      dispatch,
      getState,
      item,
    })
  },
  removeSectionContent: async ({
    dispatch,
    getState,
    id,
  }) => {
    await utils.postRemoveSectionContentHandler({
      dispatch,
      getState,
      id,
    })
  },
}

export default library