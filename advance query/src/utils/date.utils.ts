export const formatDateRange = (startDate: Date, endDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    return `${startDate.toLocaleDateString('id-ID', options)} s.d ${endDate.toLocaleDateString('id-ID', options)}`;
};