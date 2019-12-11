import StripePlugin from '@nocode-toolkit/plugin-stripe/ui'
import PaymentButton from '@nocode-toolkit/website-material-ui/components/cells/PaymentButton'

const stripe = StripePlugin({
  renderers: {
    paymentButton: PaymentButton,
  }
})

const plugins = {
  stripe,
}

export default plugins