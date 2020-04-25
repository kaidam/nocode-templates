import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Suspense from '@nocode-works/template/components/system/Suspense'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'

const EditableSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/settings/EditableSettings'))

const getValue = (settings = {}) => {
  if(!settings.copyright_message) return null
  return settings.copyright_message.replace(/\&year;?/, () => new Date().getFullYear())
}

const useStyles = makeStyles(theme => {  
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    copyrightText: {
      marginLeft: theme.spacing(2),
      color: theme.palette.primary.contrastText,
    },
    editButton: {
      //marginRight: theme.spacing(2),
    },
    editIcon: {
      color: theme.palette.primary.contrastText,
    }
  }
})

const Copyright = ({
  
}) => {
  const classes = useStyles()
  const settings = useSelector(settingsSelectors.settings)
  const showUI = useSelector(systemSelectors.showUI)
  //const value = getValue(settings)
  const value = "© 2020 My Copyright Message"
  
  const content = (
    <div className={ classes.container }>
      <Typography
        variant="body1"
        className={ classes.copyrightText }
      >
        { value }
      </Typography>
    </div>
  )

  return showUI ? (
    <Suspense>
      <EditableSettings
        title="Edit Copyright"
        form="copyright"
      >
        { content }
      </EditableSettings>
    </Suspense>
  ) : content
}

export default Copyright