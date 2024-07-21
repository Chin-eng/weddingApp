import { List } from "./list";
import {Guest} from './guest';




/**
 * Returns min number of guests
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
export const min_guest = (L: List<Guest>): bigint => {
    
    if (L.kind === 'nil') {
        return 0n;
    } 

    if (L.hd.additionalGuestNumber === 1) {
        return 2n + min_guest(L.tl);
    } else if (L.hd.additionalGuestNumber == 0) {
        return 1n + min_guest(L.tl)
    } else {
        return 1n + min_guest(L.tl)
    }
    
};

/**
 * Returns max number of guests
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
export const max_guest = (L: List<Guest>): bigint => {
    if (L.kind === 'nil') {
        return 0n; 
    }

    if (L.hd.additionalGuestNumber === 1) {
        return 2n + max_guest(L.tl);
    } else if (L.hd.additionalGuestNumber == 0) {
        return 1n + max_guest(L.tl)
    } else {
        return 2n + max_guest(L.tl)
    }

}



/**
 * Returns family count
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
export const countFamily = (L: List<Guest>): bigint => {
    if (L.kind === 'nil') {
        return 0n
    }

    if (L.hd.isFamily === true) {
        return 1n + countFamily(L.tl);
    } else {
        return countFamily(L.tl);
    }
}