import React, { useEffect,useState } from 'react'
import { defaultPath } from '../App'

const getEmployees = async() => {
  const data = await fetch(`${defaultPath}employees`)

  return data.json()
}
const addEmployees = async(studentData,func) => {
  try {
    const response = await fetch(`${defaultPath}employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error('Failed to add employees');
    

    const data = await response.json();
    console.log('employees added:', data);
    func()
  } catch (error) {
    console.error('Error:', error);
  }
}
const deleteEmployees = async(id,func) => {
  await fetch(`${defaultPath}employees/${id}`,{method:"DELETE"})
  func()
}

const getSalary = async() => {
  const data = await fetch(`${defaultPath}total_salary`)

  return data.json()
}
const Employees = () => {
    const [data,setData] = useState([])
    const [modalOpen,setModalOpen] = useState(false)
    const [name,setName] = useState('')
    const [position,setPosition] = useState('') 
    const [salary,setSalary] = useState('')
    const [totalsalary,setTotalSalary] = useState('')

    async function refresh() {
      getEmployees().then(res => setData(res))
      getSalary().then(res => setTotalSalary(res.totalSalary))
    }
  
    useEffect(()=>{
      refresh()
    },[])
  
    return (
      <div className='comp_wrap' onClick={()=>setModalOpen(false)}>
        <div style={{display:'flex',gap:'12px', margin:'0 40%'}}>
          <button className='button-info'>Суппа зарплат: {totalsalary}</button>
          <button className='button' onClick={(e)=>{ e.stopPropagation();setModalOpen(!modalOpen)}}>Добавить</button>
        </div>
      <dialog open={modalOpen}>
        <div className='modal_wrap' onClick={(e)=> e.stopPropagation()}>
        <input type="text" placeholder="Имя клиента "value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="Должность "value={position} onChange={(e)=>setPosition(e.target.value)}/>
        <input type="text" placeholder="Зарплата "value={salary} onChange={(e)=>setSalary(e.target.value)}/>
        <button onClick={()=>{addEmployees({name,position,salary},refresh)}} className='button'>Сохранить</button>
        </div>
      </dialog>
      <div className='table_wrap'>
        {data.map((item) => (
         <div className='table_item_wrap'>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.position}</div>
          <div>{item.salary}</div>
          <button className='button-del' onClick={()=>{deleteEmployees(item.id,refresh)}}>Удалить</button>
         </div> 
        ))}
      </div>
      </div>
    )
  }

export default Employees
