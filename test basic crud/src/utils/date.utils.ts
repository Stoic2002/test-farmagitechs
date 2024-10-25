export const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.getDate()} ${start.toLocaleString('default', { month: 'long' })} ${start.getFullYear()} - ${end.getDate()} ${end.toLocaleString('default', { month: 'long' })} ${end.getFullYear()}`;
};