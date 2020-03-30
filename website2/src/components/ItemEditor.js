import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import icons from '@nocode-toolkit/frontend/icons'
import withItemEditor from '../hooks/withItemEditor'

const MoreVertIcon = icons.moreVert

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
        <MoreVertIcon
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