import library from '@nocode-works/template/library'

import systemActions from '@nocode-works/template/store/modules/system'
import uiActions from '@nocode-works/template/store/modules/ui'
import jobActions from '@nocode-works/template/store/modules/job'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'

import EcommerceWidget from '@nocode-works/template/widgets/ecommerce'
import ContactFormWidget from '@nocode-works/template/widgets/contactform'
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
import settings from './settings'

const {
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

library.widgets = [
  ImageWidget(),
  SocialLinksWidget(),
  VideoWidget(),
  RichTextWidget(),
  HeadingWidget(),
  SearchWidget(),
  HTMLWidget(),
  SnippetWidget(),
  EcommerceWidget(),
  ContactFormWidget(),
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

library.settings = settings

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