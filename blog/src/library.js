import library from '@nocode-works/template/library'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

import onboarding from './onboarding'
import settings from './settings'

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
    },{
      id: 'annotation.blogpost_tags',
      title: 'Tags',
      helperText: 'Associate this blog post with the following tags',
      component: 'tags',
      field: 'blogpost_tags',
      default: [],
    }],
  }]
}

export default library