import config from './config'
import { useTheme } from '@material-ui/core'

const {
  document: {
    topLayoutId,
    bottomLayoutId,
  }
} = config

const autoCopyrightMessage = ({
  company_name,
}) => {
  return `© ${new Date().getFullYear()} ${company_name}`
}

const extractImageFromLayout = ({
  layout,
}) => {
  if(!layout) return null
  return layout
    .reduce((all, row) => all.concat(row))
    .find(item => item.type == 'image')
}

// return any image widgets that we find
// for an item
const extractImage = ({
  item,
}) => {
  const annotation = item.annotation
  if(!annotation) return null
  let image = extractImageFromLayout({
    layout: annotation[topLayoutId],
  })
  if(image) return image
  return extractImageFromLayout({
    layout: annotation[bottomLayoutId],
  })
}

export default {
  autoCopyrightMessage,
  extractImage,
}