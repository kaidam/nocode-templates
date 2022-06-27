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

import Logo from '@nocode-works/template/components/editable/Logo'
import Copyright from '@nocode-works/template/components/editable/Copyright'
import SocialLinks from '@nocode-works/template/components/editable/SocialLinks'
import Search from '@nocode-works/template/components/editable/Search'
import useHasFeature from '@nocode-works/template/components/hooks/useHasFeature'

import useStyles from '../styles/layout'

const GlobalSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/system/GlobalSettings'))
const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const Layout = ({
  children,
}) => {
  const showUI = useSelector(systemSelectors.showUI)
  const hasSearch = useHasFeature('search')

  const contentRef = useRef(null)
  
  const settings = useSelector(settingsSelectors.settings)
  console.dir(settings)
  const route = useSelector(routerSelectors.route)
  
  const hasLeftNavigation = settings.leftNavigation
  const hasRightNavigation = settings.rightNavigation
  const hasFooter = settings.footer

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
      >
        <AppBar 
          position="fixed"
          className={ classes.appbar }
        >
          <Toolbar classes={{
            root: classes.headerToolbar,
          }}>
            {
              hasLeftNavigation && (
                <Hidden mdUp implementation="css">
                  <div className={ classes.appBarSmallMenu }>
                    <NavDrawer
                      getChildren={({
                        closeDrawer,
                      }) => {

                        const onClick = ({
                          isFolderToggle,
                        }) => {
                          if(isFolderToggle) return
                          closeDrawer()
                        }

                        return (
                          <div className={ classnames('nocode-sidebar', 'nocode-sidebar-combined') }>
                            <Tree
                              section="sidebar"
                              type="drawer"
                              isNavDrawer
                              autoHeight={ false }
                              onClick={ onClick }
                            />
                            <Tree
                              section="rightbar"
                              type="drawer"
                              isNavDrawer
                              autoHeight={ false }
                              onClick={ onClick }
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                </Hidden>
              )
            }
            <div className={ classes.appBarTitle }>
              <Logo
                defaultLogo="/images/placeholder-logo.jpg"
              />
            </div>
            
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
              <Hidden smDown implementation="css">
                <div className={ classnames('nocode-sidebar', 'nocode-sidebar-left', navbarClassname) }>
                  <Tree
                    section="sidebar"
                    type="full"
                  />
                </div>
              </Hidden>
            )
          }
          <div className={ classes.contentContainer }>
            <main className={ classes.content } ref={ contentRef }>
              <div className={ classes.contentChildrenContainer }>
                { children }
              </div>
            </main>
          </div>
          {
            hasRightNavigation && (
              <Hidden smDown implementation="css">
                <div className={ classnames('nocode-sidebar', 'nocode-sidebar-right', navbarClassname) }>
                  <Tree
                    section="rightbar"
                    type="full"
                  />
                </div>
              </Hidden>
            )
          }
        </div>
        {
                hasFooter && (
                  <>
                    <Divider />
                    <div className={ classes.footer }>
                      <Toolbar classes={{
                        root: classes.footerToolbar,
                      }}>
                        <div className={ classes.footerContainer }>
                          <div className={ classes.footerFiller }>
                            <div className={ classnames('nocode-navbar', 'nocode-navbar-footer', classes.footerNavBar) }>
                              <Hidden smDown implementation="css">
                                <NavBar
                                  section="footer"
                                  contrast
                                  align="right"
                                  float="left"
                                />
                              </Hidden>
                              <Hidden mdUp implementation="css">
                                <NavBar
                                  small
                                  section="footer"
                                  contrast
                                  vertical
                                  align="right"
                                  float="left"
                                />
                              </Hidden>
                            </div>
                          </div>
                          <div className={ classes.footerSocialLinks }>
                            <SocialLinks />
                          </div>
                          <div className={ classes.footerCopyright }>
                            <Copyright />
                          </div>
                        </div>
                      </Toolbar>
                    </div>
                  </>
                )
              }
        <SnackBar />
      </AppLayout>
    </div>
  )
}

export default Layout