import { useState } from 'react';
import { handleQualityColor } from '../../../common/color';
import { useCustomMap } from '../hooks/useCustomMap';
import { Wrapper } from '../../../layout/wrapper';
import Spinner from '../../../layout/spinner';

interface SummaryCardProps {
    title: string;
    value: string;
    desc: string;
    aqiLevel?: string;
    type: string;
}

const SummaryBox = () => {
    const { aqiAvg: data } = useCustomMap({
        isFilter: true
    });

    const SummaryCard = ({ title, value, desc, aqiLevel, type }: SummaryCardProps) => {
        const [hover, setHover] = useState(false);

        const handleType = (type: string) => {
            switch (type) {
                case 'aqi':
                    return 'AQI';
                case 'pm_1':
                    return 'µg/m³';
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
                        background: aqiLevel && handleQualityColor(aqiLevel)
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

    return !data.isLoadingAqiAvg ? (
        <div className='w-full flex flex-col gap-[10px]'>
            <h3>Сводка за сегодня</h3>
            <Wrapper error={!!data.aqiAvgError} errorHeight={'120px'} isLoading={!data.isLoadingAqiAvg}>
                {data.aqiAvg &&
                    <div className='w-full flex flex-row gap-[10px] flex-auto flex-wrap'>
                        <SummaryCard
                            title={'AQI'}
                            value={data.aqiAvg?.aqiAvg?.toFixed(1) ?? ''}
                            desc={"Средний показатель качества воздуха"}
                            aqiLevel={data.aqiAvg?.aqiAvgLevel ?? ''}
                            type={'aqi'}
                        />
                        <SummaryCard
                            title={'AQI'}
                            value={data.aqiAvg?.aqiMin?.toFixed(1) ?? ''}
                            desc={"Минимальный показатель качества воздуха"}
                            aqiLevel={data.aqiAvg?.aqiMinLevel ?? ''}
                            type={'aqi'}
                        />
                        <SummaryCard
                            title={'AQI'}
                            value={data.aqiAvg?.aqiMax?.toFixed(1) ?? ''}
                            desc={"Максимальный показатель качества воздуха"}
                            aqiLevel={data.aqiAvg?.aqiMaxLevel ?? ''}
                            type={'aqi'}
                        />
                    </div>
                }
                {data.aqiAvg &&
                    <div className='w-full flex flex-row gap-[10px] flex-auto flex-wrap'>
                        <SummaryCard
                            title={'PM 1.0'}
                            value={data.aqiAvg?.pm_1_0_avg?.toFixed(1) ?? ''}
                            desc={"Среднее значение PM 1.0"}
                            type={'pm_1'}
                        />
                        <SummaryCard
                            title={'PM 2.5'}
                            value={data.aqiAvg?.pm_2_5_avg?.toFixed(1) ?? ''}
                            desc={"Среднее значение PM 2.5"}
                            type={'pm_2_5'}
                        />
                        <SummaryCard
                            title={'PM 10'}
                            value={data.aqiAvg?.pm_10_avg?.toFixed(1) ?? ''}
                            desc={"Среднее значение PM 10"}
                            type={'pm_10'}
                        />
                    </div>
                }
            </Wrapper>
        </div>
    ) : <Spinner height='64' />
}

export default SummaryBox