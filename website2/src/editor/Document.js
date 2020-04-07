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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5),
  },
  settingsIcon: {
    color: theme.palette.primary.main,
  },
}))

const DocumentEditor = ({
  node,
  annotation,
  layout_id,
}) => {
  const classes = useStyles()

  const {
    onOpenSettings,
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
      <Tooltip title="Settings" placement="top">
        <IconButton
          size="small"
          onClick={ onOpenSettings }
        >
          <SettingsIcon
            fontSize="inherit"
            className={ classes.settingsIcon }
          />
        </IconButton>
      </Tooltip>
      <MenuButton
        noHeader
        getButton={ getAddButton }
        getItems={ getAddMenu }
      />
    </div>
  )
}

export default DocumentEditor