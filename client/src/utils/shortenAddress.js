/**
 * It takes a string, and returns a string that is the first 6 characters of the original string,
 * followed by 3 dots, followed by the last 4 characters of the original string
 * @param address - The address to shorten.
 * @returns A function that takes an address as an argument and returns a string.
 */
export const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};