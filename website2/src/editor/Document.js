import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'
import icons from '@nocode-toolkit/frontend/icons'

import withDocumentEditor from '../hooks/withDocumentEditor'

const SettingsIcon = icons.settings
const AddIcon = icons.add

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid #cccccc',
    backgroundColor: theme.palette.grey[100],
  },
  list: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  menuItem: {
    paddingLeft: theme.spacing(0.2), 
    paddingRight: theme.spacing(0.2),
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

const DocumentEditor = ({
  node,
}) => {
  const classes = useStyles()

  const {
    getSettingsItems,
  } = withDocumentEditor({
    node,
  })

  const documentTitle = node.name
    .replace(/^(\w)/, (st) => st.toUpperCase())

  const getTitleSettingsButton = useCallback((onClick) => {
    return (
      <ListItemText
        classes={{
          primary: classes.itemTextTypography,
        }}
        primary={ documentTitle }
        onClick={ onClick }
      />
    )
  }, [
    classes,
    documentTitle,
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
      <List className={ classes.list }>
        <ListItem
          dense
          className={ classes.menuItem }
        >
          <MenuButton
            header={ documentTitle }
            getButton={ getSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            className={ classes.itemText }
            header={ documentTitle }
            getButton={ getTitleSettingsButton }
            getItems={ getSettingsItems }
          />
          <MenuButton
            header={ `${documentTitle} : Add` }
            getButton={ getAddButton }
            getItems={ () => [] }
          />
        </ListItem>
      </List>
    </div>
  )
}

export default DocumentEditor