import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import icons from '@nocode-toolkit/frontend/icons'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const MoreVertIcon = icons.moreVert

const ItemEditor = ({
  node,
  buttonClassname,
  onClick,
}) => {

  const actions = Actions(useDispatch(), {
    onCreateRemoteContent: contentActions.createRemoteContent,
    onEditRemoteContent: contentActions.editRemoteContent,
    onEditLocalContent: contentActions.editLocalContent,
    onDeleteRemoteContent: contentActions.deleteRemoteContent,
    onDeleteLocalContent: contentActions.deleteLocalContent,
    onHideContent: contentActions.hideContent,
  })

  const getButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        className={ buttonClassname }
        onClick={ onClick }
      >
        <MoreVertIcon
          fontSize="inherit"
          className="navbar-ui-icon"
        />
      </IconButton>
    )
  }, [
    buttonClassname,
  ])

  const getEditorItems = useCallback(() => {
    if(node.driver == 'drive') {

      const removeItem = {
        title: 'Remove',
        icon: icons.clear,
        items: [{
          title: 'Hide',
          icon: icons.hide,
          help: 'Hide this item but don\'t delete it from Google drive',
          handler: () => actions.onHideContent({
            id: node.id,
            name: node.name,
          }),
        }, {
          title: 'Delete',
          icon: icons.delete,
          help: 'Delete this item from Google drive',
          handler: () => actions.onDeleteRemoteContent({
            id: node.id,
            driver: node.driver,
            name: node.name,
          }),
        }]
      }

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
              parentId: node.id,
            })
          },{
            title: 'Document',
            icon: icons.docs,
            secondaryIcon: icons.drive,
            handler: () => actions.onCreateRemoteContent({
              title: 'Create Document',
              driver: 'drive',
              form: 'drive.document',
              parentId: node.id,
            })
          }],
        }, {
          title: 'Edit',
          icon: icons.edit,
          handler: () => actions.onEditRemoteContent({
            title: `Edit ${node.type.replace(/^\w/, st => st.toUpperCase())}`,
            driver: 'drive',
            form: `drive.${node.type}`,
            id: node.id,
          })
        }, {
          title: 'Open in Drive',
          icon: icons.open,
          secondaryIcon: icons.drive,
          url: openUrl,
        }, 
        removeItem,
        ]
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
      return [{
        title: 'Edit',
        icon: icons.edit,
        handler: () => actions.onEditLocalContent({
          title: `Edit ${node.type.replace(/^\w/, st => st.toUpperCase())}`,
          driver: node.driver,
          form: node.type,
          id: node.id,
          location: node.location,
        })
      }, {
        title: 'Delete',
        icon: icons.delete,
        handler: () => actions.onDeleteLocalContent({
          id: node.id,
          name: node.name,
        }),
      }]
    }
  }, [
    node,
  ])

  return (
    <MenuButton
      header={ node.name }
      getButton={ getButton }
      getItems={ getEditorItems }
      onClick={ onClick }
    />
  )
}

export default ItemEditor