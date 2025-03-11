import React, { useState } from "react";
import EnergyUsageChart from './EnergyUsageChart.tsx';
import EnergyGeneratedChart from './EnergyGeneratedChart.tsx';

export default function TrackerMain() {
    const [currentChart, setCurrentChart] = useState('totalEnergyUsage');
    const [timeRange, setTimeRange] = useState<'today' | 'last7Days' | 'lastMonth' | 'custom'>('today');

    return (
        <div className="et__main">
            <div className="et__teu_graph__container">
                <h1>
                    {currentChart === 'totalEnergyUsage' ? 'Total Energy Usage' : 
                     currentChart === 'totalEnergyGenerated' ? 'Total Energy Generated' : 
                     'Custom Chart'}
                </h1>

                {currentChart === 'totalEnergyUsage' && <EnergyUsageChart timeRange={timeRange} />}
                {currentChart === 'totalEnergyGenerated' && <EnergyGeneratedChart timeRange={timeRange} />}
                        
                <div className="et_button_container">
                    <div className="et_button" onClick={() => setTimeRange('today')}>Today</div>
                    <div className="et_button" onClick={() => setTimeRange('last7Days')}>Last 7 Days</div>
                    <div className="et_button" onClick={() => setTimeRange('lastMonth')}>Last Month</div>
                    <div className="et_button" onClick={() => setTimeRange('custom')}>Custom</div>
                </div>
            </div>

            <div className="et_graph_selector">
                <div className="et_button" onClick={() => setCurrentChart('totalEnergyUsage')}>Total Energy Usage</div>
                <div className="et_button" onClick={() => setCurrentChart('totalEnergyGenerated')}>Total Energy Generated</div>
            </div>
        </div>
    );
}