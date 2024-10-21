import React from 'react'

interface SpinnerProps {
    width: string;
    height: string;
}

const Spinner = ({ width, height }: SpinnerProps) => {
    return (
        <div className={'w-full min-h-[20px] flex justify-center items-center place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible'}>
            <svg className={'animate-spin text-gray-900/50'} width={width} height={height} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M60 30C60 24.1416 58.2847 18.4114 55.0658 13.5166C51.847 8.62171 47.2654 4.77643 41.8864 2.45525C36.5075 0.134078 30.5666 -0.561408 24.797 0.454625C19.0274 1.47066 13.6815 4.15375 9.41913 8.17277C5.15672 12.1918 2.16431 17.3709 0.811185 23.0709C-0.541937 28.7708 -0.196549 34.7423 1.80472 40.2482C3.806 45.7542 7.37557 50.5537 12.0729 54.0545C16.7703 57.5553 22.3899 59.6042 28.2381 59.9482L28.6573 52.8238C24.2002 52.5616 19.9175 51.0002 16.3376 48.3322C12.7577 45.6642 10.0373 42.0064 8.51209 37.8103C6.9869 33.6141 6.72368 29.0632 7.75491 24.7192C8.78613 20.3752 11.0667 16.4282 14.3151 13.3652C17.5635 10.3023 21.6377 8.2575 26.0348 7.48317C30.4318 6.70884 34.9594 7.23888 39.0588 9.00787C43.1581 10.7769 46.6498 13.7074 49.1029 17.4378C51.5561 21.1682 52.8633 25.5353 52.8633 30H60Z"
                    fill="#D9D9D9"
                />
            </svg>
        </div>
    )
}

export default Spinner