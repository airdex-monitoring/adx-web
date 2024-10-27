import React from 'react'
import { AqiQuery } from '../../../interfaces/IAirSensorSignal';
import { format } from 'date-fns';

interface IMapFilterProps {
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

const filters = [
    {
        title: 'за последний час',
        value: '1h',
        filter: {
            from: new Date(new Date().setHours(new Date().getHours() - 1)),
            to: new Date(),
        },
    },
    {
        title: 'за сегодня',
        value: 'today',
        filter: {
            from: new Date(new Date().setHours(0, 0, 0, 0)),
            to: new Date(new Date().setHours(23, 59, 59, 0)),
        }
    },
    {
        title: 'за вчера',
        value: 'yesterday',
        filter: {
            from: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)),
            to: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 0)),
        }
    },
    {
        title: 'за неделю',
        value: 'week',
        filter: {
            from: new Date(new Date().setDate(new Date().getDate() - 7)),
            to: new Date(),
        }
    },
    {
        title: 'за месяц',
        value: 'month',
        filter: {
            from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            to: new Date(),
        }
    },
    {
        title: 'за всё время',
        value: 'all',
        filter: {
            from: new Date(new Date(0)),
            to: new Date(),
        }
    }
];

interface IMapProps {
    handlerMapFilter: (query: AqiQuery) => void;
}

const MapFilter = ({ handlerMapFilter }: IMapProps) => {
    const [selectedFilter, setSelectedFilter] = React.useState<string | null>('all');

    const handleFilterClick = (filter: string, from: Date, to: Date) => {
        setSelectedFilter(filter);
        handlerMapFilter({
            startDate: format(from, 'dd-MM-yyyy HH:mm'),
            endDate: format(to, 'dd-MM-yyyy HH:mm'),
        });
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
        <div className='w-full flex flex-row gap-[10px] flex-wrap'>
            {filters?.map((filter, index) => (
                <MapFilterItem
                    title={filter.title}
                    isSelected={selectedFilter === filter.value}
                    onClick={() => handleFilterClick(filter.value, filter.filter.from, filter.filter.to)}
                    key={index}
                />
            ))}
        </div>
    )
}

export default MapFilter