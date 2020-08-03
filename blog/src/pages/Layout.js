import React, { lazy, useRef, useEffect, useCallback } from 'react'
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

import selectors from '../selectors'

import useStyles from '../styles/layout'

import icons from '@nocode-works/template/icons'

const GlobalSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/system/GlobalSettings'))

const Layout = ({
  children,
}) => {
  const showUI = useSelector(systemSelectors.showUI)

  const contentRef = useRef(null)
  
  const settings = useSelector(settingsSelectors.settings)
  const route = useSelector(routerSelectors.route)

  const blogbarItems = useSelector(selectors.blogbarLinks)
  
  const isItemActive = useCallback(({
    node,
  }) => {
    if(route.name == 'root' && node.id == 'root') return true
    if(route.name == 'tag' && node.route.params && node.route.params.tag == route.params.tag) return true
    return false
  }, [
    route,
  ])

  const getTopbarAddItems = useCallback(({
    onCreateContent,
    addTargetFolderId,
  }) => {
    return [{
      title: 'New Blogpost',
      icon: icons.docs,
      handler: () => onCreateContent({
        title: 'Create Blogpost',
        driver: 'drive',
        type: 'drive.document',
        form: 'drive.blogpost',
        parentId: addTargetFolderId,
      }),
    }]
  })

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
          elevation={ 0 }
        >
          <Toolbar classes={{
            root: classes.headerToolbar,
          }}>
            <Hidden smDown implementation="css">
              <div className={ classes.toolbarControls }></div>
            </Hidden>
            <div className={ classes.toolbarMenuContainer }>
              <div className={ classes.toolbarMenu }>
                <div className={ classes.toolbarMenuLeft }>
                  <Hidden smDown implementation="css">
                    <NavBar
                      items={ blogbarItems }
                      section="blogposts"
                      align="left"
                      editable={ false }
                      withSettings={ false }
                      isItemActive={ isItemActive }
                      getAddItems={ getTopbarAddItems }
                    />
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    <NavBar
                      small
                      items={ blogbarItems }
                      section="blogposts"
                      align="left"
                      editable={ false }
                      withSettings={ false }
                      isItemActive={ isItemActive }
                      getAddItems={ getTopbarAddItems }
                    />
                  </Hidden>
                </div>
                <div className={ classes.toolbarMenuFiller }></div>
                <div className={ classes.toolbarMenuRight }>
                  <Hidden smDown implementation="css">
                    <NavBar
                      section="topbar"
                      align="right"
                    />
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    <NavBar
                      small
                      section="topbar"
                      align="right"
                    />
                  </Hidden>
                </div>
              </div>
            </div>
            <div className={ classes.toolbarControls }>
              <Suspense
                coreEnabled
                Component={ GlobalSettings }
                props={{
                  className: classes.globalSettings,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={ classes.main }>
          <div className={ classes.contentContainer }>
            <main className={ classes.content } ref={ contentRef }>
              { children }
            </main>
          </div>
        </div>
        <SnackBar />
      </AppLayout>
    </div>
  )
}

export default Layout