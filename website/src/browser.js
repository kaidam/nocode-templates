import Render from '@nocode-toolkit/website-material-ui/browser'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'

import plugins from './plugins'
import App from './app'

const render = Render({
  reducers: mergeReducers({
    stripe: plugins.stripe.reducer,
    contactform: plugins.contactform.reducer,
  }),
  App,
})

render()