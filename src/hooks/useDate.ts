function useDate(createdAt: number) {
  const setDate = () => {
    const min = 1000 * 60
    const hour = min * 60
    const currentDate = Date.now()
    const createdDate = new Date(createdAt)
    const diff = currentDate - createdAt
    let _date = ""

    if (diff < hour) {
      const _min = `${Math.floor(diff / min)}min ago`
      _date = _min
    } else if (diff >= hour && diff <= hour * 12) {
      const _hour = `${Math.floor(diff / hour)}h ago`
      _date = _hour
    } else if (diff > hour * 12 && diff < hour * 24) {
      _date = "Today"
    } else if (diff >= hour * 24 && diff <= hour * 48) {
      _date = "Yestaday"
    } else {
      _date = createdDate.toDateString()
    }

    return _date
  }

  const setTime = () => {
    const createdDate = new Date(createdAt)
    const time = `${createdDate.getHours()}:${createdDate.getMinutes()}`
    return time
  }

  return { setDate, setTime }
}

export default useDate
