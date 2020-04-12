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
    borderRadius: '24px',
    padding: theme.spacing(0.75),
    backgroundColor: theme.palette.grey[200],
  },
  iconSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcons: {
    justifyContent: 'flex-start',
  },
  rightIcons: {
    justifyContent: 'flex-end',
  },
  iconContainer: {
    marginLeft: theme.spacing(0.25),
    marginRight: theme.spacing(0.25),
    padding: theme.spacing(0.2),
    borderRadius: '16px',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: '0.85em',
  },
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
            className={ classes.icon }
          />
        </IconButton>
      </Tooltip> 
    )
  }, [])

  const rootClassname = classnames(classes.root, className)

  return (
    <div className={ rootClassname }>
      <div className={ classnames(classes.iconSection, classes.leftIcons) }>
        <div className={ classes.iconContainer }>
          <Tooltip title="Settings" placement="top">
            <IconButton
              size="small"
              onClick={ onOpenSettings }
            >
              <SettingsIcon
                fontSize="inherit"
                color="primary"
                className={ classes.icon }
              />
            </IconButton>
          </Tooltip>
        </div>
        {
          driveUtils.isFolder(node) && (
            <div className={ classes.iconContainer }>
              <Tooltip title="Edit" placement="top">
                <IconButton
                  size="small"
                  onClick={ onEditItem }
                >
                  <EditIcon
                    fontSize="inherit"
                    color="primary"
                    className={ classes.icon }
                  />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
        <div className={ classes.iconContainer }>
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
                    className={ classes.icon }
                  />
                ) : (
                  <EditIcon
                    fontSize="inherit"
                    color="primary"
                    className={ classes.icon }
                  />
                )
              }
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={ classnames(classes.iconSection, classes.rightIcons) }>
        <div className={ classes.iconContainer }>
          <MenuButton
            noHeader
            getButton={ getAddButton }
            getItems={ getAddItems }
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentEditor