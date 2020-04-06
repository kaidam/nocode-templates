import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

import AppLayout from '@nocode-toolkit/frontend/components/system/Layout'
import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'
import settingsSelectors from '@nocode-toolkit/frontend/store/selectors/settings'
import routerSelectors from '@nocode-toolkit/frontend/store/selectors/router'

import NavDrawer from '@nocode-toolkit/frontend/components/widgets/NavDrawer'

import Logo from '../components/Logo'
import Copyright from '../components/Copyright'
import Tree from '../components/Tree'
import NavBar from '../components/NavBar'

import useStyles from '../styles/layout'

const Layout = ({
  children,
}) => {
  const classes = useStyles()
  const contentRef = useRef(null)

  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const route = useSelector(routerSelectors.route)
  
  const navigationSettings = settings.navigation || {}
  let hasLeftNavigation = navigationSettings.left === true
  let hasRightNavigation = navigationSettings.right === true

  const navbarClassname = classnames({
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
      <AppLayout
        material
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
            {
              hasLeftNavigation && (
                <Hidden mdUp>
                  <NavDrawer
                    Component={ Tree }
                    section="sidebar"
                  />
                </Hidden>
              )
            }
            <div className={ classes.appBarTitle }>
              <Logo />
            </div>
            <Hidden smDown>
              <NavBar
                section="topbar"
                withHome
              />
            </Hidden>
            <Hidden mdUp>
              <NavBar
                small
                section="topbar"
                withHome
              />
            </Hidden>
            {
              hasRightNavigation && (
                <Hidden mdUp>
                  <NavDrawer
                    Component={ Tree }
                    section="rightbar"
                    anchor="right"
                  />
                </Hidden>
              )
            }
          </Toolbar>
        </AppBar>
        <div className={ classes.main }>
          {
            hasLeftNavigation && (
              <Hidden smDown>
                <div className={ navbarClassname }>
                  <Tree
                    section="sidebar"
                  />
                </div>
              </Hidden>
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
                    <Hidden smDown>
                      <NavBar
                        section="footer"
                        contrast
                        vertical
                        align="right"
                      />
                    </Hidden>
                    <Hidden mdUp>
                      <NavBar
                        small
                        section="footer"
                        contrast
                        vertical
                        align="right"
                      />
                    </Hidden>
                  </div>
                </div>
              </Toolbar>
            </div>
          </main>
          {
            hasRightNavigation && (
              <Hidden smDown>
                <div className={ navbarClassname }>
                  <Tree
                    section="rightbar"
                  />
                </div>
              </Hidden>
            )
          }
        </div>
      </AppLayout>
    </div>
  )
}

export default Layout