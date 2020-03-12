import Render from '@nocode-toolkit/frontend/browser'

//import library from './library'
import App from './app'

const render = Render({
  // reducers: {
  //   stripe: library.plugins.stripe.reducer,
  //   contactform: library.plugins.contactform.reducer,
  // },
  App,
})

render()