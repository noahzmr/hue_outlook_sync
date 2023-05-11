import React, { useContext, useMemo } from 'react'
import HueHeader from '../hue/header'
import { QueryContext } from '../hue/functions/context'
import { SyncContext } from './functions/context'
import { Outlet, useNavigate } from 'react-router-dom'
import Sync from './syncs'
import { RunSync } from './functions/get'

function Syncer() {
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate()
  const [query, setQuery] = useContext(QueryContext)
  const [syncs, setSyncs] = useContext(SyncContext)
  /* eslint-enable no-unused-vars */
  const filterdSyncs = useMemo(() => {
    return syncs?.filter((item) => {
      return (
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.hue.condition?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [syncs, query])

  return (
    <div>
      <HueHeader />
      <div>
        <button
          onClick={() => {
            navigate('/ui/syncer/create')
          }}>
          Create
        </button>
        <button
          onClick={() => {
            RunSync()
          }}>
          Sync
        </button>
        {filterdSyncs ? (
          <div>
            <h3>Your Syncs</h3>
            {filterdSyncs.map((item, index) => {
              return <Sync key={index} sync={item} />
            })}
          </div>
        ) : (
          <div>
            <h1>You have no Syncs!</h1>
            <h3>Create one!</h3>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Syncer
