import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', score: 2.0 },
  { week: 'Week 2', score: 2.5 },
  { week: 'Week 3', score: 3.2 },
  { week: 'Week 4', score: 2.8 },
  { week: 'Week 5', score: 3.9 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-sm border h-64">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Performance</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#facc15" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
