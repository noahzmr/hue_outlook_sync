import axios from 'axios'

const Evnets = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://demo.noerkelit.online:3000/calendar/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`,
          Outlook: localStorage.getItem('outlook')
        }
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response.data.accessToken)
        }
        console.log('Get events', response.data)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetEvents = (email) => {
  return new Promise((resolve, reject) => {
    Evnets(email)
      .then((events) => {
        console.log('Events', events)
        resolve(events)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
