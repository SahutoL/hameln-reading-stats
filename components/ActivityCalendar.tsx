import React from "react";
import { CalendarData } from "../types";

interface ActivityCalendarProps {
  data: CalendarData;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ data }) => {
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setDate(today.getDate() - 365);

  const dates = [];
  let currentDate = new Date(yearAgo);
  // Align to the last Sunday
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  while (currentDate <= today) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const maxWords = Math.max(...Array.from(data.values()), 0);

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    const percentage = Math.min(count / (maxWords * 0.75), 1); // Cap intensity to make variations more visible
    if (percentage < 0.25) return "bg-primary/20";
    if (percentage < 0.5) return "bg-primary/40";
    if (percentage < 0.75) return "bg-primary/70";
    return "bg-primary";
  };

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthStarts = [];
  let lastMonth = -1;
  for (let i = 0; i < dates.length; i++) {
    const month = dates[i].getMonth();
    if (month !== lastMonth) {
      monthStarts.push({ month: month, week: Math.floor(i / 7) });
      lastMonth = month;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-rows-7 grid-flow-col gap-1 w-full overflow-x-auto p-2">
        {dates.map((date, index) => {
          const dateString = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          const wordCount = data.get(dateString) || 0;
          const dayOfWeek = date.getDay();

          const column = Math.floor(index / 7);
          const totalColumns = Math.ceil(dates.length / 7);
          let tooltipHPosition = "left-1/2 -translate-x-1/2";

          // Adjust for the first few columns to prevent left overflow
          if (column < 3) {
            tooltipHPosition = "left-0";
          }
          // Adjust for the last few columns to prevent right overflow
          else if (column > totalColumns - 4) {
            tooltipHPosition = "right-0";
          }

          const tooltipVPosition =
            dayOfWeek < 3 ? "top-full mt-2" : "bottom-full mb-2";

          return (
            <div
              key={index}
              className="relative group w-4 h-4 rounded-sm"
              style={{ gridRow: dayOfWeek + 1 }}
            >
              <div className={`w-full h-full ${getColor(wordCount)}`} />
              <div
                className={`absolute z-10 ${tooltipVPosition} ${tooltipHPosition} w-max p-2 text-xs text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              >
                {wordCount > 0
                  ? `${wordCount.toLocaleString()} words`
                  : "No activity"}{" "}
                on {date.toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-between w-full text-xs text-gray-400 mt-2 px-2"
        style={{ maxWidth: "calc(53 * (1rem / 4 + 0.25rem))" }}
      >
        {monthLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-gray-800"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/20"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/40"></div>
        <div className="w-4 h-4 rounded-sm bg-primary/70"></div>
        <div className="w-4 h-4 rounded-sm bg-primary"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityCalendar;
