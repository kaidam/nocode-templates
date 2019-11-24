import library from '@nocode-toolkit/ui/types/library'
import googleDriveSchemas from '@nocode-toolkit/ui/types/drive/schemas'
import localSchemas from '@nocode-toolkit/ui/types/local/schemas'

import LayoutDefault from './pages/Layout'
import PageDefault from './pages/Document'

library.add(googleDriveSchemas)
library.add(localSchemas)

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