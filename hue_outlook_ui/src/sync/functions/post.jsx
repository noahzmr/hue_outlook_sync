import axios from 'axios'

export const CreateSync = (value) => {
  console.log(value)
  return new Promise((resolve, reject) => {
    axios
      .post(`https://demo.noerkelit.online:3000/sync`, value, {
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
