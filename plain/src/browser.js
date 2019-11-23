import Render from '@nocode-toolkit/website/browser'
import reducers from '@nocode-toolkit/ui/store/reducers'
import App from './app'

const render = Render({
  reducers,
  App,
})

render()