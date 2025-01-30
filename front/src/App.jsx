import './App.css';
import { useState } from 'react';
import Clients from './Components/Clients';
import Header from './Components/Header';
import Warehouses from './Components/Warehouses';
import Employees from './Components/Employees';
import Materials from './Components/Materials';
import Services from './Components/Services';

export const defaultPath = 'http://localhost:7070/api/'


function App() {
  const [pickedPage,setPickedPage] = useState(1)
  return (
    <div className="App">
      <Header active={pickedPage} setActive={setPickedPage}/>
      { pickedPage === 1 ? 
        <Warehouses/> :
        pickedPage === 2 ? 
        <Clients/> :
        pickedPage === 3 ? 
        <Employees/> :
        pickedPage === 4 ? 
        <Materials/> :
        pickedPage === 5 ? 
        <Services/> : <></>
      }
    </div>
  );
}

export default App;
