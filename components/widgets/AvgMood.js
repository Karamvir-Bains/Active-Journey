import { FontAwesomeIcon, faFaceSmile } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useData } from "../../store/DataContext";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";

export default function AvgMood(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { data } = useData();
  const [avgMood, setAvgMood] = useState(0);

  useEffect(() => {
    if (data && data[4] && data[4].user_metric_data) {
      const lastSevenValues = data[4].user_metric_data.slice(-7);
      const sum = lastSevenValues.reduce((acc, curr) => acc + curr.metric_value, 0);
      const average = sum / lastSevenValues.length;
      setAvgMood(Number(average.toFixed(2)));
    }
  }, [data]);

  return(
    <>
    <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
      <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Average Mood</h3>
      <p className="font-bold">Last 7 Days: {avgMood}/10</p>
      <div className="overflow-hidden px-6 py-3 w-[80%] h-[auto] max-h-[75%] flex flex-col mx-auto">
        {/* ! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
        { avgMood <= 10 && avgMood >= 7 ? (
          <svg className="max-h-[90%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#E4C811" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
          </svg>
        ) : avgMood < 7 && avgMood > 4 ? (
          <svg className="max-h-[90%]"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#73CEC3" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"/>
          </svg>
        ) : avgMood <= 3 && avgMood >= 1 ? (
          <svg className="max-h-[90%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#3266B8" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
          </svg>
        ) : (
          <svg className="max-h-[90%]" fill="#CFCFCF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm208.4-48a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm128 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
          </svg>
        )}
      </div>
    </div>
    </>
  );
}