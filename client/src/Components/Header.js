import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
export default function Header(props) {
  return (
    <div className='header'>
       <h1>{props.heading}</h1>
       <Link to={props.button_link} className='link'>{props.button_name}</Link>
    </div>
  )
}
