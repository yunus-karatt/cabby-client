import  { useEffect, useRef, useState } from 'react'

const CustomeLoader = () => {
  const items=[0,1,2,3,4,5]
  const [index,setIndex]=useState(0)
  const increment=useRef(1)
  useEffect(()=>{
    
    let interval=setInterval(()=>{
      if(index >= items.length -1 ){
        increment.current=-1
      }else if(index<=0){
        increment.current=1
      }
      setIndex(()=>index+increment.current)
    },500);
    return ()=>clearInterval(interval)
  },[index])


  return (
    <div className='flex items-center justify-center mb-5 md:mb-0'>
      {items.map((i)=>{
        return(
          <div key={i} className="w-[40px] h-[40px]  bg-white relative rounded-[20px] ms-1 overflow-hidden ">
            <div style={{
              transform:`translateX(${(index-i)*40}px)`,
              transition: 'transform 0.5s ease',
            }} className={`absolute left-0 top-0 w-10 h-10 rounded-[20px] bg-primary `} />
          </div>
        )
      })}
    </div>
  )
}

export default CustomeLoader