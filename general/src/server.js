import Server from '@nocode-toolkit/website-material-ui/server'
import reducers from '@nocode-toolkit/ui/store/reducers'
import App from './app'

const server = Server({
  reducers,
  App,
})

export default server