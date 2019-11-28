import Render from '@nocode-toolkit/website-material-ui/browser'
import reducers from '@nocode-toolkit/ui/store/reducers'
import App from './app'

const render = Render({
  reducers,
  App,
})

render()