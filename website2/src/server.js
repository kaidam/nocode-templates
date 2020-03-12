import Server from '@nocode-toolkit/frontend/server/material'

//import library from './library'
import App from './app'

const server = Server({
  // reducers: {
  //   stripe: library.plugins.stripe.reducer,
  //   contactform: library.plugins.contactform.reducer,
  // },
  App,
})

export default server