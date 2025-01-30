
const Header = ({active,setActive}) => {
  return (
    (<div className="header_wrap">
      <div className={`header_el${active === 1 ? '-active' : ''}`} onClick ={()=> setActive(1)}>Склады</div>
      <div className={`header_el${active === 2 ? '-active' : ''}`} onClick ={()=> setActive(2)}>Клиенты</div>
      <div className={`header_el${active === 3 ? '-active' : ''}`} onClick ={()=> setActive(3)}>Сотрудники</div>
      <div className={`header_el${active === 4 ? '-active' : ''}`} onClick ={()=> setActive(4)}>Материалы</div>
      <div className={`header_el${active === 5 ? '-active' : ''}`} onClick ={()=> setActive(5)}>Услуги</div>
    </div>)
  );
}

export default Header
