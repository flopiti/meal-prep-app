export const getDateStrings = (mainDate: Date) => {
    const dateStrings = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(mainDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().slice(0, 10);
      dateStrings.push(dateString);
    }
    return dateStrings;
}