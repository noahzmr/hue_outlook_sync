import React, { useContext } from 'react'
import Logo from '../assets/logo-color.png'
import { useNavigate } from 'react-router-dom'
import { KeycloakContext } from '../keycloak/keycloak'

export default function Header() {
  const navigate = useNavigate()
  const kc = useContext(KeycloakContext)
  const realmAccess = kc.keycloak.realmAccess.roles
  return (
    <header>
      <img
        onClick={() => {
          navigate('/')
        }}
        src={Logo}
        alt="Logo"
      />
      {realmAccess.includes('hue_outlook_sync') &&
      !realmAccess.includes('hue_outlook_sync_admin') ? (
        <nav>
          <ul>
            <li
              onClick={() => {
                navigate('/ui/calendar')
              }}>
              Outlook
            </li>
            <li
              onClick={() => {
                navigate('/ui/hue')
              }}>
              Hue
            </li>
            <li
              onClick={() => {
                navigate('/ui/syncer')
              }}>
              Syncer
            </li>
          </ul>
        </nav>
      ) : realmAccess.includes('hue_outlook_sync_admin') &&
        !realmAccess.includes('hue_outlook_sync') ? (
        <nav>
          <ul>
            <li
              onClick={() => {
                navigate('/ui/config')
              }}>
              Config
            </li>
          </ul>
        </nav>
      ) : realmAccess.includes('hue_outlook_sync_admin') &&
        realmAccess.includes('hue_outlook_sync') ? (
        <nav>
          <ul>
            <li
              onClick={() => {
                navigate('/ui/calendar')
              }}>
              Outlook
            </li>
            <li
              onClick={() => {
                navigate('/ui/hue')
              }}>
              Hue
            </li>
            <li
              onClick={() => {
                navigate('/ui/syncer')
              }}>
              Syncer
            </li>
            <li
              onClick={() => {
                navigate('/ui/config')
              }}>
              Config
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}

      <div className="search-container">
        <div className="box">
          <form name="search">
            <input
              type="serach"
              className="input"
              name="txt"
              placeholder="Search..."
              onChange={(e) => {
                // setQuery(e.target.value)
              }}
            />
          </form>
          <i className="bi bi-search"></i>
        </div>
      </div>
    </header>
  )
}
