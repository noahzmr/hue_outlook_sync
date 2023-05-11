import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { SelectItem } from '../icons/index'
import { ChangeBrightness } from '../functions/lamp/brigthness'
import { ChangeColor, XyToRGB } from '../functions/lamp/color'

export default function Lamp(props) {
  Lamp.propTypes = {
    lamp: PropTypes.any.isRequired
  }
  const [on, setOn] = useState(props.lamp.item.state.on)
  const [lamp, setLamp] = useState(props.lamp)
  const [color, setColor] = useState()
  const [brightness, setBrightness] = useState()
  const [brightnessProzent, setBrightnessProzent] = useState()
  const [saturateProzent, setSaturateProzent] = useState()
  const [saturate, setSaturate] = useState()
  const [id, setId] = useState()

  const calculatePercentage = (value, total) => {
    console.log('lamps: ', Math.floor((value / total) * 100) + '%')
    return Math.floor((value / total) * 100) + '%'
  }

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

  const getColor = async () => {
    let val = await XyToRGB(props.lamp.item.state.xy)
    setColor(val)
  }

  const HandleChange = (value) => {
    setBrightness(value)
    ChangeBrightness(id, value)
  }

  useEffect(() => {
    if (props.lamp !== lamp) {
      setLamp(props.lamp)
    }
    if (props.lamp.item.state.on !== on) {
      setOn(props.lamp.item.state.on)
    }
    getColor()
    setBrightnessProzent(calculatePercentage(props.lamp.item.state.bri, '254'))
    setSaturateProzent(calculatePercentage(props.lamp.item.state.sat, '254'))
    setBrightness(props.lamp.item.state.bri)
    setSaturate(props.lamp.item.state.sat)
    setId(props.lamp.apiUrl)
  }, [props])

  return (
    <div className="contianer" id={lamp.apiUrl}>
      <div className="header">
        <div
          onClick={() => {
            console.log(brightnessProzent, saturateProzent, brightness, saturate)
          }}>
          <div
            style={{
              background: color,
              borderRadius: '50%',
              padding: '1em'
              // filter: `brightness(${brightnessProzent}) saturate(${saturateProzent})`
            }}>
            {SelectItem(lamp.item.productname)}
          </div>
        </div>
      </div>

      <div className="body">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            alignItems: 'center'
          }}>
          <h3 className="name">{lamp.item.name}</h3>
          {lamp.item.productname}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          <label className="switch">
            <input
              id={`lamp_${lamp.apiUrl}`}
              value={on}
              defaultChecked={on}
              type="checkbox"
              onChange={() => {
                onOff(lamp.apiUrl)
              }}
            />
            <span className="slider round"></span>
          </label>
          <div className="color">
            <input
              onChange={(e) => ChangeColor(id, e.target.value)}
              value={color}
              type="color"
              id="color"
            />
          </div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            value={brightness}
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
                {calculatePercentage(brightness, '254')}
                <span></span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
