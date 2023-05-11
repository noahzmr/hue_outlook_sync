import { GroupContext, LampsContext } from './context'
import { useContext } from 'react'

export const GetGroupName = (value) => {
  // eslint-disable-next-line no-unused-vars
  const [groups, setGroups] = useContext(GroupContext)
  return groups?.filter((item) => {
    return item.apiUrl?.toLowerCase().includes(value?.toLowerCase())
  })
}

export const GetLampName = (value) => {
  // eslint-disable-next-line no-unused-vars
  const [lamp, setLamp] = useContext(LampsContext)
  let lamps = []

  new Promise((resolve, reject) => {
    value.forEach((ele) => {
      lamp?.filter((item) => {
        console.log('value LAMP: ', item.apiUrl, ele, item.apiUrl === ele)
        item.apiUrl === ele ? lamps.push(item) : console.log('value Not ;Match')
      })
    })
  }).then(() => {
    console.log(lamps)
    return lamps
  })
}
