export const requestID = () => {
    const timey = new Date().getTime();
    const randy = Math.floor(Math.random() * 1000000);
    return timey.toString() + randy.toString();
};
