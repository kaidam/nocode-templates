import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Suspense from '@nocode-works/template/components/system/Suspense'

import useDocumentEditor from '@nocode-works/template/components/hooks/useDocumentEditor'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import contentSelectors from '@nocode-works/template/store/selectors/content'

import HeroSection from './HeroSection'

const EditableElement = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/content/EditableElement'))

const PostHeroSection = ({
  
} = {}) => {

  const showUI = useSelector(systemSelectors.showUI)
  const {
    node,
    annotation,
  } = useSelector(contentSelectors.document)

  const {
    onOpenSettings,
  } = useDocumentEditor({
    node,
  })

  const heroValues = {
    title: node.name,
    subtitle: annotation.summary,
    image: annotation.image,
  }

  const content = (
    <HeroSection
      values={ heroValues }
      showEditMessage={ showUI }
    />
  )

  return showUI ? (
    <Suspense>
      <EditableElement
        onClick={ () => onOpenSettings('drive.hero_page') }
      >
        { content }
      </EditableElement>
    </Suspense>
  ) : content
}

export default PostHeroSection
