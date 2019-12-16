import React, { lazy, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'

import UILoader from '@nocode-toolkit/ui/components/system/UILoader'
import Header from '@nocode-toolkit/ui/components/system/Header'
import styles from '@nocode-toolkit/website-material-ui/styles/layout'

import Tree from '@nocode-toolkit/website-material-ui/components/content/Tree'
import NavBar from '@nocode-toolkit/website-material-ui/components/content/NavBar'
import Copyright from '@nocode-toolkit/website-material-ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/website-material-ui/components/widgets/Logo'

import selectors from '@nocode-toolkit/ui/store/selectors'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const useStyles = makeStyles(styles)

const Layout = ({
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  const showUI = useSelector(selectors.ui.showUI)
  const settingsItem = useSelector(selectors.ui.settings)

  const settings = settingsItem && settingsItem.data ?
    settingsItem.data :
    {}

  const navigationSettings = settings.navigation || {}

  const navbarClassname = showUI ?
    classes.largeDrawer :
    classes.smallDrawer

  return (
    <div className={ classes.root }>
      <Header />
      <UILoader
        Component={ NocodeTopbar }
      />
      <AppBar 
        position="static" 
        className={ classes.appBar }
      >
        <Toolbar classes={{
          root: classes.headerToolbar,
        }}>
          <IconButton 
            className={ classes.smallNav }
            aria-label="Menu"
            onClick={ openDrawer }
          >
            <MenuIcon className={ classes.smallNavButton } />
          </IconButton>
          <Drawer 
            open={ drawerOpen }
            onClose={ closeDrawer }
            className={ classes.smallNav }
          >
            <div className={ [classes.drawer, classes.smallNav].join(' ') }>
              <Tree
                section="sidebar"
                onClick={ closeDrawer }
              />
            </div>
          </Drawer>
          <div className={ classes.appBarTitle }>
            <Logo />
          </div>
          <NavBar
            section="topbar"
            withHome
          />
        </Toolbar>
      </AppBar>
      <div className={ classes.main }>
        {
          navigationSettings.left && (
            <div className={ [classes.drawer, navbarClassname, classes.largeNav].join(' ') }>
              <Tree
                section="sidebar"
                onClick={ closeDrawer }
              />
            </div>
          )
        }
        <main className={ classes.content }>
          <div className={ classes.contentChildren }>
            { children }
          </div>
          <Divider />
          <div className={ classes.footer }>
            <Toolbar classes={{
              root: classes.footerToolbar,
            }}>
              <div className={ classes.footerContainer }>
                <div className={ classes.footerCopyright }>
                  <Copyright />
                </div>
                <div className={ classes.footerNavBar }>
                  <NavBar
                    section="footer"
                  />
                </div>
              </div>
            </Toolbar>
          </div>
        </main>
        {
          navigationSettings.right && (
            <div className={ [classes.drawer, navbarClassname, classes.largeNav].join(' ') }>
              <Tree
                section="rightbar"
                onClick={ closeDrawer }
              />
            </div>
          )
        }
      </div>
      <UILoader
        Component={ UIElements }
      />
    </div>
  )
}

export default Layout
