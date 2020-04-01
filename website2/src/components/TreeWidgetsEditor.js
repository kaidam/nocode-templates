import React from 'react'
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
  },
  list: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  menuItem: {
    paddingLeft: theme.spacing(4), 
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
    
  }
}))

const TreeWidgetsEditor = ({
  section,
}) => {
  const classes = useStyles()

  const {
    getAddButton,
    getAddWidgets,
  } = withSectionEditor({
    section,
  })

  return (
    <div className={ classes.root }>
      <List
        className={ classes.list }
      >
        <ListItem
          dense
          className={ classes.menuItem }
        >
          <ListItemText
            classes={{
              primary: classes.itemTextTypography,
            }}
            primary={ 'widgets' }
          />
          <MenuButton
            header="widgets : Add"
            getButton={ getAddButton }
            getItems={ getAddWidgets }
          />
        </ListItem>
      </List>
    </div>
  )
}

export default TreeWidgetsEditor