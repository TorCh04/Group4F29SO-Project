// import React, { useState } from "react";
// import EnergyUsageChart from './EnergyUsageChart.tsx';
// import EnergyGeneratedChart from './EnergyGeneratedChart.tsx';

// export default function TrackerMain() {
//     const [currentChart, setCurrentChart] = useState('totalEnergyUsage');
//     const [timeRange, setTimeRange] = useState<'today' | 'last7Days' | 'lastMonth' | 'custom'>('today');

//     return (
//         <div className="et__main">
//             <div className="et__teu_graph__container">
//                 <h1>
//                     {currentChart === 'totalEnergyUsage' ? 'Total Energy Usage' :
//                         currentChart === 'totalEnergyGenerated' ? 'Total Energy Generated' :
//                             'Custom Chart'}
//                 </h1>

//                 {currentChart === 'totalEnergyUsage' && <EnergyUsageChart timeRange={timeRange} />}
//                 {currentChart === 'totalEnergyGenerated' && <EnergyGeneratedChart timeRange={timeRange} />}

//                 <div className="et_button_container">
//                     <div className="et_button" onClick={() => setTimeRange('today')}>Today</div>
//                     <div className="et_button" onClick={() => setTimeRange('last7Days')}>Last 7 Days</div>
//                     <div className="et_button" onClick={() => setTimeRange('lastMonth')}>Last 28 Days</div>
//                     <div className="et_button" onClick={() => setTimeRange('custom')}>Custom</div>
//                 </div>
//             </div>

//             <div className="et_graph_selector">
//                 <div className="et_button" onClick={() => setCurrentChart('totalEnergyUsage')}>Total Energy Usage</div>
//                 <div className="et_button" onClick={() => setCurrentChart('totalEnergyGenerated')}>Total Energy Generated</div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import EnergyUsageChart from './EnergyUsageChart.tsx';
import EnergyGeneratedChart from './EnergyGeneratedChart.tsx';

export default function TrackerMain() {
    const [currentChart, setCurrentChart] = useState('totalEnergyUsage');
    const [timeRange, setTimeRange] = useState<'today' | 'last7Days' | 'lastMonth' | 'custom'>('today');
    const [showCustomDropdown, setShowCustomDropdown] = useState(false);
    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');

    const handleCustomDropdownToggle = () => {
        setShowCustomDropdown(!showCustomDropdown);
    };

    const handleStartMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStartMonth(e.target.value);
    };

    const handleEndMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEndMonth(e.target.value);
    };

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
                    <div className="et_button" onClick={() => setTimeRange('lastMonth')}>Last 28 Days</div>
                    <div className="et_button" onClick={handleCustomDropdownToggle}>Custom</div>

                </div>
            </div>
            <div className="et_custom">
                {showCustomDropdown && (
                    <div className="custom-dropdown">
                        <label>
                            Start Month:
                            <select value={startMonth} onChange={handleStartMonthChange}>
                                <option value="">Select Start Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </label>

                        <label>
                            End Month:
                            <select value={endMonth} onChange={handleEndMonthChange}>
                                <option value="">Select End Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </label>

                        <div className="et_button_customAdd" onClick={() => setTimeRange('custom')}>
                            Apply Custom Range
                        </div>
                    </div>
                )}
            </div>


            <div className="et_graph_selector">
                <div className="et_button" onClick={() => setCurrentChart('totalEnergyUsage')}>Total Energy Usage</div>
                <div className="et_button" onClick={() => setCurrentChart('totalEnergyGenerated')}>Total Energy Generated</div>
            </div>
        </div>
    );
}
