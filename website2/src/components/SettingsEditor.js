import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import icons from '@nocode-toolkit/frontend/icons'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import settingsActions from '@nocode-toolkit/frontend/store/modules/settings'

const EditIcon = icons.edit

const SettingsEditor = ({
  classNames = {},
}) => {

  const actions = Actions(useDispatch(), {
    onOpenSettings: settingsActions.openDialog,
  })

  const iconClassname = classnames("navbar-ui-icon", classNames.icon)

  return (
    <IconButton
      size="small"
      className={ classNames.button }
      onClick={ (e) => {
        e.preventDefault()
        e.stopPropagation()
        actions.onOpenSettings() 
      }}
    >
      <EditIcon
        fontSize="inherit"
        className={ iconClassname }
      />
    </IconButton>
  )
}

export default SettingsEditor