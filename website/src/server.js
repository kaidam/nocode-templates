import Server from '@nocode-toolkit/website-material-ui/server'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'
import stripePlugin from '@nocode-toolkit/plugin-stripe/ui'

import App from './app'

const server = Server({
  reducers: mergeReducers({
    stripe: stripePlugin.reducer,
  }),
  App,
})

export default server