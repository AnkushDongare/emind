"use client"
import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DPITestInstructions() {
    const [language, setLanguage] = useState('marathi'); // Default to Marathi or any initial value
    const router = useRouter();

    const handleLanguageChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Redirect to the test page with the selected language
        localStorage.setItem('lang', language);
        router.push(`/tests/mis/assessment`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-12 px-4 sm:px-6 lg:px-8 pt-40">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-10 border border-gray-300">
                <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Instructions</h1>

                <div className="mb-12">
                    <p className="text-2xl font-semibold text-gray-800 mb-6">मराठी / Marathi</p>
                    <p className="text-gray-700 leading-relaxed">
                        पुढील पृष्ठावर तुमच्या विचारांच्या आणि कृतींच्या संदर्भात अनेक स्थितिंमध्ये 90 विधांतांचे दिलेले आहेत.
                        प्रत्येक विधांताला लक्ष देऊन वाचा आणि पाच पर्यायी उत्तरांच्या आधारे तुमचा उत्तर निश्चित करा की तुम्ही कसं करता/प्रतिक्रिया करता -
                        <strong className="text-gray-900"> सदैव, अधिकतर, अक्षरी, वारंवार, कधी कधी, कधी नाही</strong> आणि उपयुक्त बॉक्समध्ये एक चिन्ह लावा जो तुमचा उत्तर सर्वोत्तम दर्शवतो.
                        कृपया प्रत्येक विधांताचा उत्तर द्या.
                    </p>
                </div>

                <div className="mb-12">
                    <p className="text-2xl font-semibold text-gray-800 mb-6">हिन्दी / Hindi</p>
                    <p className="text-gray-700 leading-relaxed">
                        अगले पृष्ठ पर विभिन्न स्थितियों में आपकी सोच और कार्यवाही के बारे में 90 कथन दिए गए हैं।
                        प्रत्येक कथन को ध्यान से पढ़ें और पाँच वैकल्पिक उत्तरों के आधार पर अपना उत्तर तय करें कि आप कैसे करते हैं/प्रतिक्रिया करते हैं -
                        <strong className="text-gray-900"> हमेशा, अधिकतर, प्रायः, कभी-कभी, कभी नहीं</strong> और उपयुक्त बॉक्स में एक निशान लगाए जो आपके उत्तर को सबसे उपयुक्त व्यक्त करता हो.
                        कृपया प्रत्येक कथन का उत्तर दें.
                    </p>
                </div>

                <div className="mb-12">
                    <p className="text-2xl font-semibold text-gray-800 mb-6">English</p>
                    <p className="text-gray-700 leading-relaxed">
                        On the next page, 90 statements about your thinking and taking action in various situations have been given.
                        Read each statement carefully and decide your answer on how you act/react based on the five alternative answers,
                        <strong className="text-gray-900"> Always, Mostly, Often, Rarely, and Never</strong> and put a mark in the appropriate box which depicts your answer the best.
                        Please respond to each statement.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <label htmlFor="language" className="block text-xl font-medium text-gray-700 mb-2">
                        भाषा निवडा / भाषा का चयन करें / Select Language:
                    </label>
                    <select
                        name="language"
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 p-3 text-lg font-medium text-gray-900"
                    >
                        <option value="marathi">Marathi</option>
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 px-6 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
                    >
                        Start Test
                    </button>
                </form>
            </div>
        </div>
    );
}
