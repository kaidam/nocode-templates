import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import websiteSelectors from '@nocode-works/template/store/selectors/website'
import websiteActions from '@nocode-works/template/store/modules/website'
import contentActions from '@nocode-works/template/store/modules/content'

const RandomImageLoader = ({
  mode = 'tag',
  prefix,
  values,
  content_id,
  annotation,
} = {}) => {

  const dispatch = useDispatch()
  const websiteId = useSelector(websiteSelectors.websiteId)
  const settings = useSelector(settingsSelectors.settings)

  useEffect(() => {
    const loader = async () => {
      if(!values.image) {
        const random = await dispatch(contentActions.getRandomContent({
          driver: 'unsplash',
          query: values.title,
          size: 'landscape'
        }))

        const imageValue = {
          url: random.urls.regular,
          unsplash: {
            image: {
              id: random.id,
            },
            user: {
              fullname: random.user.name,
              username: random.user.username,
            }
          }
        }
        if(mode == 'tag') {
          const settingsUpdate = Object.assign({}, settings, {
            [prefix]: {
              title: values.title,
              subtitle: values.subtitle,
              image: imageValue,
            }
          })
          dispatch(websiteActions.updateMeta(websiteId, {
            settings: settingsUpdate,
          }))
        }
        else if(mode == 'annotation') {
          const newAnnotation = Object.assign({}, annotation, {
            image: imageValue,
          })
          dispatch(contentActions.updateAnnotation({
            id: content_id,
            data: newAnnotation,
          }))
        }
      }
    }
    loader()
  }, [
    values,
  ])
  
  return null
}

export default RandomImageLoader
