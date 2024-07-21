import {Guest} from './guest';

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === "object";
};


/**
 * Function to check if an array element is a valid [string, Guest] tuple
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isValidGuestEntry = (entry: unknown): entry is [string, Guest] => {
  return Array.isArray(entry) &&
    entry.length === 2 &&
    typeof entry[0] === 'string' &&
    isRecord(entry[1]) &&
    typeof entry[1].name === 'string' &&
    typeof entry[1].age === 'number';
};



/**
 * // Function to check if the data is the expected format
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */

export const isValidGuestData = (data: unknown): data is { Guests: unknown } => {
  return isRecord(data) && Array.isArray(data.Guests);
};