import baseTheme from '@nocode-toolkit/ui/baseTheme'

const themeFactory = baseTheme(({
  theme,
}) => {
  // here is a chance to override settings for the theme
  return theme
})

export default themeFactory