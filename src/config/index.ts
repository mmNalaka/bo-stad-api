interface Config {
  accessTokenExpiryDuration: number
  refreshTokenExpiryDuration: number
  accessTokenSecret: string
  refreshTokenSecret: string

  defaultLocale: string
  defaultTimeZone: string
  defaultIp: string
}

export const config: Config = {
  accessTokenExpiryDuration: 60 * 10,
  refreshTokenExpiryDuration: 60 * 60 * 24 * 30,
  accessTokenSecret:
    process.env.ACCESS_JWT || '#qAQ7@?w=Bgx5]sDO41wLAT%l+wN25xC',
  refreshTokenSecret:
    process.env.REFRESH_JWT || '0QOPX{{c8Rh0In?56d1mAhctzo+@+kM',

  defaultLocale: 'sv-SE',
  defaultTimeZone: 'UTC+2',
  defaultIp: '46.236.69.116',
}
