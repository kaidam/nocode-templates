import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-works/template/components/widgets/MenuButton'

import icons from '@nocode-works/template/icons'
import withItemEditor from '../hooks/withItemEditor'

const EditIcon = icons.edit

const ItemEditor = ({
  node,
  buttonClassname,
  onClick,
}) => {

  const {
    getEditorItems,
  } = withItemEditor({
    node,
  })

  const getButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        className={ buttonClassname }
        onClick={ onClick }
      >
        <EditIcon
          fontSize="inherit"
          className="navbar-ui-icon"
        />
      </IconButton>
    )
  }, [
    buttonClassname,
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