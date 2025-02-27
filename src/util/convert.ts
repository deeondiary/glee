export const dateTimeFormat = (originalDate: string) => {
    const date = originalDate.split('T')[0].split('-');
    return `${date[0]}.${date[1]}.${date[2]}`;
}