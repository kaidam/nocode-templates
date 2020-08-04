import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import Suspense from '@nocode-works/template/components/system/Suspense'

import settingsSelectors from '@nocode-works/template/store/selectors/settings'
import systemSelectors from '@nocode-works/template/store/selectors/system'
import websiteSelectors from '@nocode-works/template/store/selectors/website'

import HeroSection from './HeroSection'
import utils from '../utils'

const EditableSettings = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/content/EditableSettings'))

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
  providers: ['local', 'google', 'unsplash', 'unsplash_random'],
  random_query_field: 'title',
  default: null,
}]

const DEFAULT_VALUES = {
  title: '',
  subtitle: '',
  image: null,
}

const TagHeroSection = ({
  tag
} = {}) => {

  const showUI = useSelector(systemSelectors.showUI)
  const settings = useSelector(settingsSelectors.settings)
  const websiteData = useSelector(websiteSelectors.websiteData)

  const settingsKey = utils.tagSettingsKey(tag)
  const values = Object.assign({}, DEFAULT_VALUES, {
    title: utils.tagTitle(tag, websiteData),
  }, settings[settingsKey])
  
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
        prefix={ settingsKey }
        schema={ SCHEMA }
      >
        { content }
      </EditableSettings>
    </Suspense>
  ) : content
}

export default TagHeroSection
