import { handleQualityColor } from '../../../common/color';

interface SummaryCardProps {
    title: string;
    value: string;
    desc: string;
    aqiLevel: string;
}

const SummaryBox = () => {
    const SummaryCard = ({ title, value, desc, aqiLevel }: SummaryCardProps) => {
        return (
            <div className='has-tooltip'>
                <div
                    className={`flex flex-col gap-[10px] p-[10px] rounded-xl cursor-pointer`}
                    style={{
                        background: handleQualityColor(aqiLevel)
                    }}
                >
                    <h4>{`${value} ${title}`}</h4>
                    <p className='font-sans font-normal text-[13px] leading-[15px] tracking-[-0.25px]'>{desc}</p>
                </div>
                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-24'>Some Nice Tooltip Text</span>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col gap-[10px]'>
            <h3>Сводка за сегодня</h3>
            <div className='w-full flex flex-row gap-[10px] flex-auto flex-wrap'>
                <SummaryCard title='AQI' value='34' aqiLevel='GOOD' desc='Индекс качества воздуха' />
                <SummaryCard title='µg/m³' value='16.237' aqiLevel='MODERATE' desc='Количество частиц PM 2.5 на кубический метр' />
                <SummaryCard title='µg/m³' value='4.210' aqiLevel='GOOD' desc='Количество частиц PM 10 на кубический метр' />
            </div>
        </div>
    )
}

export default SummaryBox