import React, { useContext } from 'react'
import HomeHue from './hue'
import HomeOutlook from './outlook'
import HomeSyncer from './syncer'
import Config from './config'
import { KeycloakContext } from '../keycloak/keycloak'

export default function Home() {
  const profile = useContext(KeycloakContext)
  const kc = useContext(KeycloakContext)
  const realmAccess = kc.keycloak.realmAccess.roles

  return (
    <div className="home">
      <div className="welcome">
        <h3>
          Hello {profile.profile.firstName} {profile.profile.lastName} !
        </h3>
      </div>
      {realmAccess.includes('hue_outlook_sync') &&
      !realmAccess.includes('hue_outlook_sync_admin') ? (
        <>
          <HomeOutlook />
          <HomeHue />
          <HomeSyncer />
        </>
      ) : realmAccess.includes('hue_outlook_sync_admin') &&
        !realmAccess.includes('hue_outlook_sync') ? (
        <Config />
      ) : realmAccess.includes('hue_outlook_sync_admin') &&
        realmAccess.includes('hue_outlook_sync') ? (
        <>
          <HomeOutlook />
          <HomeHue />
          <HomeSyncer />
          <Config />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
