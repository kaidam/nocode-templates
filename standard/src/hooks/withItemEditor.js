import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Actions from '@nocode-works/template/utils/actions'
import contentActions from '@nocode-works/template/store/modules/content'
import icons from '@nocode-works/template/icons'
import driveUtils from '@nocode-works/template/utils/drive'

const withItemEditor = ({
  node,
}) => {
  const actions = Actions(useDispatch(), {
    onCreateRemoteContent: contentActions.createRemoteContent,
    onEditRemoteContent: contentActions.editRemoteContent,
    onEditLocalContent: contentActions.editLocalContent,
    onDeleteRemoteContent: contentActions.deleteRemoteContent,
    onDeleteLocalContent: contentActions.deleteLocalContent,
    onHideContent: contentActions.hideContent,
    onChangeHomepage: contentActions.changeHomepage,
    onResetHomepage: contentActions.resetHomepage,
  })

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
            title: 'Google Folder',
            icon: icons.folder,
            secondaryIcon: icons.drive,
            handler: () => actions.onCreateRemoteContent({
              title: 'Create Folder',
              driver: 'drive',
              form: 'drive.folder',
              parentId: node.id,
            })
          },{
            title: 'Google Document',
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
        return [
          {
            title: 'Edit',
            icon: icons.edit,
            secondaryIcon: icons.drive,
            url: openUrl,
          }, 
          node.isHome ? 
            {
              title: 'Change Homepage',
              icon: icons.search,
              secondaryIcon: icons.drive,
              handler: actions.onChangeHomepage,
            } : removeItem,
          node.isHome && node.defaultDocumentId != node.id ? 
            {
              title: 'Reset Homepage',
              icon: icons.refresh,
              secondaryIcon: icons.drive,
              handler: actions.onResetHomepage,
            } : null
        ].filter(i => i)
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

  return {
    getEditorItems,
  }
}

export default withItemEditor