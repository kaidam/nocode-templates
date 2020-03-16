import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import Actions from '@nocode-toolkit/frontend/utils/actions'

import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import icons from '@nocode-toolkit/frontend/icons'

import driveUtils from '@nocode-toolkit/frontend/utils/drive'

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
    onCreateRemoteContent: contentActions.createRemoteContent,
    onEditRemoteContent: contentActions.editRemoteContent,
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
    item,
  ])

  const getEditorItems = useCallback(() => {
    const node = item.node
    if(node.driver == 'drive') {
      const openUrl = driveUtils.getItemUrl(node)
      if(node.type == 'folder') {
        return [{
          title: 'Add',
          icon: icons.add,
          items: [{
            title: 'Folder',
            icon: icons.folder,
            secondaryIcon: icons.drive,
            handler: () => actions.onCreateRemoteContent({
              title: 'Create Folder',
              driver: 'drive',
              form: 'drive.folder',
              parentId: item.id,
            })
          },{
            title: 'Document',
            icon: icons.docs,
            secondaryIcon: icons.drive,
            handler: () => actions.onCreateRemoteContent({
              title: 'Create Document',
              driver: 'drive',
              form: 'drive.document',
              parentId: item.id,
            })
          }],
        }, {
          title: 'Edit',
          icon: icons.edit,
          handler: () => actions.onEditRemoteContent({
            title: `Edit ${node.type.replace(/^\w/, st => st.toUpperCase())}`,
            driver: 'drive',
            form: `drive.${node.type}`,
            id: item.id,
          })
        }, {
          title: 'Open in Drive',
          icon: icons.open,
          secondaryIcon: icons.drive,
          url: openUrl,
        }]
      }
      else {
        return [{
          title: 'Edit',
          icon: icons.edit,
          secondaryIcon: icons.drive,
          url: openUrl,
        }]
      }
    }
    else {
      return []
    }
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