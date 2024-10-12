export const getFullDateWithTime = (val: string): string => {
    const dateAndTime = val.split('T');
    const date = dateAndTime[0].split('-').reverse().join('-');
    const time = dateAndTime[1].split('.')[0];
    // make it return date in first row and time in second row
    return `${date}\n${time}`;
};