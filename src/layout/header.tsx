import React from 'react'

const Header: React.FC = () => {
    return (
        <div className={"flex items-center justify-between py-8"}>
            <div className={"flex gap-3 items-center"}>
                <img className={"max-h-8"} src="/icons/logo.svg" alt="logo" />
                <h1>Airdex Monitoring</h1>
            </div>
            <h2 className='header-info cursor-pointer'>Информация</h2>
        </div>
    )
}

export default Header;