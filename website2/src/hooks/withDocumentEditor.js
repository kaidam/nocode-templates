import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import useSection from '@nocode-toolkit/frontend/components/hooks/useSection'

import icons from '@nocode-toolkit/frontend/icons'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const withDocumentEditor = ({
  node,
  annotation,
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

  return {
    node,
    onOpenSettings,
  }
}

export default withDocumentEditor