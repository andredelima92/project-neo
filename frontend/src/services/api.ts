/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance } from 'axios'
import * as https from 'https'
import { parseCookies } from 'nookies'

export function getOldApiClient(ctx?: any): AxiosInstance {
  const oldApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_OLD,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  const { cefis_studios_auth: cefisStudiosAuth } = parseCookies(ctx)
  if (cefisStudiosAuth) {
    oldApi.defaults.headers.Authorization = cefisStudiosAuth
  }

  return oldApi
}

export function getNewApiClient(ctx?: any): AxiosInstance {
  const newApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_NEW,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

  const { cefis_studios_auth: cefisStudiosAuth } = parseCookies(ctx)
  if (cefisStudiosAuth) {
    newApi.defaults.headers.Authorization = cefisStudiosAuth
  }

  return newApi
}
