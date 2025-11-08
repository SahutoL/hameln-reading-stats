
import React from 'react';
import { ComparisonData } from '../types';
import { ArrowUpIcon, ArrowDownIcon, BulbIcon } from './icons';

interface ComparisonStatsProps {
    data: ComparisonData;
}

const TrendIndicator: React.FC<{
    direction: 'up' | 'down' | 'same';
    percentage: number;
    label: string;
}> = ({ direction, percentage, label }) => {
    if (direction === 'same' && percentage === 0) {
        return <div className="text-xs text-gray-500 text-right">{label}から変化なし</div>;
    }

    const isUp = direction === 'up';
    const color = isUp ? 'text-green-400' : 'text-red-400';
    const Icon = isUp ? ArrowUpIcon : ArrowDownIcon;

    return (
        <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-gray-500">{label}比</span>
            <div className={`flex items-center gap-1 font-bold text-lg ${color}`}>
                <Icon className="w-4 h-4" />
                <span>{percentage}%</span>
            </div>
        </div>
    );
};

const ComparisonStatItem: React.FC<{ title: string; value: number; trendData: ComparisonData['monthly' | 'yearly' | 'last30days']; trendLabel: string }> = ({ title, value, trendData, trendLabel }) => (
    <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-on-surface">
                {value.toLocaleString()}
                <span className="text-sm font-normal text-gray-400 ml-1">文字</span>
            </p>
            <TrendIndicator direction={trendData.direction} percentage={trendData.percentage} label={trendLabel} />
        </div>
    </div>
);

const ComparisonStats: React.FC<ComparisonStatsProps> = ({ data }) => {
    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-700 h-full">
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <BulbIcon className="w-6 h-6 text-yellow-400" />
                比較統計
            </h2>
            <div className="space-y-5">
                <ComparisonStatItem
                    title="今月の読書量"
                    value={data.monthly.current}
                    trendData={data.monthly}
                    trendLabel="先月"
                />
                <ComparisonStatItem
                    title="直近30日間の読書量"
                    value={data.last30days.current}
                    trendData={data.last30days}
                    trendLabel="前期30日"
                />
                <ComparisonStatItem
                    title="今年の累計読書量"
                    value={data.yearly.current}
                    trendData={data.yearly}
                    trendLabel="昨年"
                />
            </div>
        </div>
    );
};

export default ComparisonStats;
