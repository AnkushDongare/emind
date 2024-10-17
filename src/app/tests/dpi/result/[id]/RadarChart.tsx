"use client"
import { TrendingUp } from "lucide-react";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
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

// Define the structure for passed props
interface TestResult {
    category: string;
    score: number;
}

interface RadarResultProps {
    data: TestResult[]; // Data passed from the parent component
}

// Define a config for the chart
const chartConfig = {
    value: {
        label: "Score",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function RadarResult({ data }: RadarResultProps) {
    return (
        <Card>
            <CardHeader className="items-center">
                <CardTitle>DPI - eMindCafe Deep Personality Insight Measure (eDPIM)
                Results</CardTitle>
                <CardDescription>
                    Showing test category scores for the selected test.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-w-[500px] max-h-[500px]"
                >
                    <RadarChart data={data}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} /> {/* Scale from 0 to 100 */}
                        <Radar
                            dataKey="score"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Results of the eDPIM Test <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Retrieved from the eDPIM
                </div>
            </CardFooter>
        </Card>
    );
}
