import React, { useEffect,useState } from 'react'
import { defaultPath } from '../App'

const getServices = async() => {
  const data = await fetch(`${defaultPath}services`)

  return data.json()
}
const addServices = async(studentData,func) => {
  try {
    const response = await fetch(`${defaultPath}services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to add services');
    

    const data = await response.json();
    console.log('services added:', data);
    func()
  } catch (error) {
    console.error('Error:', error);
  }
}
const deleteServices = async(id,func) => {
  await fetch(`${defaultPath}services/${id}`,{method:"DELETE"})
  func()
}
const Services = () => {
    const [data,setData] = useState([])
        const [modalOpen,setModalOpen] = useState(false)
        const [token,setToken] = useState('')
        const [price,setPrice] = useState('')

        async function refresh() {
          getServices().then((res) => {
            setData(res)
          })
        }
      
        useEffect(()=>{
          getServices().then((res) => {
            setData(res)
          })
        },[])
      
        return (
          <div className='comp_wrap' onClick={()=>setModalOpen(false)}>
          <button className='button' onClick={(e)=>{ e.stopPropagation();setModalOpen(!modalOpen)}}>Добавить</button>
          <dialog open={modalOpen}>
            <div className='modal_wrap' onClick={(e)=> e.stopPropagation()}>
            <input type="text" placeholder="Имя клиента "value={token} onChange={(e)=>setToken(e.target.value)}/>
            <input type="text" placeholder="Цена "value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <button onClick={()=>{addServices({name:token,price},refresh)}} className='button'>Сохранить</button>
            </div>
          </dialog>
          <div className='table_wrap'>
            {data.map((item) => (
             <div className='table_item_wrap'>
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <button className='button-del' onClick={()=>{deleteServices(item.id,refresh)}}>Удалить</button>
             </div> 
            ))}
          </div>
          </div>
        )
}

export default Services
