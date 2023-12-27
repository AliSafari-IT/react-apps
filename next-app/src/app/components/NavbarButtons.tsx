"use client"

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useMemo, useState } from "react";
interface WeatherData {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
export default function NavbarButtons() {
    const [data, setData] = useState<WeatherData[]>([]);
    const freezingDays = useMemo(() => {
        return data.filter(item => item.temperatureC < 0);
    }, [data]);
    const chillyDays = useMemo(() => {
        return data.filter(item => item.summary == "Chilly");
    }, [data]);
    // Count days for each summary value
    const summaryCounts = useMemo(() => {
        const counts = new Map<string, number>();
        data.forEach(item => {
            counts.set(item.summary, (counts.get(item.summary) || 0) + 1);
        });
        return Array.from(counts.entries());
    }, [data]);

    async function refData() {
        try {
            const response = await fetch('https://localhost:44348/WeatherForecast') ?? await fetch('http://localhost:5252/WeatherForecast');
            if (!response.ok) {
                throw new Error(`Error occurred in fetching data: ${response.status}`);
            }
            console.log({ "fetchedResponse": response });

            const fetchedData = await response.json();
            console.log({ "fetchedDataJson": fetchedData });

            setData(fetchedData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return (
        <>
            <button
                onClick={refData}
                className="group relative inline-block m-5 p-5 text-center text-sm font-medium text-white focus:outline-none focus:ring  shadow rounded"
            >
                <span
                    className="absolute inset-x-0 top-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"
                ></span>

                <span
                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                >
                    Reload
                </span>
            </button>

            {data.length > 0 && (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="w-48  items-center shadow rounded">Date</th>
                            <th className="w-48  items-center shadow rounded">Temp (°C)</th>
                            <th className="w-48  items-center shadow rounded">Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: { date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; temperatureC: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; summary: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
                            <tr key={index} className="hover:table-fixed">
                                <td className="w-48  text-center">{item.date}</td>
                                <td className="w-48  text-center">{item.temperatureC}°C</td>
                                <td className="w-48  text-center">{item.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className=" font-serif text-3xl text-center  font-bold leading-tight text-red-400">Chilly Days</div>
            {chillyDays?.length > 0 && (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="w-48  items-center shadow rounded">Date</th>
                            <th className="w-48  items-center shadow rounded">Temp (°C)</th>
                            <th className="w-48  items-center shadow rounded">Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chillyDays.map((item, index) => (
                            <tr key={index} className="hover:table-fixed">
                                <td className="w-48 text-center">{item.date}</td>
                                <td className="w-48 text-center">{item.temperatureC}°C</td>
                                <td className="w-48 text-center">{item.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className=" font-serif text-3xl text-center  font-bold leading-tight text-blue-400">Freezing Days</div>
            {freezingDays?.length > 0 && (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="w-48  items-center shadow rounded">Date</th>
                            <th className="w-48  items-center shadow rounded">Temp (°C)</th>
                            <th className="w-48  items-center shadow rounded">Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {freezingDays.map((item, index) => (
                            <tr key={index} className="hover:table-fixed">
                                <td className="w-48 text-center">{item.date}</td>
                                <td className="w-48 text-center">{item.temperatureC}°C</td>
                                <td className="w-48 text-center">{item.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className=" font-serif text-3xl text-center  font-bold leading-tight text-purple-900">Frequency</div>
            {summaryCounts.length > 0 && (
                <table className="table-auto mt-5">
                    <thead>
                        <tr>
                            <th className="w-48 text-center">Summary</th>
                            <th className="w-48 text-center">Number of Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryCounts.map(([summary, count], index) => (
                            <tr key={index} className="hover:table-fixed">
                                <td className="w-48 text-center">{summary}</td>
                                <td className="w-48 text-center">{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
