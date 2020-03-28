import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

import withSectionEditor from '../hooks/withSectionEditor'

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid #cccccc',
  },
  menuItem: {
    paddingLeft: theme.spacing(0), 
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(0.2),
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
    cursor: 'pointer',
    color: theme.palette.grey[600],
  },
  itemText: {
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

  const clickFolderName = useCallback(() => {
    if(!ghostFolder) return
    window.open(driveUtils.getItemUrl(ghostFolder))
  }, [
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
          <ListItemText
            className={ classes.itemText }
            classes={{
              primary: classes.itemTextTypography,
            }}
            primary={ ghostFolder ? ghostFolder.name : '' }
            onClick={ clickFolderName }
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