import axios from 'axios'

export const GetSync = (value) => {
  console.log(value)
  return new Promise((resolve, reject) => {
    axios
      .get(`https://demo.noerkelit.online:3000/sync`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Create Sync', response.data)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const RunSync = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://demo.noerkelit.online:3000/sync/sync`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Create Sync', response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
