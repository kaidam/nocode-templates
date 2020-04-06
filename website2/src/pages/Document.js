import React from 'react'
import { useSelector } from 'react-redux'

import contentSelectors from '@nocode-toolkit/frontend/store/selectors/content'

import Body from '@nocode-toolkit/frontend/components/document/Body'

const DocumentPage = ({

} = {}) => {
  const {
    node,
    html,
  } = useSelector(contentSelectors.document)
  return (
    <div className="document-container">
      <Body
        node={ node }
        html={ html }
      />
    </div>
  )
}

export default DocumentPage
