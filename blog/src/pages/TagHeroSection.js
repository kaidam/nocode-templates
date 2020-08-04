import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import Suspense from '@nocode-works/template/components/system/Suspense'

import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'

import HeroSection from './HeroSection'

const EditableSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/content/EditableSettings'))
const RandomImageLoader = lazy(() => import(/* webpackChunkName: "ui" */ './RandomImageLoader'))

const SCHEMA = [{
  id: 'title',
  title: 'Title',
  helperText: 'The main text to display',
  default: '',
}, {
  id: 'subtitle',
  title: 'Sub Title',
  helperText: 'Smaller text to display',
  default: '',
}, {
  id: 'image',
  title: 'Image',
  helperText: 'Choose an image to display in this hero section',
  component: 'image',
  providers: ['local', 'google', 'unsplash'],
  default: null,
}]

const DEFAULT_VALUES = {
  title: '',
  subtitle: '',
  image: null,
}

const TagHeroSection = ({
  defaultTitle,
  prefix,
} = {}) => {

  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const values = settings[prefix] || Object.assign({}, DEFAULT_VALUES, {
    title: defaultTitle,
  })

  const content = (
    <HeroSection
      values={ values }
    />
  )

  return showUI ? (
    <Suspense>
      <EditableSettings
        title="Hero Section"
        values={ values }
        prefix={ prefix }
        schema={ SCHEMA }
      >
        { content }
      </EditableSettings>
      <RandomImageLoader
        mode="tag"
        prefix={ prefix }
        values={ values }
      />
    </Suspense>
  ) : content
}

export default TagHeroSection
