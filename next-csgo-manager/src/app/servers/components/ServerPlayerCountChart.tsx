"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "A line chart";
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePlayerCountData(
  startDate: string,
  days: number,
  interval: number = 5 // in minutes
): { datetime: string; playerCount: number }[] {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + days);

  let previousNumber = 0;

  while (start < end) {
    const hour = start.getHours();
    let playerCount = 0;

    // Begynner å spille
    if (hour >= 19 && hour < 23) {
      if ((previousNumber = 0)) {
        if (Math.random() > 0.5) {
          playerCount = 4;
        } else {
          playerCount = 2;
        }
      }
      playerCount = getRandomInt(previousNumber, previousNumber + 4);

      // Peak
    } else if (hour >= 23 || hour < 1) {
      playerCount = getRandomInt(previousNumber, previousNumber + 4);

      // Færre spillere
    } else if (hour >= 1 && hour < 3) {
      playerCount = getRandomInt(previousNumber - 1, previousNumber);
      // Resten av døgnet
    } else {
      if (previousNumber == 0) {
        playerCount = 0;
      } else {
        playerCount = getRandomInt(previousNumber - 2, previousNumber);
      }
    }

    if (playerCount < 0) {
      playerCount = 0;
    }

    previousNumber = playerCount;
    data.push({
      datetime: start.toISOString().replace("T", " ").substring(0, 19),
      playerCount: playerCount,
    });

    start.setMinutes(start.getMinutes() + interval);
  }

  return data;
}

// Example usage:
const chartData = generatePlayerCountData("2024-09-30 00:00:00", 7, 30);
console.log(chartData);

// const chartData = [
//   { datetime: "2024-09-30 00:00:00", playerCount: 0 },
//   { datetime: "2024-09-30 21:00:00", playerCount: 6 },
//   { datetime: "2024-09-30 22:00:00", playerCount: 10 },
//   { datetime: "2024-09-30 23:00:00", playerCount: 15 },
//   { datetime: "2024-10-01 00:00:00", playerCount: 12 },
//   { datetime: "2024-10-01 01:00:00", playerCount: 8 },
//   { datetime: "2024-10-01 02:00:00", playerCount: 0 },
//   // Repeat similar pattern for the next 6 days
//   { datetime: "2024-10-01 21:00:00", playerCount: 7 },
//   { datetime: "2024-10-01 22:00:00", playerCount: 11 },
//   { datetime: "2024-10-01 23:00:00", playerCount: 14 },
//   { datetime: "2024-10-02 00:00:00", playerCount: 13 },
//   { datetime: "2024-10-02 01:00:00", playerCount: 9 },
//   { datetime: "2024-10-02 02:00:00", playerCount: 0 },
//   // Continue for the rest of the week
//   { datetime: "2024-10-02 21:00:00", playerCount: 8 },
//   { datetime: "2024-10-02 22:00:00", playerCount: 12 },
//   { datetime: "2024-10-02 23:00:00", playerCount: 15 },
//   { datetime: "2024-10-03 00:00:00", playerCount: 14 },
//   { datetime: "2024-10-03 01:00:00", playerCount: 10 },
//   { datetime: "2024-10-03 02:00:00", playerCount: 0 },
//   // Continue for the rest of the week
//   { datetime: "2024-10-03 21:00:00", playerCount: 9 },
//   { datetime: "2024-10-03 22:00:00", playerCount: 13 },
//   { datetime: "2024-10-03 23:00:00", playerCount: 15 },
//   { datetime: "2024-10-04 00:00:00", playerCount: 11 },
//   { datetime: "2024-10-04 01:00:00", playerCount: 7 },
//   { datetime: "2024-10-04 02:00:00", playerCount: 0 },
//   // Continue for the rest of the week
//   { datetime: "2024-10-04 21:00:00", playerCount: 6 },
//   { datetime: "2024-10-04 22:00:00", playerCount: 10 },
//   { datetime: "2024-10-04 23:00:00", playerCount: 15 },
//   { datetime: "2024-10-05 00:00:00", playerCount: 12 },
//   { datetime: "2024-10-05 01:00:00", playerCount: 8 },
//   { datetime: "2024-10-05 02:00:00", playerCount: 0 },
//   // Continue for the rest of the week
//   { datetime: "2024-10-05 21:00:00", playerCount: 7 },
//   { datetime: "2024-10-05 22:00:00", playerCount: 11 },
//   { datetime: "2024-10-05 23:00:00", playerCount: 14 },
//   { datetime: "2024-10-06 00:00:00", playerCount: 13 },
//   { datetime: "2024-10-06 01:00:00", playerCount: 9 },
//   { datetime: "2024-10-06 02:00:00", playerCount: 0 },
//   // Continue for the rest of the week
//   { datetime: "2024-10-06 21:00:00", playerCount: 8 },
//   { datetime: "2024-10-06 22:00:00", playerCount: 12 },
//   { datetime: "2024-10-06 23:00:00", playerCount: 15 },
//   { datetime: "2024-10-07 00:00:00", playerCount: 14 },
//   { datetime: "2024-10-07 01:00:00", playerCount: 10 },
//   { datetime: "2024-10-07 02:00:00", playerCount: 0 },
// ];

const chartConfig = {
  playerCount: {
    label: "playerCount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ServerPlayerCountChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Player Count</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
              // tickFormatter={(value) => value}
              // tickFormatter={(value) => value.slice(0, 3)}

              // dd.mm hh:mm
              // tickFormatter={(value) =>
              //   `${value.slice(8, 10)}.${value.slice(5, 7)} ${value.slice(
              //     11,
              //     16
              //   )}`
              // }

              // hh:mm
              tickFormatter={(value) => `${value.slice(11, 16)}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="playerCount"
              // type="natural"
              type="linear"
              stroke="var(--color-playerCount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
