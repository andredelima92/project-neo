import React, { useContext, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { AuthContext } from '../contexts/auth'
import Head from 'next/head'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Controller, useForm } from 'react-hook-form'
import appbarLogo from '../assets/appbar-logo.svg'
import { Container as ContainerPage, Background } from '../styles/pages/Login'
import { parseCookies } from 'nookies'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoContainer: {
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

interface IFormInput {
  email: string
  password: string
}

interface PageProps {
  host: string
}

const Home: NextPage<PageProps> = props => {
  const classes = useStyles()
  const { user, signIn } = useContext(AuthContext)
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    try {
      await signIn({ email: data.email, pass: data.password })
    } catch (error) {
      setLoginError(error.message)
    }
  }

  return (
    <ContainerPage>
      <Background />
      <Head>
        <title>CEFIS - Estúdios Autônomos - Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.logoContainer}>
            <img src={appbarLogo} alt="logo" />
            <Typography component="h5" align="center">
              Estúdios Autônomos
            </Typography>
          </div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entre com sua conta CEFIS
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              rules={{
                required: 'Por favor, insira seu email.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido.'
                }
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  variant="filled"
                  margin="normal"
                  helperText={errors.email ? errors.email.message : null}
                  error={!!errors.email}
                />
              )}
            />
            <Controller
              name="password"
              rules={{ required: 'Por favor, insira sua senha.' }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Senha"
                  variant="filled"
                  margin="normal"
                  helperText={errors.password ? errors.password.message : null}
                  error={!!errors.password}
                />
              )}
            />
            {!!loginError && (
              <Typography color="error" component="p">
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              color="secondary"
              className={classes.submit}
              variant="contained"
            >
              ENTRAR
            </Button>
          </form>
        </div>
      </Container>
    </ContainerPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { cefis_studios_auth: cefisStudiosAuth } = parseCookies(ctx)
  if (cefisStudiosAuth) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
