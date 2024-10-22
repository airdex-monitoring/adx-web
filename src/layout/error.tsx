import React from 'react'

interface ErrorProps {
  height: string
}

const Error = ({ height }: ErrorProps) => {
  return (
    <div className={`w-full h-full min-h-[${height ? height : '64px'}] flex flex-col items-center justify-center bg-[#E3E3E3]`}>
      <h4 className='text-red'>Сервис недоступен</h4>
    </div>
  )
}

export default Error