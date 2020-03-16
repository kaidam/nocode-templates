import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import SystemTree from '@nocode-toolkit/frontend/components/tree/Tree'
const TreeItemEditor = lazy(() => import(/* webpackChunkName: "ui" */ './TreeItemEditor'))

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  const settings = useSelector(settingsSelectors.settings)
  const folderPages = settings.folderPages === 'yes'

  return (
    <div
      className={ classes.root }
    >
      <div className={ classes.content }>
        <SystemTree
          section={ section }
          folderPages={ folderPages }
          ItemEditorComponent={ TreeItemEditor }
          onClick={ onClick }
        />
      </div>
    </div>
  )
}

export default Tree