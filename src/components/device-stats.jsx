import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

export const DeviceStats = ({stats}) => {

    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const deviceCount = stats.reduce((acc, item) => {
        if(acc[item.device])
            acc[item.device] += 1;
        else
            acc[item.device] = 1;
        return acc;
    }, {});

    const devices = Object.entries(deviceCount).map(([device, count]) => ({
        device,
        count
    }));

    return (
        <div className='w-full h-[300px]'>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={devices} 
                dataKey="count" 
                labelLine={false} 
                fill="#8884d8" 
                label = {({device, percent}) => (`${device}: ${(percent*100).toFixed(0)}%`)}
                >
                    {devices.map((_, index) => <Cell key={index} fill={colors[index%colors.length]} />)}
                </Pie>
            </PieChart>
            </ResponsiveContainer>
        </div>  
    );
}
