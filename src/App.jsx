import { useState } from 'react'
import './App.css'
import { v4 as uuid } from 'uuid';
function App() {
const [users, setusers] = useState([])
const [buttonState, setbuttonState] = useState('add')
const [userInfo, setuserInfo] = useState({
  id:uuid(),
  name:'',
  age:'',
  email:'',
  phone:"",
})
const handleChange=(e)=>{
  const {name,value}=e.target
  setuserInfo( (currInfo) =>{
    return {
    ...currInfo,[name]:value} 
    })
}
const addData=()=>{
    setusers((currUsers)=>[...currUsers,userInfo])
    console.log(users);
    
    setuserInfo({
      id:uuid(),
      name:'',
      age:'',
      email:'',
      phone:"",
    })
}
const deleteData=(id)=>{
console.log('working');

  setusers((currUsers)=>{
    return currUsers.filter((user)=>{
      return user.id !== id
    })
  })
}
const editingData =(user)=>{
  setuserInfo(user)
  setbuttonState('edit')
}
const cancelEditing=()=>{
  setuserInfo({
    id:uuid(),
    name:'',
    age:'',
    email:'',
    phone:"",
  })
  setbuttonState('add')

}
const updateData=()=>{
  setusers((currUsers)=>{
    return currUsers.map((user)=>{
      if(user.id===userInfo.id){
        return userInfo
      }
      return users
    })
  })
  cancelEditing()
}
  return (
  <div className='flex flex-col items-center justify-center'>
    <div className='input' >
      <input type="text" placeholder='Name' name='name' value={userInfo.name} required onChange={handleChange} /> 
      <input type="age" placeholder='Age'name='age'value={userInfo.age} required onChange={handleChange}/>
      <input type="email" placeholder='Email' name='email'value={userInfo.email} required onChange={handleChange}/>
      <input type="number" placeholder='Mobile no' name='phone'value={userInfo.phone} required onChange={handleChange}/>
      {buttonState==="add"?<button className='px-4 py-2 bg-orange-400 rounded' onClick={addData}>Add</button>:
      <div className='space-x-2'>
        <button className='px-4 py-2 bg-green-400 rounded' onClick={updateData}>update</button>
        <button className='px-4 py-2 bg-gray-300 rounded' onClick={cancelEditing}>Cancel</button>
      </div>
      }
      
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>email</th>
            <th>phone no</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user,index)=>{
          return(
          <tr key={index}>
            <td>{user.name}</td> 
            <td>{user.age}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td className='buttons'>
              <button onClick={()=>editingData(user)}>Edit</button>
              <button onClick={()=>deleteData(user.id)}>Delete</button>
            </td>
          </tr>)
        })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default App
