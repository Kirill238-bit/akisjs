import React, { useEffect,useState } from 'react'
import { defaultPath } from '../App'

export const getWarehouses = async() => {
  const data = await fetch(`${defaultPath}warehouses`)

  return data.json()
}
const addWarehouses = async(studentData,func) => {
  try {
    const response = await fetch(`${defaultPath}warehouses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to add warehouses');
    

    const data = await response.json();
    console.log('warehouses added:', data);
    func()
  } catch (error) {
    console.error('Error:', error);
  }
}
const deleteWarehouses = async(id,func) => {
  await fetch(`${defaultPath}warehouses/${id}`,{method:"DELETE"})
  func()
}
const Warehouses = () => {
          const [data,setData] = useState([])
          const [modalOpen,setModalOpen] = useState(false)
          const [token,setToken] = useState('')
          async function refresh() {
            getWarehouses().then((res) => {
              setData(res)
            })
          }
          useEffect(()=>{
            getWarehouses().then((res) => {
              setData(res)
            })
          },[])
        
          return (
            <div className='comp_wrap' onClick={()=>setModalOpen(false)}>
            <button className='button' onClick={(e)=>{ e.stopPropagation();setModalOpen(!modalOpen)}}>Добавить</button>
            <dialog open={modalOpen}>
              <div className='modal_wrap' onClick={(e)=> e.stopPropagation()}>
              <input type="text" placeholder="Имя клиента "value={token} onChange={(e)=>setToken(e.target.value)}/>
              <button onClick={()=>{addWarehouses({name:token},refresh)}} className='button'>Сохранить</button>
              </div>
            </dialog>
            <div className='table_wrap'>
              {data.map((item) => (
               <div className='table_item_wrap'>
                <div>{item.id}</div>
                <div>{item.name}</div>
                <button className='button-del' onClick={()=>{deleteWarehouses(item.id,refresh)}}>Удалить</button>
               </div> 
              ))}
            </div>
            </div>
          )
}

export default Warehouses
