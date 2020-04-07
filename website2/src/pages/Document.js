import React, { lazy } from 'react'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import Body from '@nocode-toolkit/frontend/components/document/Body'
const DocumentEditor = lazy(() => import(/* webpackChunkName: "ui" */ '../editor/Document'))

const DocumentPage = ({

} = {}) => {
  const {
    node,
    annotation,
    html,
  } = useSelector(contentSelectors.document)
  if(!node) return null
  return (
    <div className="document-container">
      <Suspense
        Component={ DocumentEditor }
        props={{
          node,
          annotation,
        }}
      />
      <Body
        node={ node }
        html={ html }
      />
    </div>
  )
}

export default DocumentPage
