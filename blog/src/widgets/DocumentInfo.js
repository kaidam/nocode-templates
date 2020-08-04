import React from 'react'
import { useSelector } from 'react-redux'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import CoreDocumentInfo from '@nocode-works/template/widgets/DocumentInfo'

import TagLinks from '../components/TagLinks'

const CoreRender = CoreDocumentInfo.Render

const Render = ({
  
}) => {
  const {
    annotation,
  } = useSelector(contentSelectors.document)

  return (
    <CoreRender>
      {
        annotation && annotation.blogpost_tags && annotation.blogpost_tags.length > 0 && (
          <TagLinks
            tags={ annotation.blogpost_tags }
          />
        )
      }
    </CoreRender>
  )
}

export default Object.assign({}, CoreDocumentInfo, {
  Render,
})
