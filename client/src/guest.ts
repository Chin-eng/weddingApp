import { isRecord } from "./record";

export type Guest = {
    name: string,
    guestOf: string, 
    dietRestriction: string,
    additionalGuestNumber: number,
    additonalGuestName: string,
    additionalGuestDiteryRestriction: string, 
    isFamily: boolean, 
  };



/**
 * Parses unknown data into an Guest. Will log an error and return undefined
 * if it is not a valid Guest.
 * @param val unknown data to parse into an Guest
 * @return Guest if val is a valid Guest and undefined otherwise
 */
export const parseGuest = (val: unknown): undefined | Guest => {
  if (!isRecord(val)) {
    console.error("not an guest", val)
    return undefined;
  }

  if (typeof val.name !== "string") {
    console.error("not an guest: missing 'name'", val)
    return undefined;
  }

  if (typeof val.guestOf !== "string") {
    console.error("not an guestOf: missing 'description'", val)
    return undefined;
  }

  if (typeof val.dietRestriction !== "string") {
    console.error("not an guest: missing 'dietRestriction'", val)
    return undefined;
  }

  if (typeof val.additionalGuestNumber !== "number" ) {
    console.error("not an guest: missing or invalid 'additionalGuestNumber'", val)
    return undefined;
  }

  if (typeof val.additonalGuestName !== "string") {
    console.error("not an guest: missing or invalid 'additonalGuestName'", val)
    return undefined;
  }

  if (typeof val.additionalGuestDiteryRestriction !== "string") {
    console.error("not an guest: missing or invalid 'additionalGuestDiteryRestriction'", val)
    return undefined;
  }
  
  if (typeof val.isFamily !== "boolean") {
    console.error("not an guest: missing or invalid 'isFamily'", val)
    return undefined;
  }

  return {
    name: val.name, 
    guestOf: val.guestOf,
    dietRestriction: val.dietRestriction, 
    additionalGuestNumber: val.additionalGuestNumber, 
    additonalGuestName: val.additonalGuestName,
    additionalGuestDiteryRestriction: val.additionalGuestDiteryRestriction, 
    isFamily: val.isFamily, 
  };
};


