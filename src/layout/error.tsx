import React from 'react'

interface ErrorProps {
  height: number
}

const Error = ({ height }: ErrorProps) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center bg-[#E3E3E3]`} style={{
      minHeight: height ? height + "px" : "64px"
    }}>
      <h4 className='text-red'>Сервис недоступен</h4>
    </div>
  )
}

export default Error