import { User } from './models/user'

const ironSessionOptions = {
  cookieName: 'spotify-clone-session',
  password: process.env.SESSION_KEY as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    user: User
  }
}

export default ironSessionOptions
