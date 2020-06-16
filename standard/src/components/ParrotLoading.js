import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {  
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      width: '200px',
    },
    logoImage: {
      width: '50px',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    parrotImage: {
      width: '40px',
    }
  }
})

const ParrotLoading = ({
  
}) => {
  const classes = useStyles()
  return (
    <div className={ classes.root }>
      <div className={ classes.parrot }>
        <img className={ classes.parrotImage } src="/images/loading/portal-parrot-in.gif" />
      </div>
      <div className={ classes.nocode }>
      <img className={ classes.logoImage } src="/images/favicon.png" />
      </div>
      <div className={ classes.parrot }>
      <img className={ classes.parrotImage } src="/images/loading/portal-parrot-out.gif" />
      </div>
    </div>
  )
}

export default ParrotLoading