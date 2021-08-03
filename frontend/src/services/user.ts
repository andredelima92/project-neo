import { getOldApiClient } from './api'

import User from '../models/user'

export class UserService {
  public static get(): Promise<User | null> {
    return getOldApiClient()
      .get('/api/v1/user/me')
      .then(response => {
        const user = response.data.data

        return user
      })
      .catch(() => {
        return null
      })
  }
}
