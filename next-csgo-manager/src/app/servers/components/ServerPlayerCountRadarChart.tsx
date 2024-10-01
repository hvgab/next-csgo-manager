"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart";

const chartData = [
  { hour: "00:00", playerCount: 10 },
  { hour: "01:00", playerCount: 12 },
  { hour: "02:00", playerCount: 14 },
  { hour: "03:00", playerCount: 6 },
  { hour: "04:00", playerCount: 0 },
  { hour: "05:00", playerCount: 0 },
  { hour: "06:00", playerCount: 0 },
  { hour: "07:00", playerCount: 0 },
  { hour: "08:00", playerCount: 0 },
  { hour: "09:00", playerCount: 0 },
  { hour: "10:00", playerCount: 0 },
  { hour: "11:00", playerCount: 0 },
  { hour: "12:00", playerCount: 0 },
  { hour: "13:00", playerCount: 0 },
  { hour: "14:00", playerCount: 0 },
  { hour: "15:00", playerCount: 0 },
  { hour: "16:00", playerCount: 0 },
  { hour: "17:00", playerCount: 0 },
  { hour: "18:00", playerCount: 0 },
  { hour: "19:00", playerCount: 2 },
  { hour: "20:00", playerCount: 4 },
  { hour: "21:00", playerCount: 6 },
  { hour: "22:00", playerCount: 8 },
  { hour: "23:00", playerCount: 10 },
];

// const chartData = [
//   { hour: "12:00", playerCountAm: 10, playerCountPm: 0 },
//   { hour: "01:00", playerCountAm: 12, playerCountPm: 0 },
//   { hour: "02:00", playerCountAm: 14, playerCountPm: 0 },
//   { hour: "03:00", playerCountAm: 4, playerCountPm: 0 },
//   { hour: "04:00", playerCountAm: 0, playerCountPm: 0 },
//   { hour: "05:00", playerCountAm: 0, playerCountPm: 0 },
//   { hour: "06:00", playerCountAm: 0, playerCountPm: 0 },
//   { hour: "07:00", playerCountAm: 0, playerCountPm: 2 },
//   { hour: "08:00", playerCountAm: 0, playerCountPm: 4 },
//   { hour: "09:00", playerCountAm: 0, playerCountPm: 6 },
//   { hour: "10:00", playerCountAm: 0, playerCountPm: 8 },
//   { hour: "11:00", playerCountAm: 0, playerCountPm: 8 },
// ];

const chartConfig = {
  playerCount: {
    label: "Players",
    color: "hsl(var(--chart-1))",
  },
  playerCountAm: {
    label: "Night",
    color: "hsl(var(--chart-1))",
  },
  playerCountPm: {
    label: "Day",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ServerPlayerCountRadarChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-lg">Median Player Count</CardTitle>
        <CardDescription>
          When is this server normally populated?
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="hour" />
            <PolarGrid />
            <Radar
              dataKey="playerCount"
              fill="var(--color-playerCount)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="playerCountAm"
              fill="var(--color-playerCountAm)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="playerCountPm"
              fill="var(--color-playerCountPm)"
            ></Radar>
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
