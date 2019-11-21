import App from './app'
import Render from '@nocode-toolkit/ui/browser'
import reducers from '@nocode-toolkit/ui/store/reducers'

const render = Render({
  reducers,
  App,
})

render()