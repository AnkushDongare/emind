"use client";
import { useState, useEffect } from "react";
import { HindiQuestions} from "./hindi";
import { MarathiQuestions } from "./marathi";
import { EnglishQuestions } from "./english";
import { useRouter } from "next/navigation";

interface Responses {
    [key: number]: "Always" | "Mostly" | "Often" | "Rarely" | "Never" | undefined;
}

interface Scores {
    [key: number]: 1 | 2 | 3 | 4 | 5;
}

interface Test {
    id: string;
    userId: string;
    test: string;
    createdAt: string; // Consider using `Date` if you're parsing these as Date objects
    updatedAt: string;
    code: number;
}

export default function Assessment() {
    const [responses, setResponses] = useState<Responses>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [test, setTest] = useState<Test | null>(null);
    const [lang, setLang] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const testData = localStorage.getItem('test');
            const lang = localStorage.getItem('lang');
            if (testData && lang) {
                setTest(JSON.parse(testData));
                setLang(lang || "english");
            } else {
                router.push(`/tests/verify-code`);  // Redirect if no test data
            }
        }
    }, [router]);

    if (!test) return null; // Prevent rendering until test data is loaded

    const questions = lang === "marathi" ? MarathiQuestions : lang === "hindi" ? HindiQuestions : EnglishQuestions;

    const userId = test?.userId || null;
    if (!userId) {
        router.push(`/tests/verify-code`);
        return null;
    }

    const handleOptionChange = (
        questionSr: number,
        answer: "Always" | "Mostly" | "Often" | "Rarely" | "Never"
    ) => {
        setResponses((prev) => ({ ...prev, [questionSr]: answer }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Calculate the score based on the nature of the question (positive/negative)
    const calculateScores = (): Scores => {
        return questions.reduce<Scores>((scores, question) => {
            const answer = responses[question.sr];

            // Map answers to their respective scores
            const scoreMap: { [key: string]: number } = {
                "Always": 5,
                "Mostly": 4,
                "Often": 3,
                "Rarely": 2,
                "Never": 1,
            };

            let score = 0;

            // If the question's nature is positive, use the scoreMap as is.
            // If negative, reverse the score order.
            if (answer) {
                if (question.nature === "positive") {
                    score = scoreMap[answer];
                } else if (question.nature === "negative") {
                    score = 6 - scoreMap[answer]; // Reverse the score
                }
            }

            scores[question.sr] = score as 1 | 2 | 3 | 4 | 5;
            return scores;
        }, {} as Scores);
    };

    const handleSubmit = async () => {
        const scores = calculateScores();
        console.log("Scores:", scores);

        if (test?.userId) {
            try {
                const response = await fetch("/api/test-responses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: test.userId,
                        test,
                        response: scores,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Success:", result);
                    // Handle success, maybe redirect to a results page
                } else {
                    console.error("Error submitting scores:", response.status);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Personality Assessment</h1>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <p className="text-lg font-medium">{currentQuestion.question}</p>
                </div>
                <div className="flex flex-col mb-6">
                    {["Always", "Mostly", "Often", "Rarely", "Never"].map((option) => (
                        <label key={option} className="flex items-center mb-2">
                            <input
                                type="radio"
                                name={`question-${currentQuestion.sr}`}
                                value={option}
                                checked={responses[currentQuestion.sr] === option}
                                onChange={() => handleOptionChange(currentQuestion.sr, option as "Always" | "Mostly" | "Often" | "Rarely" | "Never")}
                                className="mr-2 h-4 w-4"
                            />
                            <span className="text-md">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <div>
                        {currentQuestionIndex < questions.length - 1 && (
                            <button
                                onClick={handleNextQuestion}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Next
                            </button>
                        )}
                        {currentQuestionIndex === questions.length - 1 && (
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded-md"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}