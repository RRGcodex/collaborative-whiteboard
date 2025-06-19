import React, { useState } from 'react'

const JoinRoom = ({onJoin}) => {
    const [roomInput, setRoomInput] = useState('');

    const handleClick = () => {
        if(roomInput.trim()){
            onJoin(roomInput.trim());
        }
    }
  return (
    <div className='flex gap-2 mb-4'>
      <input 
      value={roomInput}
      onChange={(e)=>setRoomInput(e.target.value)}
      type="text" />
      <button onClick={handleClick}>Join</button>
      
          </div>
  )
}

export default JoinRoom
