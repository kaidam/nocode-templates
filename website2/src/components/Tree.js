import React, { lazy, useRef, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import SystemTree from '@nocode-toolkit/frontend/components/tree/Tree'

const ItemEditor = lazy(() => import(/* webpackChunkName: "ui" */ './ItemEditor'))
const TreeSectionEditor = lazy(() => import(/* webpackChunkName: "ui" */ './TreeSectionEditor'))
const TreeWidgetsEditor = lazy(() => import(/* webpackChunkName: "ui" */ './TreeWidgetsEditor'))

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexGrow: 0,
  },
  widgets: {
    flexGrow: 0,
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
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
  const sectionSelector = useMemo(contentSelectors.section, [])
  const sectionData = useSelector(state => sectionSelector(state, section))
  if(!sectionData) return
  const annotation = sectionData.annotation || {}
  const layout = annotation.layout

  return (
    <div
      className={ classes.root }
    >
      {
        showUI && (
          <div className={ classes.header }>
            <Suspense
              Component={ TreeWidgetsEditor }
              props={{
                section,
              }}
            />
          </div>
        )
      }
      {
        showUI && (
          <div className={ classes.header }>
            <Suspense
              Component={ TreeSectionEditor }
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