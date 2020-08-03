import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'
import Hidden from '@material-ui/core/Hidden'

import Suspense from '@nocode-works/template/components/system/Suspense'
import routerSelectors from '@nocode-works/template/store/selectors/router'
import useStyles from '../styles/document'
import BlogPosts from './BlogPosts'

const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const DocumentPage = ({

} = {}) => {

  const classes = useStyles()

  const route = useSelector(routerSelectors.route)
  const isBlogPostsRoute = route.name == 'root' || route.name == 'tag'
  
  return (
    <div className={ classes.root }>
      {
        isBlogPostsRoute ? (
          <div className={ classes.contentChildren }>
            <BlogPosts />
          </div>
        ) : (
          <div className={ classes.page }>
            <Hidden smDown implementation="css">
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.contentToolbar,
                }}
              />
            </Hidden>
            <Hidden mdUp implementation="css">
              <Suspense
                Component={ EditableDocumentToolbar }
                props={{
                  className: classes.smallContentToolbar,
                  small: true,
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
