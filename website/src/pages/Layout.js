import React, { lazy, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

import UILoader from '@nocode-toolkit/ui/components/system/UILoader'
import Header from '@nocode-toolkit/ui/components/system/Header'
import Search from '@nocode-toolkit/ui/components/cells/Search'

import Tree from '@nocode-toolkit/website-material-ui/components/content/Tree/Tree'
import NavBar from '@nocode-toolkit/website-material-ui/components/content/NavBar/NavBar'
import Copyright from '@nocode-toolkit/website-material-ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/website-material-ui/components/widgets/Logo'
import NavDrawer from '@nocode-toolkit/website-material-ui/components/widgets/NavDrawer'
import Snackbar from '@nocode-toolkit/ui/components/system/Snackbar'

import selectors from '@nocode-toolkit/ui/store/selectors'

import useStyles from '../styles/layout'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const Layout = ({
  children,
}) => {
  const classes = useStyles()

  const contentRef = useRef(null)

  const showUI = useSelector(selectors.ui.showUI)
  const settingsItem = useSelector(selectors.ui.settings)
  const route = useSelector(selectors.router.route)

  const settings = settingsItem && settingsItem.data ?
    settingsItem.data :
    {}

  let hasLeftNavigation = false
  let hasRightNavigation = false
  let hasLeftSearch = false
  let hasRightSearch = false

  const navigationSettings = settings.navigation
  const searchSettings = settings.search

  if(!navigationSettings) {
    hasLeftNavigation = true
  }
  else {
    hasLeftNavigation = navigationSettings.left === true
    hasRightNavigation = navigationSettings.right === true
  }

  if(!searchSettings) {
    hasLeftSearch = true
  }
  else {
    hasLeftSearch = searchSettings.left === true
    hasRightSearch = searchSettings.right === true
  }

  const navbarClassname = classNames({
    [classes.drawer]: true,
    [classes.largeScreen]: true,
    [classes.largeDrawer]: showUI,
    [classes.smallDrawer]: !showUI,
  })

  useEffect(() => {
    contentRef.current.scrollTop = 0
  }, [route])

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
              />
            )
          }
          <div className={ classes.appBarTitle }>
            <Logo />
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
                contentTop={ 
                  hasLeftSearch ? (
                    <div className={ classes.searchHolder }>
                      <Search />
                    </div>
                  ) : null
                }
              />
            </div>
          )
        }
        <main className={ classes.content } ref={ contentRef }>
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
                    vertical
                    align="right"
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
                contentTop={ 
                  hasRightSearch ? (
                    <div className={ classes.searchHolder }>
                      <Search />
                    </div>
                  ) : null
                }
              />
            </div>
          )
        }
      </div>
      {
        !showUI && (
          <Snackbar />
        )
      }
      <UILoader
        Component={ UIElements }
      />
    </div>
  )
}

export default Layout
