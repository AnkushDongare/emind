"use client";

import { useEffect, useState } from "react";
import RadarResult from "./RadarChart";
import { DPI } from "@/data/resultData";

// Define valid grade keys
type GradeKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

// Define the structure for fetched data
interface TestResult {
    category: string;
    score: number;
}

// Define the structure of API response
interface ApiResponse {
    results: Record<string, number>;
}

// Define the structure for DPI data (adjusted)
interface DPICategory {
    name: string;
    data: {
        Introduction: string;
        Explain: string;
        Score: Record<GradeKey, {
            text: string;
            Strength: string;
            Remedy: string[];
        }>;
    };
}

// Function to get grade based on score
function getGrade(score: number): GradeKey {
    if (score >= 91 && score <= 100) return "A";
    if (score >= 81 && score <= 90) return "B";
    if (score >= 71 && score <= 80) return "C";
    if (score >= 61 && score <= 70) return "D";
    if (score >= 51 && score <= 60) return "E";
    if (score >= 41 && score <= 50) return "F";
    if (score >= 31 && score <= 40) return "G";
    if (score >= 21 && score <= 30) return "H";
    if (score >= 11 && score <= 20) return "I";
    if (score >= 0 && score <= 10) return "J";
    return "J"; // Default case (returning the lowest grade)
}

export default function DataFetcher({ params }: { params: { id: string } }) {
    const [chartData, setChartData] = useState<TestResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the data from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/test-results/dpi?id=${params.id}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data: ApiResponse = await res.json();

                // Transform data to match chart format
                const transformedData: TestResult[] = Object.entries(data.results).map(([category, score]) => ({
                    category,
                    score: Math.min(score, 100),
                }));

                setChartData(transformedData);
            } catch (err) {
                const errorMessage = (err instanceof Error) ? err.message : "Failed to load data";
                console.error("Error fetching data:", errorMessage);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="pt-40">
            <div>
                {chartData.map((result) => {
                    // Type assertion: Ensure TypeScript recognizes this as a DPICategory
                    const categoryData = Object.values(DPI).find(
                        (item) => item.name === result.category
                    ) as DPICategory | undefined;

                    if (!categoryData) return null; // If category is not found, skip

                    const grade = getGrade(result.score);

                    // Safely access the score detail based on the grade
                    const scoreDetail = categoryData.data.Score[grade];

                    return (
                        <div key={result.category} className="border rounded-lg p-4 shadow-md bg-white mb-4">
                            <h3 className="text-xl font-bold">{categoryData.name}</h3>
                            <h4 className="text-lg">Score: {result.score}</h4>
                            <p className="font-semibold">{scoreDetail.text}:</p>
                            <p>Strength: {scoreDetail.Strength}</p>
                            <p className="font-semibold">Remedies:</p>
                            <ul className="list-disc pl-5">
                                {scoreDetail.Remedy.map((remedy, index) => (
                                    <li key={index}>{remedy}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            {/* Pass the fetched data to the RadarResult component */}
            <RadarResult data={chartData} />
        </div>
    );
}
