import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from 'axios';


type StateType = {
  id: number
  name: string
  baned: boolean
}

function App() {
  let [users, setUsers] = useState<StateType[]>([])
  const userNameRef = useRef<HTMLInputElement>(null)

  const getUsers = () => {
    axios.get<StateType[]>('http://localhost:8080/users').then(res => {
      setUsers(res.data)
    })

  }


  const addUser = () => {
    axios.post('http://localhost:8080/users',{name:userNameRef.current!.value})
    .then(() => {
      getUsers()
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <input ref={userNameRef}/>
      <div>
        <button onClick={addUser}>+User</button>
      </div>
      {users.map(u => <div key={u.id}>{u.name}</div>)}
    </div>
  );
}

export default App;
