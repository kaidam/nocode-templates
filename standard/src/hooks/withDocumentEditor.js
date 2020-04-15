import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Actions from '@nocode-works/template/utils/actions'
import contentActions from '@nocode-works/template/store/modules/content'
import driveUtils from '@nocode-works/template/utils/drive'
import icons from '@nocode-works/template/icons'

import withLayoutEditor from './withLayoutEditor'

const withDocumentEditor = ({
  node,
  layout_id = 'none',
}) => {

  const actions = Actions(useDispatch(), {
    onEditNode: contentActions.editNode,
    onEditRemoteContent: contentActions.editRemoteContent,
    onCreateRemoteContent: contentActions.createRemoteContent,
  })

  const {
    getAddMenu,
  } = withLayoutEditor({
    content_id: node.id,
    layout_id,
  })

  const onOpenSettings = useCallback(() => {
    actions.onEditNode({
      title: `Edit Item`,
      form: `documentSettings`,
      id: node.id,
    })
  }, [
    node,
  ])

  const onOpenItem = useCallback(() => driveUtils.openItem(node), [
    node,
  ])

  const onEditItem = useCallback(() => {
    actions.onEditRemoteContent({
      title: `Edit ${node.type.replace(/^\w/, st => st.toUpperCase())}`,
      driver: 'drive',
      form: `drive.${node.type}`,
      id: node.id,
    })
  }, [
    node,
  ])

  const getAddContentItems = useCallback(() => {
    return [{
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
    }]
  }, [
    node,
  ])

  const getAddItems = useCallback(() => {
    return driveUtils.isFolder(node) ?
      [{
        title: 'Content',
        icon: icons.drive,
        items: getAddContentItems(),
      }, {
        title: 'Widgets',
        icon: icons.widget,
        items: getAddMenu(),
      }] :
      getAddMenu()
  }, [
    getAddMenu,
    getAddContentItems,
    node,
  ])

  return {
    node,
    getAddItems,
    getAddContentItems,
    onOpenSettings,
    onOpenItem,
    onEditItem,
  }
}

export default withDocumentEditor