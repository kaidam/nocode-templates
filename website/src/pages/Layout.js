import React, { lazy } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

import UILoader from '@nocode-toolkit/ui/components/system/UILoader'
import Header from '@nocode-toolkit/ui/components/system/Header'

import Tree from '@nocode-toolkit/website-material-ui/components/content/Tree/Tree'
import NavBar from '@nocode-toolkit/website-material-ui/components/content/NavBar/NavBar'
import Copyright from '@nocode-toolkit/website-material-ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/website-material-ui/components/widgets/Logo'
import NavDrawer from '@nocode-toolkit/website-material-ui/components/widgets/NavDrawer'

import selectors from '@nocode-toolkit/ui/store/selectors'

import useStyles from '../styles/layout'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const Layout = ({
  children,
}) => {
  const classes = useStyles()

  const showUI = useSelector(selectors.ui.showUI)
  const settingsItem = useSelector(selectors.ui.settings)

  const settings = settingsItem && settingsItem.data ?
    settingsItem.data :
    {}

  const navigationSettings = settings.navigation || {}
  const hasLeftNavigation = typeof(navigationSettings.left) == 'boolean' ?
    navigationSettings.left :
    true
  const hasRightNavigation = navigationSettings.right

  const navbarClassname = classNames({
    [classes.drawer]: true,
    [classes.largeScreen]: true,
    [classes.largeDrawer]: showUI,
    [classes.smallDrawer]: !showUI,
  })

  return (
    <div className={ classes.root }>
      <Header />
      <UILoader
        Component={ NocodeTopbar }
      />
      <AppBar 
        position="static" 
        className={ classes.appbar }
      >
        <Toolbar classes={{
          root: classes.headerToolbar,
        }}>
          {
            hasLeftNavigation && (
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
            hasRightNavigation && (
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
          hasLeftNavigation && (
            <div className={ navbarClassname }>
              <Tree
                section="sidebar"
                uppercase
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
          hasRightNavigation && (
            <div className={ navbarClassname }>
              <Tree
                section="rightbar"
                uppercase 
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
