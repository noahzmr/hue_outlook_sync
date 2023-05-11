export default function SetValues(response) {
  let value = []
  return new Promise((resolve, reject) => {
    Object.values(response.data).forEach((item, index) => {
      const key = Object.keys(response.data)[index]
      value.push({ apiUrl: key, item })
    })
    resolve(value)
  })
}
