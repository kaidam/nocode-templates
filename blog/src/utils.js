import Promise from 'bluebird'
import websiteActions from '@nocode-works/template/store/modules/website'
import contentActions from '@nocode-works/template/store/modules/content'
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
  websiteData.name

const autoAssignImages = async (dispatch, getState) => {
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

    const randomImage = await dispatch(contentActions.getRandomContent({
      driver: 'unsplash',
      query: item.searchQuery,
      size: 'landscape'
    }))

    const imageValue = {
      url: randomImage.urls.regular,
      unsplash: {
        image: {
          id: randomImage.id,
        },
        user: {
          fullname: randomImage.user.name,
          username: randomImage.user.username,
        }
      }
    }

    if(item.type == 'tag') {
      const existingSettingsValue = settingsUpdate[item.key] || {}
      settingsUpdate[item.key] = Object.assign({}, existingSettingsValue, {
        image: imageValue,
      })
    }
    else {
      const existingAnnotation = item.annotation || {}
      const newAnnotation = Object.assign({}, existingAnnotation, {
        image: imageValue,
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

export default {
  autoCopyrightMessage,
  tagId,
  tagSettingsKey,
  tagTitle,
  autoAssignImages,
}