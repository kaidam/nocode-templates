import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import Hidden from '@material-ui/core/Hidden'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'
import Suspense from '@nocode-works/template/components/system/Suspense'
import settingsSelectors from '@nocode-works/template/store/selectors/settings'

import useStyles from '../styles/layout'
import PostHeroSection from './PostHeroSection'

const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const DocumentPage = ({

} = {}) => {

  const classes = useStyles()
  const settings = useSelector(settingsSelectors.settings)

  return (
    <div className={ classes.docRoot }>
      {
        settings.featuredImage && (
          <div>
            <PostHeroSection />
          </div>
        )
      }
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
      <div className={ classes.document }>
        <CoreDocumentPage />
      </div>
    </div>
    
  )
}

export default DocumentPage
