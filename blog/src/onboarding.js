import Promise from 'bluebird'
import uiActions from '@nocode-works/template/store/modules/ui'
import routerActions from '@nocode-works/template/store/modules/router'

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
    initialise: async (dispatch, getState) => {
      dispatch(routerActions.navigateTo('my-first-blog-post'))
    },
  }),
  addSectionContent: () => ({
    id: 'navbar_blogposts_full',
    element: 'navbar_blogposts_full',
    type: 'focus',
    title: 'Creating Content',
    //offset: '0, 20',
    disableClick: true,
    description: [
      'Each blog post on your website is loaded from a Google document.',
      'Create new blog posts by clicking the add button.',
      'Make sure you create "tags" for your posts, this will create menu items for each tag'
    ],
    smallDescription: [
      'Each blog post on your website is loaded from a Google document.',
      'Create new blog posts by clicking the add button.',
      'Make sure you create "tags" for your posts, this will create menu items for each tag'
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
    onClose: async (dispatch, getState) => {
      await dispatch(uiActions.setSettingsOpen(false))
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
    ONBOARDING_STEPS.addSectionContent(),
    ONBOARDING_STEPS.editSettings(),
    ONBOARDING_STEPS.publishWebsite(),
  ]
}

export default ONBOARDING