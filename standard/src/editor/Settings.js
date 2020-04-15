import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import icons from '@nocode-works/template/icons'
import eventUtils from '@nocode-works/template/utils/events'

import Actions from '@nocode-works/template/utils/actions'
import settingsActions from '@nocode-works/template/store/modules/settings'

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
        eventUtils.cancelEvent(e)
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