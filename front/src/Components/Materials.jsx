import React, { useEffect,useState } from 'react'
import { defaultPath } from '../App'
import { getWarehouses } from './Warehouses'

const getMaterials = async() => {
  const data = await (await fetch(`${defaultPath}materials`)).json()

  const warehouses = await getWarehouses()


  const res = data.map(item => ({
    ...item,
    warehouse: warehouses.find(it => it.id === item.warehouse_id)
  }));

  return res
}
const addMaterials = async(studentData,func) => {
  if(!studentData.warehouse_id) return 
  try {
    const response = await fetch(`${defaultPath}materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to add materials');
    

    const data = await response.json();
    console.log('materials added:', data);
    func()
  } catch (error) {
    console.error('Error:', error);
  }
}
const deleteMaterials = async(id,func) => {
  await fetch(`${defaultPath}materials/${id}`,{method:"DELETE"})
  func();
}
const Materials = () => {
      const [data,setData] = useState([])
      const [warehouses,setWarehouses] = useState([])
      const [modalOpen,setModalOpen] = useState(false)
      const [token,setToken] = useState('')
      const [quantity,setQuantity] = useState('')
      const [warehouse,setWarehouse] = useState("")

      async function refresh() {
        getMaterials().then((res) => {
          setData(res);
        });
      }
    
      useEffect(()=>{
        refresh()
        getWarehouses().then((res) => {
          setWarehouses(res)
        })
      },[])


      return (
        <div className='comp_wrap' onClick={()=>{ setModalOpen(false)}}>
        <button className='button' onClick={(e)=>{ e.stopPropagation();setModalOpen(!modalOpen)}}>Добавить</button>
        <dialog open={modalOpen} onClick={(e)=> e.stopPropagation()}>
          <div className='modal_wrap'>
          <input type="text" placeholder="Название "value={token} onChange={(e)=>setToken(e.target.value)}/>
          <input type="text" placeholder="Кол-во "value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
          <label className='lable' style={{display:'flex',gap:'12px',alignItems:'center'}}>
            Склад 
            <select value={warehouse} onChange={(e)=> setWarehouse(e.target.value)}>
                {warehouses.map(item=>{
                    return (
                      <option value={item.id}>{item.name}</option>
                    )
                })}
            </select>
          </label>
          <button onClick={()=>{addMaterials({name:token,quantity,warehouse_id:warehouse},refresh)}} className='button'>Сохранить</button>
          </div>
        </dialog>
        <div className='table_wrap'>
          {data.map((item) => (
           <div className='table_item_wrap'>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{item.warehouse.name}</div>
            <button className='button-del' onClick={()=>{deleteMaterials(item.id,refresh)}}>Удалить</button>
           </div> 
          ))}
        </div>
        </div>
      )
}

export default Materials
