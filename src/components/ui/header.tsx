import React from 'react'

const Header: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <div className={"flex items-center px-2 py-4 border-b-[1px] mb-5"}>
            AIRDEX
        </div>
    )
}

export default Header;