import React, { useContext, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import useWebSocket from 'react-use-websocket'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../contexts/auth'
import Studio from '../models/studio'
import SliderControl from '../components/sliderControl'
import GirocamControl from '../components/girocamControl'
import mapsIcon from '../assets/maps-icon.png'
import logoNew from '../assets/logo-new.png'
import CameraControl from '../components/cameraControl'
import useInterval from '../utils/useInterval'
import RelayControl from '../components/relayControl'
import api from '../services/nodeAPI'

interface Item {
  id: string
  name: string
  switched: boolean
  date_turn_off: Date | null | string
  date_turn_on: Date | null | string
}

const useStyles = makeStyles(() =>
  createStyles({
    containerStudio: {
      alignItems: 'center',
      margin: '30px 0',
      display: 'flex',
      '& > img': {
        marginRight: 20
      }
    },
    studioFormControl: {
      display: 'flex',
      flexGrow: 1
    },
    studioSelectRoot: {
      display: 'flex',
      alignItems: 'center'
    },
    studioLogoMenuItem: {
      height: 25,
      marginRight: 15
    }
  })
)

enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3
}

const studios: Studio[] = [
  {
    id: 1,
    name: 'Goiânia',
    sliderTopic: 'mxg_slid_3',
    girocamTopic: 'mxg_grua_1',
    girocamCeilingTopic: 'mxg_grua_4',
    cameraCtrlTopic: null,
    relayTopic: null
  },
  {
    id: 2,
    name: 'São Paulo',
    sliderTopic: 'mxg_slid_2',
    girocamTopic: 'mxg_grua_2',
    girocamCeilingTopic: 'mxg_grua_3',
    cameraCtrlTopic: null,
    relayTopic: null
  },
  {
    id: 3,
    name: 'São Carlos',
    sliderTopic: 'mxg_slid_1',
    girocamTopic: 'mxg_grua_5',
    girocamCeilingTopic: null,
    cameraCtrlTopic: 'cefis_camctrl_1',
    relayTopic: 'cefis_relay_1'
  }
]

interface HomeRequest {
  items: Item[]
}

const Home: NextPage<HomeRequest> = ({ items }) => {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

  const { sendJsonMessage, readyState } = useWebSocket(
    'wss://hardware.cefis.com.br',
    {
      // Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: () => true
    }
  )

  useInterval(
    () => {
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({ ping: true })
      }
    },
    // Delay in milliseconds or null to stop it
    20 * 1000
  )

  const [selectedStudio, setSelectedStudio] = useState<Studio>(studios[0])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStudio(studios.find(item => item.id === event.target.value))
  }

  const sendCommand = (topic: string, command: string) => {
    console.info(`Sending command ${command} on topic ${topic}.`)
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        topic: topic,
        command: command + '.'
      })
    }
  }

  const updateItem = async (item: Item) => {
    try {
      await api.patch('items', { ...item })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <title>CEFIS - Estúdios Autônomos</title>
      </Head>

      <Container maxWidth={'lg'}>
        <div className={classes.containerStudio}>
          <img height={40} src={mapsIcon} />
          <FormControl variant="filled" className={classes.studioFormControl}>
            <InputLabel id="studio-id">Estúdio</InputLabel>
            <Select
              labelId="studio-id"
              value={selectedStudio.id}
              onChange={handleChange}
              classes={{ root: classes.studioSelectRoot }}
            >
              {studios.map((studio, index) => (
                <MenuItem value={studio.id} key={index}>
                  <img className={classes.studioLogoMenuItem} src={logoNew} />
                  {studio.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={1}>
          {!!selectedStudio.sliderTopic && (
            <Grid container item md={6} xs={12}>
              <SliderControl
                name="Slider Frontal"
                topic={selectedStudio.sliderTopic}
                sendCommand={sendCommand}
              />
            </Grid>
          )}
          {!!selectedStudio.girocamTopic && (
            <Grid container item md={6} xs={12}>
              <GirocamControl
                name="Girocam Frontal"
                topic={selectedStudio.girocamTopic}
                sendCommand={sendCommand}
              />
            </Grid>
          )}
          {!!selectedStudio.girocamCeilingTopic && (
            <Grid container item md={6} xs={12}>
              <GirocamControl
                name="Girocam Superior"
                topic={selectedStudio.girocamCeilingTopic}
                sendCommand={sendCommand}
              />
            </Grid>
          )}
          {!!selectedStudio.cameraCtrlTopic && (
            <Grid container item md={6} xs={12}>
              <CameraControl
                name="Câmera Frontal"
                topic={selectedStudio.cameraCtrlTopic}
                sendCommand={sendCommand}
              />
            </Grid>
          )}
          {!!selectedStudio.relayTopic && (
            <>
              {items.map(item => (
                <Grid
                  key={item.id}
                  container
                  item
                  md={6}
                  xs={12}
                  alignItems="flex-start"
                >
                  <RelayControl
                    {...{
                      item,
                      updateItem
                    }}
                    topic={selectedStudio.relayTopic}
                    sendCommand={sendCommand}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data } = await api.get('items')

  return {
    props: {
      items: data
    }
  }
}

export default Home
