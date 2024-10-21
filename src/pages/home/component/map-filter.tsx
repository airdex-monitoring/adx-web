import React from 'react'

interface IMapFilterProps {
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

const MapFilter = () => {
    const [selectedFilter, setSelectedFilter] = React.useState<string | null>('all');

    const filters = [
        {
            title: 'за последний час',
            value: '1h',
        },
        {
            title: 'за сегодня',
            value: 'today',
        },
        {
            title: 'за вчера',
            value: 'yesterday',
        },
        {
            title: 'за неделю',
            value: 'week',
        },
        {
            title: 'за месяц',
            value: 'month',
        },
        {
            title: 'за всё время',
            value: 'all',
        }
    ];

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
    };

    const MapFilterItem = ({ title, isSelected, onClick }: IMapFilterProps) => {
        return (
            <div
                onClick={onClick}
                className={`gap-[10px] p-[10px] rounded-xl cursor-pointer`}
                style={{
                    background: isSelected ? '#2643FF' : '#E3E3E3',
                }}
            >
                <h4 style={{
                    color: isSelected ? '#FFFFFF' : '#212427',
                }}>
                    {title}
                </h4>
            </div>
        );
    };

    return (
        <div className='w-full flex flex-row gap-[10px]'>
            {filters?.map((filter, index) => (
                <MapFilterItem
                    title={filter.title}
                    isSelected={selectedFilter === filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                    key={index}
                />
            ))}
        </div>
    )
}

export default MapFilter