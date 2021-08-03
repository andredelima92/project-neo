import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import { Theme } from '@material-ui/core/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import LoopIcon from '@material-ui/icons/Loop'
import React, { useEffect, useRef, useState } from 'react'

import girocamImg from '../assets/studio-girocam-no-bg.png'
import useDebounce from '../utils/useDebounce'
import pad from '../utils/pad'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#f3f3f3'
    },
    imgDevice: {
      height: 100,
      width: 100,
      backgroundColor: '#e3e3e3',
      objectFit: 'contain',
      borderRadius: '50%',
      marginRight: 15
    },
    titleDeviceContainer: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: 15
    },
    controlContainer: {
      padding: 20
    },
    containerHighlight: {
      backgroundColor: '#80808038'
    },
    controlButton: {
      width: 130
    }
  })
)

interface Props {
  name: string
  topic: string
  sendCommand(topic: string, command: string): void
}

const GirocamControl: React.FC<Props> = props => {
  const classes = useStyles()
  const [velocity, setVelocity] = useState<number>(200)
  const debouncedVelocity = useDebounce<number>(velocity, 1000)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    props.sendCommand(props.topic, `3${pad(debouncedVelocity, 3)}`)
  }, [debouncedVelocity])

  const handleVelocityChange = (_event, newValue: number | number[]) => {
    setVelocity(newValue as number)
  }

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        className={classes.titleDeviceContainer}
      >
        <img className={classes.imgDevice} src={girocamImg} />
        <Typography variant="h5">{props.name}</Typography>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        justifyContent="center"
        alignItems="center"
        className={`${classes.controlContainer} ${classes.containerHighlight}`}
      >
        <Typography>Rotacionar Eixo Y (Tilt)</Typography>
        <Box
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            onClick={() => props.sendCommand(props.topic, '1001')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<KeyboardArrowUpIcon />}
          >
            Subir
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '1003')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<SwapHorizIcon />}
          >
            Inverter
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '1002')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Descer
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        justifyContent="center"
        alignItems="center"
        className={classes.controlContainer}
      >
        <Typography>Rotacionar Eixo X (Pan)</Typography>
        <Box
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            onClick={() => props.sendCommand(props.topic, '2001')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<KeyboardArrowLeftIcon />}
          >
            Esquerda
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '2003')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<SwapHorizIcon />}
          >
            Inverter
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '2002')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Direita
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        className={`${classes.controlContainer} ${classes.containerHighlight}`}
      >
        <Typography>Velocidade</Typography>
        <Slider
          valueLabelDisplay="auto"
          min={1}
          max={255}
          value={velocity}
          onChange={handleVelocityChange}
          aria-labelledby="continuous-slider"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        className={classes.controlContainer}
      >
        <Button
          onClick={() => props.sendCommand(props.topic, '4000')}
          variant="contained"
          color="primary"
          className={classes.controlButton}
          startIcon={<LoopIcon />}
        >
          Resetar
        </Button>
      </Grid>
    </Grid>
  )
}

export default GirocamControl
