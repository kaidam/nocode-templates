import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import layoutActions from '@nocode-toolkit/frontend/store/modules/layout'

import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import nocodeSelectors from '@nocode-toolkit/frontend/store/selectors/nocode'

import icons from '@nocode-toolkit/frontend/icons'

const withLayoutEditor = ({
  content_id,
  layout_id,
}) => {
  const actions = Actions(useDispatch(), {
    onLayoutAdd: layoutActions.add,
    onLayoutDelete: layoutActions.delete,
  })

  const forms = useSelector(settingsSelectors.forms)
  const annotations = useSelector(nocodeSelectors.annotations)
  const annotation = annotations[content_id] || {}
  const data = annotation[layout_id]

  const onAddWidget = useCallback((form, rowIndex = -1) => {
    actions.onLayoutAdd({
      content_id,
      layout_id,
      form,
      rowIndex,
    })
  }, [
    content_id,
    layout_id,
  ])

  const onDeleteCell = useCallback(({rowIndex, cellIndex}) => {
    actions.onLayoutDelete({
      content_id,
      layout_id,
      rowIndex,
      cellIndex,
    })
  }, [
    content_id,
    layout_id,
  ])

  const getAddMenu = useCallback((rowIndex = -1) => {
    return [
      {
        title: 'Image',
        icon: icons.image,
        handler: () => onAddWidget('image', rowIndex),
      },
      {
        title: 'Youtube Video',
        icon: icons.video,
        handler: () => onAddWidget('video', rowIndex),
      },
      {
        title: 'Social Links',
        icon: icons.people,
        handler: () => onAddWidget('social_links', rowIndex),
      },
      forms.stripe_payment_button ? {
        title: 'Payment Button',
        icon: icons.image,
        handler: () => onAddWidget('stripe_payment_button', rowIndex),
      } : null
    ].filter(i => i)
  }, [
    onAddWidget,
    forms,
  ])

  return {
    data,
    getAddMenu,
    onDeleteCell,
  }
  
}

export default withLayoutEditor