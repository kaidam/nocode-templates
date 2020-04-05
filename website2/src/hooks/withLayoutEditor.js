import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import layoutActions from '@nocode-toolkit/frontend/store/modules/layout'

import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'

import icons from '@nocode-toolkit/frontend/icons'

const withLayoutEditor = ({
  content_id,
  layout_id,
}) => {
  const actions = Actions(useDispatch(), {
    onLayoutAdd: layoutActions.add,
  })

  const forms = useSelector(settingsSelectors.forms)

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
    getAddMenu,
  }
  
}

export default withLayoutEditor