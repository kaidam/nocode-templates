import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'
import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import useSectionTree from '@nocode-toolkit/frontend/components/hooks/useSectionTree'

import List from '@material-ui/core/List'
import TreeItem from './TreeItem'

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
  editor: {
    flexGrow: 0,
    borderBottom: '1px solid #ccc',
  },
  panelTop: {
    flexGrow: 0,
  },
  panelBottom: {
    flexGrow: 0,
  },

  list: {

  },

  itemChildren: {
    paddingLeft: theme.spacing(1.5),
    '& > ul': {
      paddingTop: ['0px', '!important'],
      paddingBottom: ['0px', '!important'],
    }
  },

  optionsIcon: {
    marginRight: '0px',
    minWidth: '40px',
  },
  itemIcon: {
    marginRight: '0px',
    minWidth: '40px',
  },

  menuItem: {
    paddingLeft: theme.spacing(0.4), 
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(0.2),
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
    cursor: 'pointer',
    color: theme.palette.grey[600],
  },
  
  activeMenuItem: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    backgroundColor: ['#fff', '!important'],
  },

  activeColor: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  itemText: {
    marginLeft: theme.spacing(1),
  },
}))

const Tree = ({
  section,
  ...props
}) => {
  const classes = useStyles()
  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)

  // folder pages means we treat folders as routes
  // if this is false, then clicking
  // on a folder just toggles it
  // if this is true - clicking on the folder itself
  // will open the folder route
  const folderPages = settings.folderPages === 'yes'

  const {
    onToggleFolder,
    tree,
    list,
  } = useSectionTree({
    section,
  })

  return (
    <div
      className={ classes.root }
    >
      <div className={ classes.content }>
        <List
          className={ classes.list }
        >
          {
            list.map((item, i) => {
              return (
                <TreeItem
                  key={ i }
                  item={ item }
                  folderPages={ folderPages }
                  onToggleFolder={ onToggleFolder }
                />
              )
            })
          }
        </List> 
      </div>
    </div>
  )
}

export default Tree