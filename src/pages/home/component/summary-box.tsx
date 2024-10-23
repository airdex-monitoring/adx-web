import { useState } from 'react';
import { handleQualityColor } from '../../../common/color';

interface SummaryCardProps {
    title: string;
    value: string;
    desc: string;
    aqiLevel: string;
    type: string;
}

const SummaryBox = () => {
    const SummaryCard = ({ title, value, desc, aqiLevel, type }: SummaryCardProps) => {
        const [hover, setHover] = useState(false);

        const handleType = (type: string) => {
            switch (type) {
                case 'aqi':
                    return 'AQI';
                case 'pm_2_5':
                    return 'µg/m³';
                case 'pm_10':
                    return 'µg/m³';
                default:
                    return '';
            }
        }

        return (
            <div className="relative flex items-center">
                <div
                    className={`flex flex-col gap-[10px] p-[10px] rounded-xl cursor-pointer`}
                    style={{
                        background: handleQualityColor(aqiLevel)
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <h4>{`${value} ${title}`}</h4>
                    <p className='font-sans font-normal text-[13px] leading-[15px] tracking-[-0.25px]'>{desc}</p>
                </div>
                {hover &&
                    (<span className='absolute bottom-full rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-24'>
                        {handleType(type)}
                    </span>)
                }
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col gap-[10px]'>
            <h3>Сводка за сегодня</h3>
            <div className='w-full flex flex-row gap-[10px] flex-auto flex-wrap'>
                <SummaryCard title='AQI' value='34' aqiLevel='GOOD' desc='Индекс качества воздуха' type='aqi' />
                <SummaryCard title='µg/m³' value='16.237' aqiLevel='MODERATE' desc='Количество частиц PM 2.5 на кубический метр' type='pm_2_5' />
                <SummaryCard title='µg/m³' value='4.210' aqiLevel='GOOD' desc='Количество частиц PM 10 на кубический метр' type='pm_10' />
            </div>
        </div>
    )
}

export default SummaryBox