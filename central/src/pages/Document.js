import React, { lazy } from 'react'
import Hidden from '@material-ui/core/Hidden'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'
import Suspense from '@nocode-works/template/components/system/Suspense'

import useStyles from '../styles/layout'

const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

const DocumentPage = ({

} = {}) => {

  const classes = useStyles()

  return (
    <div className={ classes.docRoot }>
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
