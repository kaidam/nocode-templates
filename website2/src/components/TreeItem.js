import React, { useCallback } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Link from '@nocode-toolkit/frontend/components/widgets/Link'

import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'
import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'
import useSectionTree from '@nocode-toolkit/frontend/components/hooks/useSectionTree'

import icons from '@nocode-toolkit/frontend/icons'

const ExpandMoreIcon = icons.expandMore
const ExpandLessIcon = icons.expandLess

const useStyles = makeStyles(theme => ({
  menuItem: {
    paddingLeft: theme.spacing(0.4), 
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(0.2),
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
    cursor: 'pointer',
    color: theme.palette.grey[600],
  },
  itemText: ({depth}) => ({
    marginLeft: theme.spacing(depth * 2),
  }),
  active: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))

const TreeItem = ({
  item,
  folderPages,
  onToggleFolder,
}) => {

  const {
    depth,
    open,
    currentPage,
    node,
  } = item

  const classes = useStyles({
    depth,
  })

  const listItemClassname = classnames({
    [classes.active]: currentPage,
  }, classes.menuItem)

  const colorClassname = classnames({
    [classes.active]: currentPage,
  })

  const onClickItem = useCallback(() => {
    // if we do not have folder pages - we toggle the
    // folder to show the contents
    if(node.type == 'folder' && !folderPages) {
      onToggleFolder(node.id)  
    }
  }, [
    node,
    folderPages,
    onToggleFolder,
  ])

  const renderedItem = (
    <ListItem
      dense
      className={ listItemClassname }
      selected={ item.currentPage }
      onClick={ onClickItem }
    >
      <ListItemText
        className={ classes.itemText }
        classes={{
          primary: colorClassname
        }}
        primary={ item.node.name }
      />
      {
        node.type == 'folder' ?
          open ? 
            <ExpandLessIcon className={ colorClassname } /> : 
            <ExpandMoreIcon className={ colorClassname } />
        : null
      }
    </ListItem>
  )

  let linkType = ''
  if(item.node.type == 'externalLink') linkType = 'external'
  else if(item.node.type == 'folder') linkType = folderPages ? 'internal' : ''
  else linkType = 'internal'

  if(linkType == 'external') {
    return (
      <Link
        url={ item.node.url }
      >
        { renderedItem }
      </Link>
    )
  }
  else if(linkType == 'internal' && item.route) {
    return (
      <Link
        path={ item.route.path }
        name={ item.route.name }
      >
        { renderedItem }
      </Link>
    )
  }
  else {
    return renderedItem
  }
}

export default TreeItem