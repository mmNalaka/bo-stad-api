export const creteFutureDateTime = (seconds: number) => {
  const currentTimeStamp = Math.floor(Date.now() / 1000)
  const timeStamp = currentTimeStamp + seconds

  return new Date(timeStamp * 1000)
}
