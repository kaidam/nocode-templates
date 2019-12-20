import Server from '@nocode-toolkit/website-material-ui/server'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'

import library from './library'
import App from './app'

const server = Server({
  reducers: mergeReducers({
    stripe: library.plugins.stripe.reducer,
    contactform: library.plugins.contactform.reducer,
  }),
  App,
})

export default server