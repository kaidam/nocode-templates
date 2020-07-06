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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderRadius: '10px',
      border: `0.5px solid #999`,
      boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.2)',
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
        <img className={ classes.parrotImage } src="./images/loading/portal-parrot-in.gif" />
      </div>
      <div className={ classes.nocode }>
      <img className={ classes.logoImage } src="./images/favicon.png" />
      </div>
      <div className={ classes.parrot }>
      <img className={ classes.parrotImage } src="./images/loading/portal-parrot-out.gif" />
      </div>
    </div>
  )
}

export default ParrotLoading