import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectItem } from '../icons/index'
import { GetLamp } from '../functions/load/get'
import { ChangeColor, XyToRGB } from '../functions/lamp/color'
import { ChangeBrightness } from '../functions/lamp/brigthness'

export default function LampDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [on, setOn] = useState()
  const [lamp, setLamp] = useState()
  const [rangePercent, setRangePercent] = useState(1)
  const [color, setColor] = useState()

  const onOff = (id) => {
    axios
      .get(`https://demo.noerkelit.online:3000/hue/${id}/on/${!on}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Get Lamps', response)
        setOn(!on)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const calculatePercentage = (value, total) => {
    return Math.floor((value / total) * 100) + '%'
  }

  const HandleChange = (value) => {
    setRangePercent(value)
    ChangeBrightness(id, value)
  }

  useEffect(() => {
    GetLamp(id)
      .then(async (response) => {
        setLamp(response)
        setOn(response.state.on)
        setRangePercent(response.state.bri)
        console.log('Lamp: ', response)
        console.log(await XyToRGB(response.state.xy))
        setColor(await XyToRGB(response.state.xy))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <div className="detailBackground" id={id}>
      <div className="detailContainer" id={id}>
        <div
          id="close"
          onClick={() => {
            navigate('/ui/hue/lamps')
          }}>
          {SelectItem('UicontrolsLastState')}
        </div>
        <div id="name">
          <div>
            <label className="switch">
              <input
                id={`lamp_${id}`}
                value={on}
                defaultChecked={on}
                type="checkbox"
                onChange={() => {
                  onOff(id)
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <h1 className="name">{lamp?.name}</h1>
            <h3> {lamp?.productname}</h3>
          </div>
        </div>
        <div id="icon">{SelectItem(lamp?.productname)}</div>

        <div id="color">
          <div className="slider-container">
            <input
              type="range"
              value={rangePercent}
              onChange={(e) => {
                HandleChange(e.target.value)
              }}
              className="range-slider"
              min="1"
              max="254"
            />
            <div id="h4-container">
              <div id="h4-subcontainer">
                <h4>
                  {calculatePercentage(rangePercent, '254')}
                  <span></span>
                </h4>
              </div>
            </div>
          </div>
          <input onChange={(e) => ChangeColor(id, e.target.value)} value={color} type="color" />
        </div>
      </div>
    </div>
  )
}
