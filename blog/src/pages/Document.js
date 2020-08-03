import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'
import Hidden from '@material-ui/core/Hidden'

import Suspense from '@nocode-works/template/components/system/Suspense'
import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'

import BlogPosts from './BlogPosts'
import PostHeroSection from './PostHeroSection'

const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const useStyles = makeStyles(theme => {
  return {
    root: {
      
    },
    contentToolbar: {
      height: '100%',
      maxWidth: '816px',
      margin: '0px auto',
      paddingRight: '108px',
      paddingLeft: '86px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    smallContentToolbar: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
    },

    contentChildren: {
      maxWidth: '816px',
      margin: '0px auto',
      minHeight: `calc(100% - ${theme.layout.footerHeight}px - 1px)`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingRight: '96px',
      paddingLeft: '96px',
      [theme.breakpoints.up(theme.layout.largeScreenBreakpoint)]: {
        paddingLeft: '96px',
        paddingRight: '96px',
      },
      [theme.breakpoints.down(theme.layout.smallScreenBreakpoint)]: {
        paddingLeft: [['17px'], '!important'],
        paddingRight: [['17px'], '!important'],
      },
      letterSpacing: '0px',
    },

  }
})

const DocumentPage = ({

} = {}) => {

  const classes = useStyles()

  const route = useSelector(routerSelectors.route)
  const isBlogPostsRoute = route.name == 'root' || route.name == 'tag'

  return (
    <div className={ classes.root }>
      {
        isBlogPostsRoute ? (
          <BlogPosts />
        ) : (
          <div>
            <PostHeroSection />
            <Hidden smDown implementation="css">
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.contentToolbar,
                  borderTop: true,
                }}
              />
            </Hidden>
            <Hidden mdUp implementation="css">
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.smallContentToolbar,
                  small: true,
                  borderTop: true,
                }}
              />
            </Hidden>
            <div className={ classes.contentChildren }>
              <CoreDocumentPage />
            </div>
          </div>
        )
      }
    </div>
    
  )
}

export default DocumentPage
