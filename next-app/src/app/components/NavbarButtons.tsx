"use client"

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";
interface WeatherData {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
export default function NavbarButtons() {
    const [data, setData] = useState<WeatherData[]>([]);

    async function refData() {
        try {
            const response = await fetch('https://localhost:44348/WeatherForecast');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const fetchedData = await response.json();
            setData(fetchedData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return (
        <>
            <button onClick={refData}
             className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
             ><span
                className="absolute inset-x-0 top-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"
            ></span>

                <span
                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                >
                    Download
                </span></button>
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
                        {data.map((item: { date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; temperatureC: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; summary: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
                            <tr key={index} className="hover:table-fixed">
                                <td className="w-48  text-center">{item.date}</td>
                                <td className="w-48  text-center">{item.temperatureC}°C</td>
                                <td className="w-48  text-center">{item.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
