import React, { lazy, useRef, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import SystemTree from '@nocode-toolkit/frontend/components/tree/Tree'
import Layout from '@nocode-toolkit/frontend/components/layout/Layout'

const ItemEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Item'))
const TreeEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Tree'))
const TreeWidgetsEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/TreeWidgets'))
const LayoutEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Layout'))

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  header: {
    flexGrow: 0,
  },
  widgets: {
    flexGrow: 0,
  },
  content: {
    flexGrow: 1,
  },
}))

const Tree = ({
  section,
  onClick,
}) => {
  const classes = useStyles()
  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const folderPages = settings.folderPages === 'yes'
  const containerRef = useRef()

  const layoutProps = {
    content_id: `section:${section}`,
    layout_id: 'widgets',
  }

  return (
    <div
      className={ classes.root }
    >
      {
        showUI && (
          <div className={ classes.header }>
            <Suspense
              Component={ TreeWidgetsEditor }
              props={ layoutProps }
            />
          </div>
        )
      }
      {
        showUI ? (
          <Suspense
            Component={ LayoutEditor }
            props={ layoutProps }
          />
        ) : (
          <Layout { ...layoutProps } />
        )
      }
      {
        showUI && (
          <div className={ classes.header }>
            <Suspense
              Component={ TreeEditor }
              props={{
                section,
              }}
            />
          </div>
        )
      }
      <div
        className={ classes.content }
        ref={ containerRef }
      >
        <SystemTree
          section={ section }
          folderPages={ folderPages }
          ItemEditorComponent={ ItemEditor }
          containerRef={ containerRef }
          onClick={ onClick }
        />
      </div>
    </div>
  )
}

export default Tree