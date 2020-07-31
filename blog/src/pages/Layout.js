import React, { lazy, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import SnackBar from '@nocode-works/template/components/system/Snackbar'
import AppLayout from '@nocode-works/template/components/system/Layout'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import routerSelectors from '@nocode-works/template/store/selectors/router'

import NavBar from '@nocode-works/template/components/navbar/Section'

import Suspense from '@nocode-works/template/components/system/Suspense'

import Logo from '@nocode-works/template/components/editable/Logo'

import useStyles from '../styles/layout'

const GlobalSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/system/GlobalSettings'))
const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const Layout = ({
  children,
}) => {
  const showUI = useSelector(systemSelectors.showUI)

  const contentRef = useRef(null)
  
  const settings = useSelector(settingsSelectors.settings)
  const route = useSelector(routerSelectors.route)
  
  const classes = useStyles({
    showUI,
  })

  const navbarClassname = classnames({
    [classes.drawer]: true,
    [classes.largeScreen]: true,
    [classes.smallDrawer]: true,
  })

  useEffect(() => {
    if(!contentRef.current) return
    contentRef.current.scrollTop = 0
  }, [route])

  const hiddenMode = "css"

  let {
    logo,
    favicon,
  } = settings

  let useFavicon = ''

  if(favicon && favicon.url) {
    useFavicon = favicon.url
  }
  else if(logo && logo.url) {
    useFavicon = logo.url
  }

  return (
    <div className={ classes.root }>
      <AppLayout
        material
        favicon={ useFavicon }
        head={(
          <link rel="stylesheet" href="./css/index.css" />
        )}
      >
        <AppBar 
          position="static" 
          className={ classes.appbar }
        >
          <Toolbar classes={{
            root: classes.headerToolbar,
          }}>
            <div className={ classes.appBarTitle }>
              <Logo />
            </div>
            <Hidden smDown implementation={ hiddenMode }>
              <NavBar
                section="topbar"
                withHome
              />
            </Hidden>
            <Hidden mdUp implementation={ hiddenMode }>
              <NavBar
                small
                section="topbar"
                withHome
              />
            </Hidden>
            <Suspense
              coreEnabled
              Component={ GlobalSettings }
              props={{
                className: classes.globalSettings,
              }}
            />
          </Toolbar>
        </AppBar>
        <div className={ classes.main }>
          <div className={ classes.contentContainer }>
            <Hidden smDown implementation={ hiddenMode }>
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.contentToolbar,
                }}
              />
            </Hidden>
            <Hidden mdUp implementation={ hiddenMode }>
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.smallContentToolbar,
                  small: true,
                }}
              />
            </Hidden>
            <main className={ classes.content } ref={ contentRef }>
              <div className={ classes.contentChildren }>
                { children }
              </div>
            </main>
          </div>
        </div>
        <SnackBar />
      </AppLayout>
    </div>
  )
}

export default Layout