const themeProcessor = ({
  config,
  route,
  settings,
}) => {
  const updates = {
    layout: {
      topbarHeight: 67,
      smallScreenBreakpoint: 'sm',
      largeScreenBreakpoint: 'md',
    }
  }
  if(settings.color && settings.color.color) {
    updates.palette = {
      primary: {
        main: settings.color.color
      }
    }
  }
  if(settings.topbarHeight) {
    updates.layout.topbarHeight = settings.topbarHeight
  }
  return updates
}

export default themeProcessor