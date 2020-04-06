import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'
import icons from '@nocode-toolkit/frontend/icons'

import withSectionEditor from '../hooks/withSectionEditor'

const SettingsIcon = icons.settings
const AddIcon = icons.add

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid #cccccc',
    borderBottom: '1px solid #cccccc',
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
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
  },
  settingsIcon: {
    color: theme.palette.primary.main,
  },
}))

const TreeSectionEditor = ({
  section,
}) => {
  const classes = useStyles()

  const {
    ghostFolder,
    getAddItems,
    getSettingsItems,
  } = withSectionEditor({
    section,
  })

  const ghostFolderTitle = (ghostFolder ? ghostFolder.name : '')
    .replace(/^(\w)/, (st) => st.toUpperCase())

  const getTitleSettingsButton = useCallback((onClick) => {
    return (
      <ListItemText
        classes={{
          primary: classes.itemTextTypography,
        }}
        primary={ ghostFolderTitle }
        onClick={ onClick }
      />
    )
  }, [
    classes,
    ghostFolderTitle,
  ])

  const getAddButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <AddIcon
          fontSize="inherit"
          color="secondary"
        />
      </IconButton>
    )
  }, [])


  const getSettingsButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <SettingsIcon
          fontSize="inherit"
          className={ classes.settingsIcon }
        />
      </IconButton>
    )
  }, [
    classes,
  ])

  return (
    <div className={ classes.root }>
      <List>
        <ListItem
          dense
          className={ classes.menuItem }
        >
          <MenuButton
            header={ ghostFolderTitle }
            getButton={ getSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            className={ classes.itemText }
            header={ ghostFolderTitle }
            getButton={ getTitleSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            header={ ghostFolder ? `${ghostFolderTitle} : Add` : '' }
            getButton={ getAddButton }
            getItems={ getAddItems }
          />
        </ListItem>
      </List>
    </div>
  )
}

export default TreeSectionEditor