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
      backgroundColor: '#fafafa',
      border: '1px solid #999',
      borderRadius: '10px',
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