import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import withSectionEditor from '../hooks/withSectionEditor'

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid #cccccc',
    paddingLeft: theme.spacing(1), 
    paddingRight: theme.spacing(1),
  },
  menuItem: {
    paddingLeft: theme.spacing(0), 
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
    cursor: 'pointer',
    color: theme.palette.grey[600],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  itemTextTypography: {
    fontWeight: 'bold',
  }
}))

const TreeSectionEditor = ({
  section,
}) => {
  const classes = useStyles()

  const {
    ghostFolder,
    getAddButton,
    getSettingsButton,
    getAddItems,
    getSettingsItems,
  } = withSectionEditor({
    section,
  })

  const getTitleSettingsButton = useCallback((onClick) => {
    return (
      <ListItemText
        classes={{
          primary: classes.itemTextTypography,
        }}
        primary={ ghostFolder ? ghostFolder.name : '' }
        onClick={ onClick }
      />
    )
  }, [
    classes,
    ghostFolder,
  ])

  return (
    <div className={ classes.root }>
      <List>
        <ListItem
          dense
          className={ classes.menuItem }
        >
          <MenuButton
            header={ ghostFolder ? ghostFolder.name : '' }
            getButton={ getSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            className={ classes.itemText }
            header={ ghostFolder ? ghostFolder.name : '' }
            getButton={ getTitleSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            header={ ghostFolder ? `${ghostFolder.name} : Add` : '' }
            getButton={ getAddButton }
            getItems={ getAddItems }
          />
        </ListItem>
      </List>
    </div>
  )
}

export default TreeSectionEditor