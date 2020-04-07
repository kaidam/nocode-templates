import React, { lazy, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'
import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import Title from '@nocode-toolkit/frontend/components/document/Title'
import BreadCrumbs from '@nocode-toolkit/frontend/components/document/BreadCrumbs'
import Info from '@nocode-toolkit/frontend/components/document/Info'
import BackNextButtons from '@nocode-toolkit/frontend/components/document/BackNextButtons'
import Body from '@nocode-toolkit/frontend/components/document/Body'
import Folder from '@nocode-toolkit/frontend/components/document/Folder'
import Layout from '@nocode-toolkit/frontend/components/layout/Layout'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const DocumentEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Document'))
const LayoutEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Layout'))

const useStyles = makeStyles(theme => ({
  cell: {
    padding: theme.spacing(0.5),
  },
  editorTop: {
    marginBottom: theme.spacing(1),
  },
  editorBottom: {
    marginTop: theme.spacing(1),
  }
}))

const DocumentPage = ({

} = {}) => {
  const classes = useStyles()
  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const {
    node,
    route,
    annotation,
    html,
  } = useSelector(contentSelectors.document)

  const activeWidgets = useMemo(() => {
    const values =  !annotation.useDefaults || annotation.useDefaults == 'inherit' ?
      settings :
      annotation
    const retValues = Object.assign({}, values)
    // we don't have documentInfo for folder pages
    if(driveUtils.isFolder(node)) {
      retValues.documentInfo = 'no'
    }
    return retValues
  }, [
    settings,
    annotation,
    node,
    route,
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
        activeWidgets.breadcrumbs == 'yes' && (
          <div className={ classes.cell }>
            <BreadCrumbs
              node={ node }
            />
          </div>
          
        )
      }
      {
        activeWidgets.documentTitle == 'yes' && (
          <div className={ classes.cell }>
            <Title
              node={ node }
            />
          </div>
          
        )
      }
      {
        activeWidgets.documentInfo == 'yes' && (
          <div className={ classes.cell }>
            <Info
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
          className: classes.editorTop,
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
        {
          driveUtils.isFolder(node) ? (
            <Folder
              node={ node }
            />
          ) : (
            <Body
              node={ node }
              html={ html }
            />
          )
        }
        
      </div>
      <Suspense
        Component={ DocumentEditor }
        props={{
          node: node,
          annotation: annotation,
          layout_id: bottomLayoutId,
          className: classes.editorBottom,
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
      {
        activeWidgets.backNextButtons == 'yes' && (
          <div className={ classes.cell }>
            <BackNextButtons
              node={ node }
            />
          </div>
          
        )
      }
    </div>
  )
}

export default DocumentPage
