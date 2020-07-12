import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-works/template/store/selectors/content'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'

import Suspense from '@nocode-works/template/components/system/Suspense'
import Layout from '@nocode-works/template/components/layout/Layout'

const DraggableLayout = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/layout/DraggableLayout'))

const useStyles = makeStyles(theme => ({
  container: ({
    imageDropshadow,
    autoLineHeight,
  }) => {

    const ret = {}

    if(imageDropshadow) {
      ret['& .nocode-document-image-container'] = {
        boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)',
      }
      ret['& .nocode-document-image'] = {
        display: 'block',
      }
    }

    if(autoLineHeight) {
      ret['& #nocode-document-html p'] = {
        lineHeight: [1.5, '!important'],
      }
    }

    return ret
  }
}))

const DocumentPage = ({

} = {}) => {
  
  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)

  const {
    node,
    layout,
  } = useSelector(contentSelectors.document)

  const classes = useStyles({
    imageDropshadow: settings.imageDropshadow,
    autoLineHeight: settings.autoLineHeight
  })

  return (
    <div className="document-container">
      <div className={ classes.container }>
        {
          showUI ? (
            <Suspense
              Component={ DraggableLayout }
              props={{
                content_id: node.id,
                layout_id: 'layout',
                data: layout,
              }}
            />
          ) : (
            <Layout
              content_id={ node.id }
              layout_id={ 'layout' }
              data={ layout }
            />
          )
        }
      </div>
    </div>
  )
}

export default DocumentPage
