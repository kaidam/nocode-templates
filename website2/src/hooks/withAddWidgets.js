import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import settingsSelectors from '@nocode-toolkit/core/settingsSelectors'
import icons from '@nocode-toolkit/frontend/icons'

const withAddWidgets = ({
  onSelect,
}) => {

  const forms = useSelector(settingsSelectors.forms)
  
  const getAddWidgets = useCallback(() => {
    return [
      {
        title: 'Image',
        icon: icons.image,
        handler: () => onSelect('image'),
      },
      {
        title: 'Youtube Video',
        icon: icons.video,
        handler: () => onSelect('video'),
      },
      {
        title: 'Social Links',
        icon: icons.people,
        handler: () => onSelect('social_links'),
      },
      forms.stripe_payment_button ? {
        title: 'Payment Button',
        icon: icons.image,
        handler: () => onSelect('stripe_payment_button'),
      } : null
    ].filter(i => i)
  }, [
    onSelect,
    forms,
  ])

  return getAddWidgets
}

export default withAddWidgets