import React, { lazy, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'
import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import Title from '@nocode-toolkit/frontend/components/document/Title'
import Body from '@nocode-toolkit/frontend/components/document/Body'
import Layout from '@nocode-toolkit/frontend/components/layout/Layout'

const DocumentEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Document'))
const LayoutEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Layout'))

const useStyles = makeStyles(theme => ({
  cell: {
    padding: theme.spacing(0.5),
  },
}))

const DocumentPage = ({

} = {}) => {
  const classes = useStyles()
  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const {
    node,
    annotation,
    html,
  } = useSelector(contentSelectors.document)

  const activeWidgets = useMemo(() => {
    return !annotation.useDefaults || annotation.useDefaults == 'inherit' ?
      settings :
      annotation
  }, [
    settings,
    annotation,
  ])

  const topLayoutId = 'topLayout'
  const bottomLayoutId = 'bottomLayout'
  const topLayoutProps = {
    content_id: node.id,
    layout_id: topLayoutId,
  }
  const bottomLayoutProps = {
    content_id: node.id,
    layout_id: bottomLayoutId,
  }
  
  if(!node) return null
  return (
    <div className="document-container">
      {
        activeWidgets.documentTitle && (
          <div className={ classes.cell }>
            <Title
              node={ node }
            />
          </div>
          
        )
      }
      <Suspense
        Component={ DocumentEditor }
        props={{
          node: node,
          annotation: annotation,
          layout_id: topLayoutId,
        }}
      />
      {
        showUI ? (
          <Suspense
            Component={ LayoutEditor }
            props={ topLayoutProps }
          />
        ) : (
          <Layout { ...topLayoutProps } />
        )
      }
      <div className={ classes.cell }>
        <Body
          node={ node }
          html={ html }
        />
      </div>
      <Suspense
        Component={ DocumentEditor }
        props={{
          node: node,
          annotation: annotation,
          layout_id: bottomLayoutId,
        }}
      />
      {
        showUI ? (
          <Suspense
            Component={ LayoutEditor }
            props={ bottomLayoutProps }
          />
        ) : (
          <Layout { ...bottomLayoutProps } />
        )
      }
    </div>
  )
}

export default DocumentPage
