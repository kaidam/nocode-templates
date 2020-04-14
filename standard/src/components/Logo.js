import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@nocode-works/template/components/widgets/Link'
import Suspense from '@nocode-works/template/components/system/Suspense'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'

const SettingsEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Settings'))

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
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.main,
      whiteSpace: 'nowrap',
    },
    logoImage: {
      height: `${theme.layout.topbarHeight * 0.7}px`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    editButton: {
      
    },
    editIcon: {
      color: theme.palette.primary.main,
    }
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
          props={{
            classNames: {
              button: classes.editButton,
              icon: classes.editIcon,
            }
          }}
        />
        {
          settings.logo && settings.logo.url && (
            <img className={ classes.logoImage } src={ settings.logo.url } />
          )
        }
        {
          settings.logo_title && (
            <Typography
              variant="h5"
              className={ classes.logoText }
            >
              { settings.logo_title }
            </Typography>
          )
        }
      </div>
    </Link>
  )
}

export default Logo