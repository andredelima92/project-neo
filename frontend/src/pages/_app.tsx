import React, { useEffect, useState } from 'react'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { NextComponentType } from 'next'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import GlobalStyle from '../styles/global'
import defaultTheme from '../styles/theme'
import { CssBaseline } from '@material-ui/core'
import '@fontsource/material-icons'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import TagManager from 'react-gtm-module'

import { AuthProvider } from '../contexts/auth'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    TagManager.initialize({ gtmId: 'GTM-P3HFHL' })
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <AuthProvider>
          <Component {...pageProps} changeTheme={setTheme} />
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

// MyApp.getInitialProps = async appContext => ({
//   ...(await App.getInitialProps(appContext))
// })

export default MyApp
