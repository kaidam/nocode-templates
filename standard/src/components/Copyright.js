import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Suspense from '@nocode-works/template/components/system/Suspense'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'

const SettingsEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Settings'))

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
  const value = getValue(settings)
  if(!value) return null
  return (
    <div className={ classes.container }>
      <Suspense
        Component={ SettingsEditor }
        props={{
          classNames: {
            button: classes.editButton,
            icon: classes.editIcon,
          }
        }}
      />
      <Typography
        variant="body1"
        className={ classes.copyrightText }
      >
        <span dangerouslySetInnerHTML={{__html: value}}>
        </span>
      </Typography>
    </div>
  )
}

export default Copyright