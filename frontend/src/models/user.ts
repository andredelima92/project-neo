/* eslint-disable camelcase */
export default interface User {
  id: number
  name: string
  first_name: string
  email: string
  token: string
  avatar: string
  is_admin: boolean
  is_premium: boolean
  is_demo_subscriber: boolean
  is_teacher: boolean
  is_team_admin: boolean
  teacher_module_enabled: boolean
}
