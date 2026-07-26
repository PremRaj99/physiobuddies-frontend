import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, Line, LineChart, Cell } from 'recharts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

// Define the Shadcn Chart Configurations for styling tooltips and legends
const barChartConfig = {
  value: { label: 'Total', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

const pieChartConfig = {
  value: { label: 'Feedback' },
} satisfies ChartConfig;

const lineChartConfig = {
  percentage: { label: 'Percentage', color: '#014f86' },
} satisfies ChartConfig;

type MetricDataItem = {
  name: string;
  value: number;
  color: string;
};

type PieDataItem = {
  name: string;
  value: number;
};

type CoverageDataItem = {
  name: string;
  percentage: number;
};

type ImpactDashboardParams = {
  metrics: MetricDataItem[];
  pieData: PieDataItem[];
  coverageData: CoverageDataItem[];
  COLORS: string[];
};

export default function ImpactDashboard({
  metrics,
  pieData,
  coverageData,
  COLORS,
}: ImpactDashboardParams) {
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <div className="w-full">
      {/* Mobile View: Dropdown to select chart */}
      <div className="mb-6 md:hidden">
        <div className="mb-6 w-full">
          <Select value={selectedChart} onValueChange={setSelectedChart}>
            <SelectTrigger className="focus:ring-primary border-border h-12 w-full rounded-xl bg-white shadow-sm">
              <SelectValue placeholder="Select Data View" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="bar">Key Metrics</SelectItem>
              <SelectItem value="pie">Patient Feedback</SelectItem>
              <SelectItem value="line">Coverage Metrics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-border mt-4 overflow-hidden rounded-3xl border bg-white p-5 shadow-sm sm:p-6"
          >
            {selectedChart === 'bar' && (
              <div className="h-72 w-full">
                <h3 className="mb-4 text-lg font-bold text-[#012a4a]">Key Metrics</h3>
                <ChartContainer config={barChartConfig} className="h-full w-full">
                  <BarChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      angle={-25}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 11, fill: '#012a4a' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#012a4a' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      cursor={{ fill: 'rgba(169, 214, 229, 0.2)' }}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
                      {metrics.map((entry: { color: string }, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            )}

            {selectedChart === 'pie' && (
              <div className="flex h-72 w-full flex-col">
                <h3 className="mb-2 text-lg font-bold text-[#012a4a]">Patient Feedback</h3>
                <ChartContainer config={pieChartConfig} className="h-full w-full grow">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      animationDuration={1500}
                    >
                      {pieData.map((_entry: PieDataItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} className="mt-4" />
                  </PieChart>
                </ChartContainer>
              </div>
            )}

            {selectedChart === 'line' && (
              <div className="h-72 w-full">
                <h3 className="mb-4 text-lg font-bold text-[#012a4a]">Coverage Metrics</h3>
                <ChartContainer config={lineChartConfig} className="h-full w-full">
                  <LineChart
                    data={coverageData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#012a4a' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#012a4a' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="var(--color-percentage)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: 'var(--color-percentage)' }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop/Tablet View: Grid Layout */}
      <div className="hidden grid-cols-1 gap-8 md:grid lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="border-border flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <h3 className="mb-6 text-lg font-bold text-[#012a4a]">Network Growth</h3>
          <div className="h-80 w-full grow">
            <ChartContainer config={barChartConfig} className="h-full w-full">
              <BarChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12, fill: '#012a4a' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 12, fill: '#012a4a' }} tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={{ fill: 'rgba(169, 214, 229, 0.2)' }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
                  {metrics.map((entry: MetricDataItem, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Pie Chart */}
          <div className="border-border flex flex-1 flex-col rounded-3xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="mb-2 text-lg font-bold text-[#012a4a]">Patient Feedback</h3>
            <div className="h-48 w-full grow">
              <ChartContainer config={pieChartConfig} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_entry: PieDataItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} className="translate-y-4" />
                </PieChart>
              </ChartContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="border-border flex flex-1 flex-col rounded-3xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="mb-4 text-lg font-bold text-[#012a4a]">Platform Metrics</h3>
            <div className="h-48 w-full grow">
              <ChartContainer config={lineChartConfig} className="h-full w-full">
                <LineChart
                  data={coverageData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#012a4a' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#012a4a' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="var(--color-percentage)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'var(--color-percentage)' }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
