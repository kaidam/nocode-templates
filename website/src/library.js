import library from '@nocode-toolkit/ui/types/library'
import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
import localSchemas from '@nocode-toolkit/ui/types/local/schemas'
import unsplashSchemas from '@nocode-toolkit/ui/types/unsplash/schemas'
import TitleCell from '@nocode-toolkit/website-material-ui/components/cells/Title'

import plugins from './plugins'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

library.add(googleDriveSchemas)
library.add(localSchemas)
library.add(unsplashSchemas)
library.addPlugin(plugins.stripe)
library.addPlugin(plugins.contactform)

const titleSchema = library.get('local.title')
titleSchema.cellConfig.component = TitleCell

const templates = {
  layouts: {
    default: LayoutDefault,
  },
  pages: {
    default: PageDefault,
  },
}

export default {
  library,
  templates,
}