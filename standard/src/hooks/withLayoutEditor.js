import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Actions from '@nocode-works/template/utils/actions'
import layoutActions from '@nocode-works/template/store/modules/layout'

import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'

import icons from '@nocode-works/template/icons'

const withLayoutEditor = ({
  content_id,
  layout_id,
}) => {
  const actions = Actions(useDispatch(), {
    onLayoutAdd: layoutActions.add,
  })

  const forms = useSelector(settingsSelectors.forms)
  const annotations = useSelector(nocodeSelectors.annotations)
  const snippets = useSelector(settingsSelectors.pageSnippets)
  const annotation = annotations[content_id] || {}
  const data = annotation[layout_id]

  const onAddWidget = useCallback(({
    form,
    data,
    rowIndex = -1,
  }) => {
    actions.onLayoutAdd({
      content_id,
      layout_id,
      form,
      data,
      rowIndex,
    })
  }, [
    content_id,
    layout_id,
  ])

  const getAddMenu = useCallback((rowIndex = -1) => {
    const plugins = [
      forms.stripe_payment_button ? {
        title: 'Payment Button',
        icon: icons.image,
        handler: () => onAddWidget({
          form: 'stripe_payment_button',
          rowIndex,
        }),
      } : null,
      forms.contactform ? {
        title: 'Contact Form',
        icon: icons.contact,
        handler: () => onAddWidget({
          form: 'contactform',
          rowIndex,
        }),
      } : null
    ].filter(i => i)

    const snippetItems = snippets.map(snippet => {
      return {
        title: snippet.name,
        icon: icons.code,
        handler: () => onAddWidget({
          rowIndex,
          form: 'snippet',
          data: {
            id: snippet.id
          },
        }),
      }
    })

    const media = [
      {
        title: 'Image',
        icon: icons.image,
        handler: () => onAddWidget({
          form: 'image',
          rowIndex,
        }),
      },
      {
        title: 'Youtube Video',
        icon: icons.video,
        handler: () => onAddWidget({
          form: 'video',
          rowIndex,
        }),
      },
      {
        title: 'Social Links',
        icon: icons.people,
        handler: () => onAddWidget({
          form: 'social_links',
          rowIndex,
        }),
      },
    ]

    const text = [
      {
        title: 'Heading',
        icon: icons.title,
        handler: () => onAddWidget({
          form: 'heading',
          rowIndex,
        }),
      },
      {
        title: 'Rich Text',
        icon: icons.text,
        handler: () => onAddWidget({
          form: 'richtext',
          rowIndex,
        }),
      },
      {
        title: 'Search',
        icon: icons.search,
        handler: () => onAddWidget({
          form: 'search',
          rowIndex,
        }),
      },
      {
        title: 'HTML',
        icon: icons.code,
        handler: () => onAddWidget({
          form: 'html',
          rowIndex,
        }),
      },
    ]

    return [
      {
        title: 'Media',
        icon: icons.image,
        items: media,
      },
      {
        title: 'Text',
        icon: icons.text,
        items: text,
      },
      plugins.length > 0 ? {
        title: 'Plugins',
        icon: icons.plugin,
        items: plugins,
      } : null,
      snippetItems.length > 0 ? {
        title: 'Snippets',
        icon: icons.code,
        items: snippetItems,
      } : null,
    ].filter(i => i)
  }, [
    onAddWidget,
    forms,
    snippets,
  ])

  return {
    data,
    getAddMenu,
  }
  
}

export default withLayoutEditor