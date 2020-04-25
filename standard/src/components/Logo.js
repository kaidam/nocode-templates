import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@nocode-works/template/components/widgets/Link'
import Suspense from '@nocode-works/template/components/system/Suspense'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'

const EditableSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/settings/EditableSettings'))

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
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
      whiteSpace: 'nowrap',
    },
    logoImage: {
      height: `${theme.layout.topbarHeight * 0.5}px`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    editButton: {
      
    },
    editIcon: {
      //color: theme.palette.primary.main,
    }
  }
})

const Logo = ({
  
}) => {
  const classes = useStyles()
  const settings = useSelector(settingsSelectors.settings)
  const showUI = useSelector(systemSelectors.showUI)

  const {
    company_name,
    logo,
  } = settings

  let title = company_name

  if(!title && showUI) title = 'Nocode Website'
  
  const content = (
    <div className={ classes.container }>
      {
        logo && logo.url && (
          <img className={ classes.logoImage } src={ logo.url } />
        )
      }
      {
        title && (
          <Typography
            variant="h5"
            className={ classes.logoText }
          >
            { title }
          </Typography>
        )
      }
    </div>
  )

  return showUI ? (
    <Suspense>
      <EditableSettings
        title="Edit Logo"
        form="logo"
      >
        { content }
      </EditableSettings>
    </Suspense>
  ) : (
    <Link
      path="/"
      className={ classes.link }
    >
      { content }
    </Link>
  )
}

export default Logo