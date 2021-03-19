import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { ReactComponent as TitleIcon } from '../icons/vivid-angle-top-left.svg'

const Spinner = ({ className }) => {
  const classes = useStyles()

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.spinner}>
        <TitleIcon className={classes.icon} />
        <TitleIcon className={classes.icon} />
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  container: {
    width: 32
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    animationName: '$loading',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-out',
    '& > * + *': {
      marginTop: 16
    }
  },
  icon: {
    fill: 'currentcolor',
    width: 32,
    height: 32,
    '&:last-child': {
      transform: 'rotate(180deg)'
    }
  },
  '@keyframes loading': {
    '0%': { transform: 'rotate(0deg)', opacity: 0 },
    '50%': { transform: 'rotate(360deg)', opacity: 1 },
    '75%': { transform: 'rotate(360deg)', opacity: 1 },
    '100%': { transform: 'rotate(360deg)', opacity: 0 }
  }
})

export default Spinner
