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

export default library