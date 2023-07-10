import { getOrdinalSuffix } from "./GetOrdinalSuffix";

export const formatDate = (date: string) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
    
    const dayOfWeek = adjustedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = adjustedDate.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    
    return `${dayOfWeek} ${dayOfMonth}${ordinalSuffix}`;
  }
  