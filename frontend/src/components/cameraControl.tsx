import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Theme } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import LoopIcon from '@material-ui/icons/Loop'
import React from 'react'

import cameraImg from '../assets/studio-camera-no-bg.png'

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
      minWidth: 130
    }
  })
)

interface Props {
  name: string
  topic: string
  sendCommand(topic: string, command: string): void
}

const CameraControl: React.FC<Props> = props => {
  const classes = useStyles()

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        className={classes.titleDeviceContainer}
      >
        <img className={classes.imgDevice} src={cameraImg} />
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
        <Typography>Ligar/Desligar</Typography>
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
            startIcon={<PowerSettingsNewIcon />}
          >
            Ligar
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '1002')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<PowerSettingsNewIcon />}
          >
            Desligar
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '1003')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<PowerSettingsNewIcon />}
          >
            Toogle
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
        <Typography>Gravação</Typography>
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
            startIcon={<VideocamIcon />}
          >
            Iniciar Gravação
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '2002')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<VideocamOffIcon />}
          >
            Parar Gravação
          </Button>
        </Box>
        <Box
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            onClick={() => props.sendCommand(props.topic, '2003')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<VideocamIcon />}
          >
            Ligar e Iniciar Gravação
          </Button>
          <Button
            onClick={() => props.sendCommand(props.topic, '2004')}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<VideocamOffIcon />}
          >
            Parar Gravação e Desligar
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

export default CameraControl
