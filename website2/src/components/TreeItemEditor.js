import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import icons from '@nocode-toolkit/frontend/icons'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const MoreVertIcon = icons.moreVert

const TreeItemEditor = ({
  item,
}) => {

  const actions = Actions(useDispatch(), {
    onCreateRemoteContent: contentActions.createRemoteContent,
    onEditRemoteContent: contentActions.editRemoteContent,
  })

  const getButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
    )
  }, [])

  const getEditorItems = useCallback(() => {
    const node = item.node

    const removeItem = {
      title: 'Remove',
      icon: icons.clear,
      items: [{
        title: 'Delete',
        icon: icons.delete,
        help: 'Delete this item from Google drive',
        handler: () => {},
      }, {
        title: 'Hide',
        icon: icons.hide,
        help: 'Hide this item but don\'t delete it from Google drive',
        handler: () => {},
      }]
    }
    
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
        }, 
        removeItem,
        {
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
        }, removeItem]
      }
    }
    else {
      return []
    }
  }, [
    item,
  ])

  return (
    <MenuButton
      header={ item.node.name }
      getButton={ getButton }
      getItems={ getEditorItems }
    />
  )
}

export default TreeItemEditor