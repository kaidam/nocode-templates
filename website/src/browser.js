import Render from '@nocode-toolkit/website-material-ui/browser'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'
import stripePlugin from '@nocode-toolkit/plugin-stripe/ui'

import App from './app'


const render = Render({
  reducers: mergeReducers({
    stripe: stripePlugin.reducer,
  }),
  App,
})

render()