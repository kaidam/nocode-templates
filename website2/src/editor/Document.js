import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'
import icons from '@nocode-toolkit/frontend/icons'

import withDocumentEditor from '../hooks/withDocumentEditor'
import withLayoutEditor from '../hooks/withLayoutEditor'

const SettingsIcon = icons.settings
const AddIcon = icons.add
const EditIcon = icons.edit

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5),
  },
  icon: {
    paddingRight: theme.spacing(1),
  }
}))

const DocumentEditor = ({
  node,
  annotation,
  layout_id,
}) => {
  const classes = useStyles()

  const {
    onOpenSettings,
    onEditDocument,
  } = withDocumentEditor({
    node,
  })

  const {
    getAddMenu,
  } = withLayoutEditor({
    content_id: node.id,
    layout_id,
  })

  const getAddButton = useCallback((onClick) => {
    return (
      <Tooltip title="Add" placement="top">
        <IconButton
          size="small"
          onClick={ onClick }
        >
          <AddIcon
            fontSize="inherit"
            color="secondary"
          />
        </IconButton>
      </Tooltip> 
    )
  }, [])

  return (
    <div className={ classes.root }>
      <div className={ classes.icon }>
        <Tooltip title="Settings" placement="top">
          <IconButton
            size="small"
            onClick={ onOpenSettings }
          >
            <SettingsIcon
              fontSize="inherit"
              color="primary"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={ classes.icon }>
        <Tooltip title="Edit Google Document" placement="top">
          <IconButton
            size="small"
            onClick={ onEditDocument }
          >
            <EditIcon
              fontSize="inherit"
              color="primary"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={ classes.icon }>
        <MenuButton
          noHeader
          getButton={ getAddButton }
          getItems={ getAddMenu }
        />
      </div>
    </div>
  )
}

export default DocumentEditor