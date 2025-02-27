'use client';
import { XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";

interface StressChartProps {
  data: { day: string; level: number; average: number }[];
}

export const StressChart = ({ data }: StressChartProps) => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" stroke="#6b7280" axisLine={false} tickLine={false} />
        <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            background: '#fff',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
        />
        <Area
          type="monotone"
          dataKey="average"
          stroke="#4f46e5"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorAvg)"
          name="Team Average"
        />
        <Area
          type="monotone"
          dataKey="level"
          stroke="#9333ea"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorLevel)"
          name="Your Stress Level"
          dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);