import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Group from './group'
function HueSync(props) {
  HueSync.propTypes = {
    outlookSearchValue: PropTypes.string.isRequired,
    outlookCondition: PropTypes.string.isRequired,
    syncName: PropTypes.string.isRequired
  }
  const [outlookSearchValue, setOutlookSearchValue] = useState()
  const [outlookCondition, setOutlookCondition] = useState()
  const [syncName, setSyncName] = useState()
  const [searchValue, setSearchValue] = useState('group')

  useEffect(() => {
    if (outlookCondition !== props.outlookCondition) {
      setOutlookCondition(props.outlookCondition)
    }
    if (outlookSearchValue !== props.outlookSearchValue) {
      setOutlookSearchValue(props.outlookSearchValue)
    }
    if (syncName !== props.syncName) {
      setSyncName(props.syncName)
    }
  }, [props])

  return (
    <div id="creatSyncScene" className="lamps">
      <h1>Hue Options:</h1>
      <div id="values">
        <Group
          outlookSearchValue={outlookSearchValue}
          outlookCondition={outlookCondition}
          syncName={syncName}
          hueSearchValue={searchValue}
        />
      </div>
    </div>
  )
}

export default HueSync
