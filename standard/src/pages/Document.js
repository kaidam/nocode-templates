import React, { lazy, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-works/template/store/selectors/content'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'

import Suspense from '@nocode-works/template/components/system/Suspense'
import Title from '@nocode-works/template/components/document/Title'
import BreadCrumbs from '@nocode-works/template/components/document/BreadCrumbs'
import Info from '@nocode-works/template/components/document/Info'
import BackNextButtons from '@nocode-works/template/components/document/BackNextButtons'
import Body from '@nocode-works/template/components/document/Body'
import Folder from '@nocode-works/template/components/document/Folder'
import Layout from '@nocode-works/template/components/layout/Layout'
import driveUtils from '@nocode-works/template/utils/drive'

import BlogFolderLayout from '../components/BlogFolderLayout'

import config from '../config'

const DefaultFolder = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/DefaultFolder'))
const DefaultHome = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/DefaultHome'))
const DraggableLayout = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/layout/DraggableLayout'))

const {
  topLayoutId,
  bottomLayoutId,
} = config.DOCUMENT

const useStyles = makeStyles(theme => ({
  cell: {
    padding: theme.spacing(0.5),
  },
  editorTop: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  editorBottom: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  bodyContainer: ({
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
    route,
    annotation,
    html,
  } = useSelector(contentSelectors.document)

  const activeWidgets = useMemo(() => {
    const values =  !annotation || !annotation.useDefaults || annotation.useDefaults == 'inherit' ?
      settings :
      annotation
    const retValues = Object.assign({}, values)
    // we don't have documentInfo for folder pages
    if(driveUtils.isFolder(node)) {
      retValues.documentInfo = false
    }
    return retValues
  }, [
    settings,
    annotation,
    node,
    route,
  ])

  const classes = useStyles({
    imageDropshadow: activeWidgets.imageDropshadow,
    autoLineHeight: activeWidgets.autoLineHeight
  })

  const topLayoutProps = {
    content_id: node.id,
    layout_id: topLayoutId,
  }
  const bottomLayoutProps = {
    content_id: node.id,
    layout_id: bottomLayoutId,
  }

  const isBlogLayout = annotation && annotation.folderLayoutTemplate == 'blog'

  const FolderComponent = isBlogLayout ?
    BlogFolderLayout :
    Folder

  const addContentFilter = isBlogLayout ?
    ['document'] :
    null

  const isHomepage = settings.homepage == node.id

  const isWidgetActive = (name) => {
    if(isHomepage) return false
    return activeWidgets[name]
  }
  
  if(!node) return null

  if(node.type == 'defaultHome') {
    return (
      <Suspense
        Component={ DefaultHome }
      />
    )
  }

  return (
    <div className="document-container">
      {
        isWidgetActive('breadcrumbs') && (
          <div className={ classes.cell }>
            <BreadCrumbs
              node={ node }
              activeWidgets={ activeWidgets }
            />
          </div>
          
        )
      }
      {
        isWidgetActive('documentTitle') && (
          <div className={ classes.cell }>
            <Title
              node={ node }
              activeWidgets={ activeWidgets }
            />
          </div>
          
        )
      }
      {
        isWidgetActive('documentInfo') && (
          <div className={ classes.cell }>
            <Info
              node={ node }
              activeWidgets={ activeWidgets }
            />
          </div>
          
        )
      }
      {
        showUI ? (
          <Suspense
            Component={ DraggableLayout }
            props={ topLayoutProps }
          />
        ) : (
          <Layout { ...topLayoutProps } />
        )
      }
      <div className={ classes.cell }>
        {
          driveUtils.isFolder(node) ? (
            <FolderComponent
              node={ node }
              DefaultFolder={ DefaultFolder }
              addContentFilter={ addContentFilter }
            />
          ) : (
            <div className={ classes.bodyContainer }>
              <Body
                node={ node }
                html={ html }
                defaultLayoutId={ topLayoutId }
              />
            </div>
          )
        }
        
      </div>
      {
        showUI ? (
          <Suspense
            Component={ DraggableLayout }
            props={ bottomLayoutProps }
          />
        ) : (
          <Layout { ...bottomLayoutProps } />
        )
      }
      {
        isWidgetActive('backNextButtons') && (
          <div className={ classes.cell }>
            <BackNextButtons
              node={ node }
              activeWidgets={ activeWidgets }
            />
          </div>
          
        )
      }
    </div>
  )
}

export default DocumentPage
