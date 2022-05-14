import React from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Home() {

  const [token] = useLocalStorage('token')
  const add = async () => {
    const res = await axios({
      method: 'post',
      url: '/eepost/add',
      headers:{
        token: token
      },
      data: {
        entry_id: 'entry -01',
        entry_title: 'asdas',
        content: 'content',
        // user_id: 'user00',
        user_name: 'user'
      }
    })
    console.log(res);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={add}>add</button>
    </div>
  )
}
