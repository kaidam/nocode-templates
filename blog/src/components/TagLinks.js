import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@nocode-works/template/components/widgets/Link'

const useStyles = makeStyles(theme => ({
  summary: {
    color:'#999',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
}))

const TagLinks = ({
  tags,
}) => {

  const classes = useStyles()

  if(!tags || tags.length <= 0) return null

  return (
    <div className={ classes.summary }>
      tags:&nbsp;
      { 
        tags.map((tag, i) => {
          return (
            <React.Fragment key={ i }>
              <Link
                name="tag"
                params={{
                  tag,
                }}
              >
                { tag }
              </Link>
              {
                i < tags.length - 1 && (
                  <span>,&nbsp;</span>
                )
              }
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default TagLinks
