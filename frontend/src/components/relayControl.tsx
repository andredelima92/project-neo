import {
  Button,
  createStyles,
  makeStyles,
  Typography,
  TextField
} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Theme } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import LoopIcon from '@material-ui/icons/Loop'
import React, { ChangeEvent, useState } from 'react'
import { format, parseISO } from 'date-fns'
import moment from 'moment'

import relayImg from '../assets/studio-relay.png'

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
    },
    dateField: {
      width: 230
    }
  })
)

interface Item {
  id: string
  name: string
  switched: boolean
  date_turn_off: Date | null | string
  date_turn_on: Date | null | string
}

interface Props {
  item: Item
  topic: string
  sendCommand(topic: string, command: string): void
  updateItem(item: Item): void
}

const RelayControl: React.FC<Props> = props => {
  const classes = useStyles()
  const [item, setItem] = useState(props.item)

  const switchOn = () => {
    const newItem = { ...item, switched: true }
    setItem(newItem)
    props.updateItem(newItem)
  }

  const switchOff = () => {
    const newItem = { ...item, switched: false }
    setItem(newItem)
    props.updateItem(newItem)
  }

  const switchToogle = () => {
    const newItem = { ...item, switched: !item.switched }
    setItem(newItem)
    props.updateItem(newItem)
  }

  const changeTurnOn = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return

    const dateTurnOn = e.target.value

    const newItem = {
      ...item,
      date_turn_on: moment(parseISO(dateTurnOn)).format('YYYY-MM-DDTHH:mm')
    }

    setItem(newItem)
    props.updateItem(newItem)
  }

  const changeTurnOff = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return

    const dateTurnOff = e.target.value

    const newItem = {
      ...item,
      date_turn_off: moment(parseISO(dateTurnOff)).format('YYYY-MM-DDTHH:mm')
    }

    setItem(newItem)
    props.updateItem(newItem)
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
        <img className={classes.imgDevice} src={relayImg} />
        <Typography variant="h5">{item.name}</Typography>
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
        <Typography>Ligar/Desligar - {item.switched ? 'ON' : 'OFF'}</Typography>
        <Box
          mt={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            onClick={switchOn}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<PowerSettingsNewIcon />}
          >
            Ligar
          </Button>

          <Button
            onClick={switchOff}
            variant="contained"
            color="primary"
            className={classes.controlButton}
            startIcon={<PowerSettingsNewIcon />}
          >
            Desligar
          </Button>
          <Button
            onClick={switchToogle}
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
      <Grid
        container
        item
        xs={12}
        justifyContent="space-around"
        className={classes.controlContainer}
      >
        <TextField
          label="Agendamento para ligar"
          type="datetime-local"
          className={classes.dateField}
          onChange={changeTurnOn}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          label="Agendamento para desligar"
          type="datetime-local"
          className={classes.dateField}
          onChange={changeTurnOff}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
    </Grid>
  )
}

export default RelayControl
