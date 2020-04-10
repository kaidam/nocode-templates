import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import MenuButton from '@nocode-works/template/components/widgets/MenuButton'
import icons from '@nocode-works/template/icons'
import driveUtils from '@nocode-works/template/utils/drive'

import withDocumentEditor from '../hooks/withDocumentEditor'

const SettingsIcon = icons.settings
const AddIcon = icons.add
const EditIcon = icons.edit
const OpenIcon = icons.open

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[200],
  },
  icon: {
    paddingRight: theme.spacing(1),
  }
}))

const DocumentEditor = ({
  node,
  annotation,
  layout_id,
  className,
}) => {
  const classes = useStyles()

  const {
    getAddItems,
    onOpenSettings,
    onOpenItem,
    onEditItem,
  } = withDocumentEditor({
    node,
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

  const rootClassname = classnames(classes.root, className)

  return (
    <div className={ rootClassname }>
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
      {
        driveUtils.isFolder(node) && (
          <div className={ classes.icon }>
            <Tooltip title="Edit" placement="top">
              <IconButton
                size="small"
                onClick={ onEditItem }
              >
                <EditIcon
                  fontSize="inherit"
                  color="primary"
                />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
      <div className={ classes.icon }>
        <Tooltip
          title={
            driveUtils.isFolder(node) ?
              "Open Google Folder" :
              "Edit Google Document"
          }
          placement="top">
          <IconButton
            size="small"
            onClick={ onOpenItem }
          >
            {
              driveUtils.isFolder(node) ? (
                <OpenIcon
                  fontSize="inherit"
                  color="primary"
                />
              ) : (
                <EditIcon
                  fontSize="inherit"
                  color="primary"
                />
              )
            }
          </IconButton>
        </Tooltip>
      </div>
      <div className={ classes.icon }>
        <MenuButton
          noHeader
          getButton={ getAddButton }
          getItems={ getAddItems }
        />
      </div>
    </div>
  )
}

export default DocumentEditor