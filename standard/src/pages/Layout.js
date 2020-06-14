import React, { lazy, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

import SnackBar from '@nocode-works/template/components/system/Snackbar'
import AppLayout from '@nocode-works/template/components/system/Layout'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import routerSelectors from '@nocode-works/template/store/selectors/router'

import NavDrawer from '@nocode-works/template/components/widgets/NavDrawer'
import Tree from '@nocode-works/template/components/tree/Section'
import NavBar from '@nocode-works/template/components/navbar/Section'

import Suspense from '@nocode-works/template/components/system/Suspense'

import systemUtils from '@nocode-works/template/utils/system'

import Logo from '../components/Logo'
import Copyright from '../components/Copyright'

import useStyles from '../styles/layout'

import {
  DOCUMENT,
} from '../config'

const GlobalSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/system/GlobalSettings'))
const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const Layout = ({
  children,
}) => {
  const showUI = useSelector(systemSelectors.showUI)
  
  const contentRef = useRef(null)

  const settings = useSelector(settingsSelectors.settings)
  const route = useSelector(routerSelectors.route)
  
  const navigationSettings = settings.navigation || {}
  let hasLeftNavigation = navigationSettings.left === true
  let hasRightNavigation = navigationSettings.right === true

  const classes = useStyles({
    showUI,
    hasRightNavigation,
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

  const hiddenMode = systemUtils.isNode ? "css" : "js"

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
                <Hidden mdUp implementation={ hiddenMode }>
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
            {
              hasRightNavigation && (
                <Hidden mdUp implementation={ hiddenMode }>
                  <NavDrawer
                    Component={ Tree }
                    section="rightbar"
                    anchor="right"
                  />
                </Hidden>
              )
            }
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
          {
            hasLeftNavigation && (
              <Hidden smDown implementation={ hiddenMode }>
                <div className={ navbarClassname }>
                  <Tree
                    section="sidebar"
                  />
                </div>
              </Hidden>
            )
          }
          <div className={ classes.contentContainer }>
            <Suspense
              Component={ EditableDocumentToolbar }
              props={{
                className: classes.contentToolbar,
                defaultLayoutId: DOCUMENT.topLayoutId,
              }}
            />
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
                    <div className={ classes.footerFiller }>
                      
                    </div>
                    <div className={ classes.footerNavBar }>
                      <Hidden smDown implementation={ hiddenMode }>
                        <NavBar
                          section="footer"
                          contrast
                          vertical
                          align="right"
                        />
                      </Hidden>
                      <Hidden mdUp implementation={ hiddenMode }>
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
          </div>
          {
            hasRightNavigation && (
              <Hidden smDown implementation={ hiddenMode }>
                <div className={ navbarClassname }>
                  <Tree
                    section="rightbar"
                  />
                </div>
              </Hidden>
            )
          }
        </div>
      <SnackBar />
      </AppLayout>
    </div>
  )
}

export default Layout


/*

  {
            showUI ? (
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  children: mainContent,
                }}
              />
            ) : mainContent
          }

*/