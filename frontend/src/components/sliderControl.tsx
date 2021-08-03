import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Slider from '@material-ui/core/Slider'
import { Theme } from '@material-ui/core/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import StopIcon from '@material-ui/icons/Stop'
import React, { useEffect, useRef, useState } from 'react'
import LoopIcon from '@material-ui/icons/Loop'

import sliderImg from '../assets/studio-slider-no-bg.png'
import pad from '../utils/pad'
import useDebounce from '../utils/useDebounce'

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

const SliderControl: React.FC<Props> = props => {
  const classes = useStyles()

  const [mode, setMode] = useState<string>('1001')
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

  const handleModeChange = (event: React.ChangeEvent<{ value: string }>) => {
    setMode(event.target.value)
    props.sendCommand(props.topic, event.target.value)
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
        <img className={classes.imgDevice} src={sliderImg} />
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
        <Typography>Modo</Typography>
        <RadioGroup
          row
          aria-label="gender"
          name="mode"
          value={mode}
          onChange={handleModeChange}
        >
          <FormControlLabel value="1001" control={<Radio />} label="Manual" />
          <FormControlLabel value="1002" control={<Radio />} label="Loop" />
          <FormControlLabel value="1003" control={<Radio />} label="Lapse" />
        </RadioGroup>
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
        <Typography>Movimentar Horizontalmente</Typography>
        <Box
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            onClick={() => props.sendCommand(props.topic, '2002')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<KeyboardArrowLeftIcon />}
          >
            Esquerda
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '1004')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<StopIcon />}
          >
            Parar
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '2001')}
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

export default SliderControl
