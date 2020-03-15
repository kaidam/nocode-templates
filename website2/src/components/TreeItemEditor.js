import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import Actions from '@nocode-toolkit/frontend/utils/actions'

import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import icons from '@nocode-toolkit/frontend/icons'

const MoreVertIcon = icons.moreVert

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const TreeItemEditor = ({
  item,
}) => {
  const classes = useStyles()

  const actions = Actions(useDispatch(), {
    onAddNode: contentActions.addNode,
  })

  const getButton = useCallback((onClick) => {
    return (
      <IconButton
        className={classes.margin}
        size="small"
        onClick={ onClick }
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
    )
  }, [
    classes,
  ])

  const getEditorItems = useCallback(() => {
    return [{
      title: 'Add',
      icon: icons.add,
      items: [{
        title: 'Folder',
        icon: icons.folder,
        secondaryIcon: icons.drive,
        handler: () => actions.onAddNode({
          location: `item:${item.id}`,
          driver: 'drive',
          form: 'drive.folder',
        })
      },{
        title: 'Document',
        icon: icons.docs,
        secondaryIcon: icons.drive,
        handler: () => actions.onAddNode({
          location: `item:${item.id}`,
          driver: 'drive',
          form: 'drive.document',
        })
      }],
    }]
  }, [
    item,
  ])

  return (
    <div className={ classes.root }>
      <MenuButton
        header={ item.node.name }
        getButton={ getButton }
        getItems={ getEditorItems }
      />
    </div>
  )
}

export default TreeItemEditor