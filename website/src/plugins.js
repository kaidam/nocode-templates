import StripePlugin from '@nocode-toolkit/plugin-stripe/ui/pluginMaterial'
import ContactFormPlugin from '@nocode-toolkit/plugin-contactform/ui/pluginMaterial'
import SocialLinksPlugin from '@nocode-toolkit/plugin-sociallinks/ui/plugin'

const plugins = {
  stripe: StripePlugin(),
  contactform: ContactFormPlugin(),
  sociallinks: SocialLinksPlugin(),
}

export default plugins