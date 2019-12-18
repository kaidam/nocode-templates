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

import Tree from '@nocode-toolkit/website-material-ui/components/content/Tree/Tree'
import NavBar from '@nocode-toolkit/website-material-ui/components/content/NavBar/NavBar'
import Copyright from '@nocode-toolkit/website-material-ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/website-material-ui/components/widgets/Logo'
import NavDrawer from '@nocode-toolkit/website-material-ui/components/widgets/NavDrawer'

import selectors from '@nocode-toolkit/ui/store/selectors'

import styles from '../styles/layout'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const useStyles = makeStyles(styles)

const Layout = ({
  children,
}) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const classes = useStyles()

  const openLeftDrawer = () => setLeftDrawerOpen(true)
  const closeLeftDrawer = () => setLeftDrawerOpen(false)
  const openRightDrawer = () => setRightDrawerOpen(true)
  const closeRightDrawer = () => setRightDrawerOpen(false)

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
          {
            navigationSettings.left && (
              <NavDrawer
                Component={ Tree }
                section="sidebar"
                uppercase
              />
            )
          }
          <div className={ classes.appBarTitle }>
            <Logo 
              classes={{
                title: classes.logoTitle,
              }}
            />
          </div>
          <NavBar
            section="topbar"
            withHome
          />
          {
            navigationSettings.right && (
              <NavDrawer
                Component={ Tree }
                section="rightbar"
                anchor="right"
                uppercase
              />
            )
          }
        </Toolbar>
      </AppBar>
      <div className={ classes.main }>
        {
          navigationSettings.left && (
            <div className={ [classes.drawer, navbarClassname, classes.largeNav].join(' ') }>
              <Tree
                section="sidebar"
                uppercase
                onClick={ closeLeftDrawer }
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
                    contrast
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
                uppercase
                onClick={ closeLeftDrawer }
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
