import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import useSection from '@nocode-toolkit/frontend/components/hooks/useSection'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'
import icons from '@nocode-toolkit/frontend/icons'

const MoreVertIcon = icons.moreVert
const AddIcon = icons.add

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid #e5e5e5',
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
  },
  itemText: {
    marginLeft: theme.spacing(1),
  },
}))

const SectionEditor = ({
  section,
  onClick,
}) => {
  const classes = useStyles()
  const {
    node,
    annotation,
    ghostFolder,
  } = useSection({
    section,
  })

  const actions = Actions(useDispatch(), {
    onCreateRemoteContent: contentActions.createRemoteContent,
    onEditRemoteContent: contentActions.editRemoteContent,
  })

  const getSettingsButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
    )
  }, [])

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

  const getAddItems = useCallback(() => {
    return ghostFolder ? [{
      title: 'Folder',
      icon: icons.folder,
      secondaryIcon: icons.drive,
      handler: () => actions.onCreateRemoteContent({
        title: 'Create Folder',
        driver: 'drive',
        form: 'drive.folder',
        parentId: ghostFolder.id,
      })
    },{
      title: 'Document',
      icon: icons.docs,
      secondaryIcon: icons.drive,
      handler: () => actions.onCreateRemoteContent({
        title: 'Create Document',
        driver: 'drive',
        form: 'drive.document',
        parentId: ghostFolder.id,
      })
    }] : []
  }, [
    ghostFolder,
  ])
  
  const getSettingsItems = useCallback(() => {
    return [
      {
        title: 'Add',
        icon: icons.add,
        items: getAddItems(),
      }
    ]
  }, [
    ghostFolder,
    getAddItems,
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
            primary={ ghostFolder ? ghostFolder.name : '' }
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

export default SectionEditor