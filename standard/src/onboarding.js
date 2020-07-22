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
  editDocument: () => ({
    id: 'editDocument',
    element: 'editDocument',
    type: 'focus',
    title: 'Editing Content',
    offset: '0, 20',
    description: [
      'Each page on a nocode website is a Google Document.',
      'Click "Edit Document" and the Document will open in Google Drive.',
      'Enter some content, then come back to this screen and the content will automatically reload.', 
    ],
    smallDescription: [
      'Each page on a nocode website is a Google Document.',
      'Clicking on "Edit Document" will cause the Document to open in Google Drive.',
      'Once you have entered some content - you can return to nocode and it will automatically load your new content.', 
    ],
  }),
  addSectionContent: () => ({
    id: 'sectionSettings_sidebar_full',
    element: 'sectionSettings_sidebar_full',
    type: 'focus',
    title: 'Creating Content',
    offset: '0, 20',
    disableClick: true,
    description: [
      'Create new content in any section by clicking the "nocode" button.',
      'You can create Folders and Google Documents and any content you create will appear in this section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
    smallDescription: [
      'Create new content in any section by clicking the "nocode" button.',
      'You can create Folders and Google Documents and any content you create will appear in the section.',
      'Also, you can add widgets like images or videos that can spruce up your page.',
    ],
  }),
  editSettings: () => ({
    id: 'editSettings',
    element: 'editSettings',
    type: 'focus',
    title: 'Editing Settings',
    offset: '0, 20',
    disableClick: true,
    initialise: async (dispatch, getState) => {
      await dispatch(uiActions.setSettingsOpen(true))
      await Promise.delay(300)
    },
    description: [
      'You can configure many things for your website using the settings button.',
      'Change layout settings, activate plugins, add custom domains, configure security and many more settings can configured here.',
    ],
    smallDescription: [
      'You can configure many things for your website using the settings button.',
      'Change layout settings, activate plugins, add custom domains, configure security and many more settings can configured here.',
    ],
  }),
  publishWebsite: () => ({
    id: 'publishWebsite',
    element: 'publishWebsite',
    type: 'focus',
    title: 'Publishing Your Website',
    offset: '0, 20',
    disableClick: true,
    cleanup: async (dispatch, getState) => {
      await Promise.delay(300)
      await dispatch(uiActions.setSettingsOpen(false))
    },
    description: [
      'So people can see your amazing content, we need to "publish" it.',
      'This will convert all of your Google documents and combine them into a website.',
      'It will then give you a URL that you can send to your vistors.',
    ],
    smallDescription: [
      'So people can see your amazing content, we need to "publish" it.',
      'This will convert all of your Google documents and combine them into a website.',
      'It will then give you a URL that you can send to your vistors.',
    ],
  }),
}

const ONBOARDING = {
  steps: [
    ONBOARDING_STEPS.sectionFolders(),
    ONBOARDING_STEPS.editDocument(),
    ONBOARDING_STEPS.addSectionContent(),
    ONBOARDING_STEPS.editSettings(),
    ONBOARDING_STEPS.publishWebsite(),
  ]
}

export default ONBOARDING