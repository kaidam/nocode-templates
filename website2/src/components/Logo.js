import React, { lazy } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@nocode-toolkit/frontend/components/widgets/Link'
import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'

import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'
import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'

const SettingsEditor = lazy(() => import(/* webpackChunkName: "ui" */ './SettingsEditor'))

const useStyles = makeStyles(theme => {  
  return {
    link: {
      color: theme.palette.primary.contrastText,
      textDecoration: ['none', '!important'],
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoText: {
      paddingLeft: '4px',
      color: theme.palette.primary.main,
      whiteSpace: 'nowrap',
    },
    logoImage: {
      height: `${theme.layout.topbarHeight-40}px`,
      marginRight: theme.spacing(2),
    },
    editButton: {
      marginRight: theme.spacing(2),
    },
    logoEditButton: {
      marginLeft: theme.spacing(2),
    },
  }
})

const Logo = ({
  
}) => {
  const classes = useStyles()
  const settings = useSelector(settingsSelectors.settings)

  return (
    <Link
      path="/"
      className={ classes.link }
    >
      <div className={ classes.container }>
        <Suspense
          Component={ SettingsEditor }
        />
        {
          settings.logo && settings.logo.url && (
            <img className={ classes.logoImage } src={ settings.logo.url } />
          )
        }
        {
          settings.title && (
            <Typography
              variant="h5"
              className={ classes.logoText }
            >
              { settings.title }
            </Typography>
          )
        }
      </div>
    </Link>
  )
}

export default Logo