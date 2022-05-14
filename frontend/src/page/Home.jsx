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

  const addComment = async () => {
    const res = await axios({
      method: 'post',
      url: '/comment/add',
      headers:{
        token: token
      },
      data: {
        comment: "a new comment",
        post_id: "627f5b4858f99170618e5f73",
        user_name: "user01"
    }
    })
    console.log(res);
  }

  const reply = async () => {
    const res = await axios({
      method: 'post',
      url: '/comment/reply',
      headers:{
        token: token
      },
      data: {
        comment: "a new reply",
        post_id: "627f5b4858f99170618e5f73",
        user_name: "user01",
        replied_id: "627f5b5c58f99170618e5f76",
        to_user_name: "user01"
    }
    })
    console.log(res);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={add}>add</button>
      <button onClick={addComment}>addcomment</button>
      <button onClick={reply}>reply</button>
    </div>
  )
}
