import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export const LocationStats = ({stats}) => {

    const cityCount = stats.reduce((acc, item) => {
        if(acc[item.city])
            acc[item.city] += 1;
        else
            acc[item.city] = 1;
        return acc;
    }, {});

    const cities = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count
    }));

    return (
            <div className='w-full h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cities.slice(0,5)} >
                <XAxis dataKey="city" />
                <YAxis dataKey="count"/>
                <Legend />
                <Tooltip labelStyle={{color: "green"}}/>
                <Line type="monotone" dataKey="count" stroke="black" />
                </LineChart>
                </ResponsiveContainer>
            </div>
    );
}