import React from 'react'

const Header: React.FC = () => {
    return (
        <div className={"flex items-center px-2 py-8 border-b-[1px] border-black mb-5"}>
            <h1 className={"text-xl leading-5 font-bold text-black"}>Airdex Monitoring</h1>
        </div>
    )
}

export default Header;