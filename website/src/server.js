import Server from '@nocode-toolkit/website-material-ui/server'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'

import plugins from './plugins'
import App from './app'

const server = Server({
  reducers: mergeReducers({
    stripe: plugins.stripe.reducer,
  }),
  App,
})

export default server