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
        head={(
          <React.Fragment>
            <link rel="stylesheet" href="./css/index.css" />
            <script src="https://cdn.tailwindcss.com"></script>
          </React.Fragment>
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
                <Hidden mdUp implementation="css">
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
                        <>
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
                        </>
                      )
                    }}
                  />
                </Hidden>
              )
            }
            <div className={ classes.appBarTitle }>
              <Logo />
            </div>
            <Hidden smDown implementation="css">
              <NavBar
                section="topbar"
                withHome
              />
            </Hidden>
            <Hidden mdUp implementation="css">
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
        <header class="bg-white-600">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            {
              hasLeftNavigation && (
                <Hidden mdUp implementation="css">
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
                        <>
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
                        </>
                      )
                    }}
                  />
                </Hidden>
              )
            }
              <div class="flex items-center">
                <a href="#">
                  <div className={ classes.appBarTitle }>
                    <Logo />
                  </div>
                </a>
                <div class="hidden ml-10 space-x-8 lg:block">
                  <Hidden smDown implementation="css">
                    <NavBar
                      section="topbar"
                      withHome
                    />
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    <NavBar
                      small
                      section="topbar"
                      withHome
                    />
                  </Hidden>
                </div>
              </div>
              <div class="ml-10 space-x-4">
                <Suspense
                  coreEnabled
                  Component={ GlobalSettings }
                  props={{
                    className: classes.globalSettings,
                  }}
                />
              </div>
            </div>
            <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
              <Hidden smDown implementation="css">
                <NavBar
                  section="topbar"
                  withHome
                />
              </Hidden>
              <Hidden mdUp implementation="css">
                <NavBar
                  small
                  section="topbar"
                  withHome
                />
              </Hidden>
            </div>
          </nav>
        </header>
        <div className={ classes.main }>
          {
            hasLeftNavigation && (
              <Hidden smDown implementation="css">
                <div className={ navbarClassname }>
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
              {
                hasFooter && (
                  <>
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
                            <Hidden smDown implementation="css">
                              <NavBar
                                section="footer"
                                contrast
                                vertical
                                align="right"
                              />
                            </Hidden>
                            <Hidden mdUp implementation="css">
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
                  </>
                )
              }
            </main>
          </div>
          {
            hasRightNavigation && (
              <Hidden smDown implementation="css">
                <div className={ navbarClassname }>
                  <Tree
                    section="rightbar"
                    type="full"
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