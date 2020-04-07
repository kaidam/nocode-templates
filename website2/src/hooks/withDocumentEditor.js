import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const withDocumentEditor = ({
  node,
}) => {

  const actions = Actions(useDispatch(), {
    onEditNode: contentActions.editNode,
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

  const onEditDocument = useCallback(() => driveUtils.openItem(node), [
    node,
  ])

  return {
    node,
    onOpenSettings,
    onEditDocument,
  }
}

export default withDocumentEditor