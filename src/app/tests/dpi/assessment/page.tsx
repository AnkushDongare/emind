"use client";
import { useState, useEffect } from "react";
import { questions } from "./hind";
import { useRouter } from "next/navigation";

interface Responses {
    [key: number]: "yes" | "no" | undefined;
}

interface Scores {
    [key: number]: 1 | 0;
}
interface Test {
    id: string;
    userId: string;
    test: string;
    createdAt: string; // Consider using `Date` type if you are parsing it as a Date object
    updatedAt: string; // Same as above
    code: number;
}

export default function Assessment() {
    const [responses, setResponses] = useState<Responses>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [test, setTest] = useState<Test | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const testData = localStorage.getItem('test');
            if (testData) {
                setTest(JSON.parse(testData));
            } else {
                router.push(`/tests/verify-code`);  // Redirect if no test data
            }
        }
    }, [router]);

    if (!test) return null; // Prevent rendering until test data is loaded

    const userId = test?.userId || null;
    if (!userId) {
        router.push(`/tests/verify-code`);
        return null;
    }

    const handleOptionChange = (questionSr: number, answer: "yes" | "no") => {
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

    const calculateScores = (): Scores => {
        return questions.reduce<Scores>((scores, question) => {
            if (responses[question.sr]) {
                const score = responses[question.sr] === question.nature ? 1 : 0;
                scores[question.sr] = score;
            }
            return scores;
        }, {} as Scores);
    };

    const handleSubmit = async () => {
        const scores = calculateScores();

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
                    <label className="flex items-center mb-2">
                        <input
                            type="radio"
                            name={`question-${currentQuestion.sr}`}
                            value="yes"
                            checked={responses[currentQuestion.sr] === "yes"}
                            onChange={() => handleOptionChange(currentQuestion.sr, "yes")}
                            className="mr-2 h-4 w-4"
                        />
                        <span className="text-md">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name={`question-${currentQuestion.sr}`}
                            value="no"
                            checked={responses[currentQuestion.sr] === "no"}
                            onChange={() => handleOptionChange(currentQuestion.sr, "no")}
                            className="mr-2 h-4 w-4"
                        />
                        <span className="text-md">No</span>
                    </label>
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
