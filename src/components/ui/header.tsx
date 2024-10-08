import React from 'react'

const Header: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <div className={"flex items-center px-2 py-4 border-b-[1px] border-black mb-5"}>
            <h1 className={"text-2xl font-bold text-blue"}>AIRDEX</h1>
        </div>
    )
}

export default Header;