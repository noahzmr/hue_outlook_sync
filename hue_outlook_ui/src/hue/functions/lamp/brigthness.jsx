import axios from 'axios'

export const ChangeBrightness = async (id, value) => {
  console.log('Brigthness', value)
  const send = {
    bri: value
  }
  axios
    .put(`https://demo.noerkelit.online:3000/hue/lamp/${id}/brigthness`, send, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('key')}`
      }
    })
    .then((response) => {
      console.log('Change Hue', response)
    })
    .catch((err) => {
      console.log(err)
    })
}
