import React, { useEffect,useState } from 'react'
import { defaultPath } from '../App'

const getClients = async() => {
  const data = await fetch(`${defaultPath}clients`)

  return data.json()
}
const addClient = async(studentData,func) => {
  try {
    const response = await fetch(`${defaultPath}clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to add clients');
    

    const data = await response.json();
    console.log('clients added:', data);
    func()
  } catch (error) {
    console.error('Error:', error);
  }
}
const deleteClient = async(id,func) => {
  await fetch(`${defaultPath}clients/${id}`,{method:"DELETE"})
  func()
}
const Clients = () => {
  const [data,setData] = useState([])
  const [modalOpen,setModalOpen] = useState(false)
  const [token,setToken] = useState('')

  async function refresh() {
    getClients().then((res) => {
      setData(res)
    })
  }

  useEffect(()=>{
    refresh()
  },[])

  return (
    <div className='comp_wrap' onClick={()=>setModalOpen(false)}>
      <button className='button' onClick={(e)=>{ e.stopPropagation();setModalOpen(!modalOpen)}}>Добавить</button>
      <dialog open={modalOpen}>
        <div className='modal_wrap' onClick={(e)=> e.stopPropagation()}>
        <input type="text" placeholder="Имя клиента "value={token} onChange={(e)=>setToken(e.target.value)}/>
        <button onClick={()=>{addClient({name:token},refresh)}} className='button'>Сохранить</button>
        </div>
      </dialog>
      <div className='table_wrap'>
        {data.map((item) => (
         <div className='table_item_wrap'>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <button className='button-del' onClick={()=>{deleteClient(item.id,refresh)}}>Удалить</button>
         </div> 
        ))}
      </div>
    </div>
  )
}

export default Clients
