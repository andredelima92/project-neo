import { getOldApiClient } from './api'
import User from '../models/user'
import { UserService } from './user'

interface LoginResponse {
  user: User
  key: string
}

export class AuthService {
  public static async login(
    email: string,
    pass: string
  ): Promise<LoginResponse | null> {
    return getOldApiClient()
      .post('/api/v1/login', {
        email: email,
        pass: pass
      })
      .then(response => {
        const user = response.data.data.user
        const key = response.data.data.key

        return {
          user: user,
          key: key
        }
      })
      .catch(error => {
        if (error?.response?.data?.error?.message) {
          throw new Error(error?.response?.data?.error?.message)
        } else {
          throw new Error('Houve um erro inesperado.')
        }
      })
  }

  public static async getUser(): Promise<User> {
    const user = await UserService.get()

    return user
  }
}
