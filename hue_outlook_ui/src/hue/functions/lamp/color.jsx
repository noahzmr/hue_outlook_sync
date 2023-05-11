import axios from 'axios'

export const hexToRgb = (hex) => {
  // Remove '#' symbol (if it exists)
  hex = hex.replace('#', '')

  // Convert hex string to integer values
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  return [r, g, b]
}

export const hexToXy = async (hex) => {
  console.log('HEX', hexToRgb(hex))
  // Apply RGB to XY conversion formula
  let X = hexToRgb(hex)[0] * 0.649926 + hexToRgb(hex)[1] * 0.103455 + hexToRgb(hex)[2] * 0.197109
  let Y = hexToRgb(hex)[0] * 0.234327 + hexToRgb(hex)[1] * 0.743075 + hexToRgb(hex)[2] * 0.022598
  let Z = hexToRgb(hex)[0] * 0.0 + hexToRgb(hex)[1] * 0.053077 + hexToRgb(hex)[2] * 1.035763
  console.log('XYZ', X, Y, Z)
  let x = X / (X + Y + Z)
  let y = Y / (X + Y + Z)
  console.log('xy', x, y)
  return [x, y]
}

export const ChangeColor = async (id, color) => {
  console.log('PUT Values: ', color, await hexToXy(color))
  axios
    .put(`https://demo.noerkelit.online:3000/hue/lamp/${id}/color`, await hexToXy(color), {
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

export const XyToRGB = async (value) => {
  let x = value[0]
  let y = value[1]
  console.log(x, y)
  // Apply XY to XYZ conversion formula
  const Y = 1
  const X = (Y / y) * x
  const Z = (Y / y) * (1 - x - y)

  // Apply XYZ to RGB conversion formula
  let r = X * 1.612 - Y * 0.203 - Z * 0.302
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066
  let b = X * 0.026 - Y * 0.072 + Z * 0.962

  // Normalize RGB values
  if (r > b && r > g && r > 1) {
    g /= r
    b /= r
    r = 1
  } else if (g > b && g > r && g > 1) {
    r /= g
    b /= g
    g = 1
  } else if (b > r && b > g && b > 1) {
    r /= b
    g /= b
    b = 1
  }

  // Convert normalized RGB values to hex
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')

  return '#' + hex
}
