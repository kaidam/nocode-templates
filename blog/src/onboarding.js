import Promise from 'bluebird'
import uiActions from '@nocode-works/template/store/modules/ui'

import FolderInfoDescription from '@nocode-works/template/components/onboarding/FolderInfoDescription'

const ONBOARDING_STEPS = {
  sectionFolders: () => ({
    id: 'sectionSettings_topbar',
    type: 'focus',
    title: 'Welcome',
    disableClick: true,
    offset: '0, 20',
    placement: 'left',
    description: FolderInfoDescription,
    smallDescription: FolderInfoDescription,
  }),
}

const ONBOARDING = {
  steps: [
    ONBOARDING_STEPS.sectionFolders(),
  ]
}

export default ONBOARDING