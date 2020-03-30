import React from 'react'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import icons from '@nocode-toolkit/frontend/icons'

import Actions from '@nocode-toolkit/frontend/utils/actions'
import settingsActions from '@nocode-toolkit/frontend/store/modules/settings'

const EditIcon = icons.edit

const SettingsEditor = ({
  
}) => {

  const actions = Actions(useDispatch(), {
    onOpenSettings: settingsActions.openDialog,
  })

  return (
    <IconButton
      size="small"
      onClick={ () => actions.onOpenSettings() }
    >
      <EditIcon
        fontSize="inherit"
        className="navbar-ui-icon"
      />
    </IconButton>
  )
}

export default SettingsEditor