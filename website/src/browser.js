import Render from '@nocode-toolkit/website-material-ui/browser'
import { mergeReducers } from '@nocode-toolkit/ui/store/reducers'

import library from './library'
import App from './app'

const render = Render({
  reducers: mergeReducers({
    stripe: library.plugins.stripe.reducer,
    contactform: library.plugins.contactform.reducer,
  }),
  App,
})

render()