import axios from 'axios'
import SetValues from '../creatArray'

export const GetGroups = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://demo.noerkelit.online:3000/hue/groups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Groups', response.data)
        SetValues(response)
          .then((value) => {
            resolve(value)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const GetLamps = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://demo.noerkelit.online:3000/hue/lamps', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Lamps', response.data)
        SetValues(response)
          .then((value) => {
            resolve(value)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const GetLamp = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://demo.noerkelit.online:3000/hue/lamp/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Lamps', response.data)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetRules = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://demo.noerkelit.online:3000/hue/rules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Config', response.data)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetScenes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://demo.noerkelit.online:3000/hue/scenes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Scenes', response.data)
        SetValues(response).then((value) => {
          resolve(value)
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetSensors = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://demo.noerkelit.online:3000/hue/sensors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get sensors', response.data)
        SetValues(response).then((value) => {
          resolve(value)
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
