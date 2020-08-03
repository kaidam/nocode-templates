import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import UnsplashCopyright from '@nocode-works/template/components/widgets/UnsplashCopyright'

const useStyles = makeStyles(theme => ({
  root: ({image}) => ({
    height: '350px',
    position: 'relative',
    backgroundColor: '#fff',
    backgroundImage: image ? `url(${image.url})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'fit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '50%',
    minWidth: '200px',
    maxWidth: '450px',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
}))

const HeroSection = ({
  values,
} = {}) => {

  const classes = useStyles({
    image: values.image,
  })

  return (
    <div className={ classes.root }>
      <div className={ classes.text }>
        {
          values.title && (
            <Typography color="primary" variant="h4" gutterBottom={ values.subtitle ? true : false }>
              <strong>{ values.title.replace(/^(\w)/, st => st.toUpperCase()) }</strong>
            </Typography>
          )
        }
        {
          values.subtitle && (
            <Typography variant="body1">
              { values.subtitle }
            </Typography>
          )
        }
      </div>
      <UnsplashCopyright
        withWrapper
        unsplash={ values.image ? values.image.unsplash : null }
      />
    </div>
  )
}

export default HeroSection
