import React, { lazy, useRef, useEffect, useCallback, useMemo } from 'react'
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
import contentSelectors from '@nocode-works/template/store/selectors/content'

import NavBar from '@nocode-works/template/components/navbar/Section'
import Suspense from '@nocode-works/template/components/system/Suspense'

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
  const {
    annotation,
  } = useSelector(contentSelectors.document)
  const storeTagSelector = useMemo(contentSelectors.mergedAnnotationArray, [])
  const storeTagData = useSelector(state => storeTagSelector(state, 'blogpost_tags'))

  const blogbarItems = useMemo(() => {
    return [{
      id: 'root',
      name: 'Home',
      route: {
        name: 'root',
        path: '/',
      },
    }].concat(storeTagData.map(tag => {
      return {
        id: `blogbar-${tag.toLowerCase().replace(/\W/g, '')}`,
        name: tag,
        route: {
          name: 'tag',
          path: '/tag',
          params: {
            tag,
          }
        }
      }
    }))
  }, [
    storeTagData,
  ])
    
  
  const isItemActive = useCallback(({
    node,
  }) => {
    if(route.name == 'root' && node.id == 'root') return true
    if(route.name == 'tag' && node.route.params && node.route.params.tag == route.params.tag) return true

    if(annotation && annotation.blogpost_tags && annotation.blogpost_tags.length > 0 && node.route.params) {
      const pageTag = annotation.blogpost_tags[0]
      if(pageTag == node.route.params.tag) return true
    }
    
    return false
  }, [
    annotation,
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
        titleField="blog_name"
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