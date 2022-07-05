import Promise from 'bluebird'
import websiteActions from '@nocode-works/template/store/modules/website'
import contentActions from '@nocode-works/template/store/modules/content'
import unsplashActions from '@nocode-works/template/store/modules/unsplash'
import routerActions from '@nocode-works/template/store/modules/router'
import uiActions from '@nocode-works/template/store/modules/ui'
import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import websiteSelectors from '@nocode-works/template/store/selectors/website'

import {
  HERO_FORM_NAME,
} from './constants'

const autoCopyrightMessage = ({
  company_name,
}) => {
  return `© ${new Date().getFullYear()} ${company_name}`
}

const tagId = tag => (tag || 'root').toLowerCase().replace(/\W+/g, '_')
const tagSettingsKey = tag => `blogsection_${tagId(tag)}`
const tagTitle = (tag, websiteData) => tag ?
  tag.replace(/^(\w)/, st => st.toUpperCase()) :
  (websiteData ? websiteData.name : '')


const getPageUnsplashQuery = (node, state) => {
  const title = node.name
  let searchQueryParts = [title]
  const settings = settingsSelectors.settings(state)
  if(settings.theme && settings.theme != 'General') {
    searchQueryParts = [settings.theme].concat(searchQueryParts)
  }
  return searchQueryParts.join(' ')
}

// auto-assign the annotation values
// for the correct editable page form
// and the image for each page
const autoAssignPages = async ({
  dispatch,
  getState,
}) => {
  const nodes = nocodeSelectors.nodes(getState())
  const annotations = nocodeSelectors.annotations(getState())

  const allPagesToUpdate = Object
    .keys(nodes)
    .map(id => {
      const node = nodes[id]
      const title = node.name
      return {
        type: 'page',
        node,
        annotation: annotations[id] || {},
        title,
      }
    })
    .filter(item => {
      if(item.node.type == 'defaultHome') return false
      const hasImage = item.annotation.image ? true : false
      const hasForm = (item.annotation.form && item.annotation.form != 'drive.document') ? true : false
      return !hasImage || !hasForm
    })

  await Promise.map(allPagesToUpdate, async item => {

    const existingAnnotation = item.annotation || {}
    const newAnnotation = Object.assign({}, existingAnnotation, {})

    if(!existingAnnotation.image) {
      const searchQuery = getPageUnsplashQuery(item.node, getState())
      const randomImage = await dispatch(unsplashActions.getRandomImage({
        query: searchQuery,
      }))
      newAnnotation.image = randomImage
    }

    newAnnotation.form = HERO_FORM_NAME
    
    await dispatch(contentActions.updateAnnotation({
      id: item.node.id,
      data: newAnnotation,
    }))
  })
}

const hooks = {
  createContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    await autoAssignPages({
      dispatch,
      getState,
    })
  },
  editContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    await autoAssignPages({
      dispatch,
      getState,
    })
  },
  resyncDrive: async ({
    dispatch,
    getState,
    id,
  }) => {
    await autoAssignPages({
      dispatch,
      getState,
    })
  },
  hideContent: async ({
    dispatch,
    getState,
    id,
  }) => {
    await dispatch(routerActions.navigateTo('root'))
    await dispatch(uiActions.cancelFormWindow())
  },
  importContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    await autoAssignPages({
      dispatch,
      getState,
    })
  },
  removeSectionContent: async ({
    dispatch,
    getState,
    id,
  }) => {
    await dispatch(uiActions.cancelFormWindow())  
  },

}

export default {
  getPageUnsplashQuery,
  autoCopyrightMessage,
  tagId,
  tagSettingsKey,
  tagTitle,
  autoAssignPages,
  hooks,
}