import Promise from 'bluebird'
import formActions from '@nocode-works/template/store/modules/form'
import websiteActions from '@nocode-works/template/store/modules/website'
import contentActions from '@nocode-works/template/store/modules/content'
import unsplashActions from '@nocode-works/template/store/modules/unsplash'
import routerActions from '@nocode-works/template/store/modules/router'
import uiActions from '@nocode-works/template/store/modules/ui'
import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import websiteSelectors from '@nocode-works/template/store/selectors/website'

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

const autoAssignImages = async ({
  dispatch,
  getState,
}) => {
  const nodes = nocodeSelectors.nodes(getState())
  const annotations = nocodeSelectors.annotations(getState())
  const settings = settingsSelectors.settings(getState())
  const websiteId = websiteSelectors.websiteId(getState())
  const websiteData = websiteSelectors.websiteData(getState())

  const storeTagSelector = contentSelectors.mergedAnnotationArray()
  const storeTagData = storeTagSelector(getState(), 'blogpost_tags')

  // the empty tag is for the homepage
  // our utils will pick this up and turn it into 'root'
  const allTags = ['']
    .concat(storeTagData)
    .map(tag => {
      const title = tagTitle(tag, websiteData)
      return {
        type: 'tag',
        id: tagId(tag),
        key: tagSettingsKey(tag),
        title,
        searchQuery: title,
      }
    })
    .filter(item => {
      const value = settings[item.key]
      return value && value.image ? false : true
    })

  const allPosts = Object
    .keys(nodes)
    .filter(id => {
      const annotation = annotations[id]
      return annotation && annotation.form == 'drive.blogpost'
    })
    .map(id => {
      const annotation = annotations[id]
      const node = nodes[id]
      const title = annotation.initialBlogPost ?
        websiteData.name :
        node.name
      return {
        type: 'post',
        node: nodes[id],
        annotation: annotations[id],
        title,
        searchQuery: title,
      }
    })
    .filter(item => {
      return item.annotation.image ? false : true
    })

  const allItems = allTags.concat(allPosts)
  const settingsUpdate = {}
  await Promise.map(allItems, async item => {

    const randomImage = await dispatch(unsplashActions.getRandomImage({
      query: item.searchQuery,
    }))

    if(item.type == 'tag') {
      const existingSettingsValue = settingsUpdate[item.key] || {}
      settingsUpdate[item.key] = Object.assign({}, existingSettingsValue, {
        image: randomImage,
      })
    }
    else {
      const existingAnnotation = item.annotation || {}
      const newAnnotation = Object.assign({}, existingAnnotation, {
        image: randomImage,
      })
      await dispatch(contentActions.updateAnnotation({
        id: item.node.id,
        data: newAnnotation,
      }))
    }
  })

  await dispatch(websiteActions.updateMeta(websiteId, {
    settings: Object.assign({}, settings, settingsUpdate),
  }, {
    snackbar: false,
  }))
}

const hooks = {
  createContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    const annotations = nocodeSelectors.annotations(getState())
    const annotation = annotations[item.id] || {}
    if(annotation.form == 'drive.blogpost') {
      await autoAssignImages({
        dispatch,
        getState,
      })
      const routeMap = nocodeSelectors.routeMap(getState())
      const route = routeMap[`section:blogposts:${item.id}`]
      dispatch(routerActions.navigateTo(route.name))
    }
  },
  editContent: async ({
    dispatch,
    getState,
    item,
  }) => {
    const annotations = nocodeSelectors.annotations(getState())
    const annotation = annotations[item.id] || {}
    if(annotation.form == 'drive.blogpost') {
      await autoAssignImages({
        dispatch,
        getState,
      })
      const routeMap = nocodeSelectors.routeMap(getState())
      const route = routeMap[`section:blogposts:${item.id}`]
      dispatch(routerActions.navigateTo(route.name))
    }
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
    const annotations = nocodeSelectors.annotations(getState())
    const annotation = annotations[item.id] || {}
    if(annotation.form == 'drive.blogpost') {
      await autoAssignImages({
        dispatch,
        getState,
      })
      const routeMap = nocodeSelectors.routeMap(getState())
      const route = routeMap[`section:blogposts:${item.id}`]
      dispatch(routerActions.navigateTo(route.name)) 
    }
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
  autoCopyrightMessage,
  tagId,
  tagSettingsKey,
  tagTitle,
  autoAssignImages,
  hooks,
}