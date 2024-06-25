import React from 'react'
import Message from './Message'

const Messages = () => {
  return (
    <div className='messages py-3 px-2 d-flex flex-column gap-3 overflow-auto h-80'>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages
