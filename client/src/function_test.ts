import * as assert from 'assert';
import { countFamily, max_guest, min_guest } from "./functions";
import { Guest } from "./guest";
import { explode_array} from "./list";




describe('functions', function() {
    it('min_guest', function() {
        const guest1: Guest = {
            name: 'chinee',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 2, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest2: Guest = {
            name: 'mongolia',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest3: Guest = {
            name: 'gabriel',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 1, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest4: Guest = {
            name: 'Kevin',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }

        const guest_array1: Array<Guest> = [guest1, guest2];
        const guest_array2: Array<Guest> = [guest3, guest4];
        const guest_array3: Array<Guest> = [guest1, guest2, guest3, guest4];
        const guest_array4: Array<Guest> = [guest2, guest1, guest3, guest4];
        // 0-1-many: base case, 0 recursive calls            
        assert.strictEqual(min_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        assert.strictEqual(min_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        // 0-1-many: 1 recursive call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testing if the min is 2
        assert.strictEqual(min_guest(explode_array(guest_array2)), 3n); // tesing if the min is 3
        // 0-1-many: 2+ recursive calls
        assert.strictEqual(min_guest(explode_array(guest_array3)), 5n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array4)), 5n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testiing in 2+ recurisve call
    })

    it('max_guest', function() {
        const guest1: Guest = {
            name: 'chinee',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 2, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest2: Guest = {
            name: 'mongolia',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest3: Guest = {
            name: 'gabriel',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 1, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest4: Guest = {
            name: 'Kevin',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest_array1: Array<Guest> = [guest1, guest2];
        const guest_array2: Array<Guest> = [guest3, guest4];
        const guest_array3: Array<Guest> = [guest1, guest2, guest3, guest4];
        const guest_array4: Array<Guest> = [guest2, guest1, guest3, guest4];
        // 0-1-many: base case, 0 recursive calls            
        assert.strictEqual(max_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        assert.strictEqual(max_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        // 0-1-many: 1 recursive call
        assert.strictEqual(max_guest(explode_array(guest_array1)), 3n); // testing if the max is 3
        assert.strictEqual(max_guest(explode_array(guest_array2)), 3n); // testing if the max is 3
        // 0-1-many: 2+ recursive calls
        assert.strictEqual(max_guest(explode_array(guest_array3)), 6n); // testiing in 2+ recurisve call
        assert.strictEqual(max_guest(explode_array(guest_array4)), 6n); // testiing in 2+ recurisve call
        assert.strictEqual(max_guest(explode_array(guest_array1)), 3n); // testiing in 2+ recurisve call
        assert.strictEqual(max_guest(explode_array(guest_array1)), 3n); // testiing in 2+ recurisve call
    })

    it('countFamily', function() {
        const guest1: Guest = {
            name: 'chinee',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 2, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest2: Guest = {
            name: 'mongolia',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: true
        }
        const guest3: Guest = {
            name: 'gabriel',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 1, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest4: Guest = {
            name: 'Kevin',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: true
        }

        const guest_array1: Array<Guest> = [guest1, guest2];
        const guest_array2: Array<Guest> = [guest3, guest4];
        const guest_array3: Array<Guest> = [guest1, guest2, guest3, guest4];
        const guest_array4: Array<Guest> = [guest2, guest1, guest3, guest4];
        // 0-1-many: base case, 0 recursive calls            
        assert.strictEqual(min_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        assert.strictEqual(min_guest(explode_array([])), 0n); //testing if it is retruning nil when empty array
        // 0-1-many: 1 recursive call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testing if the min is 2
        assert.strictEqual(min_guest(explode_array(guest_array2)), 3n); // tesing if the min is 3
        // 0-1-many: 2+ recursive calls
        assert.strictEqual(min_guest(explode_array(guest_array3)), 5n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array4)), 5n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testiing in 2+ recurisve call
        assert.strictEqual(min_guest(explode_array(guest_array1)), 2n); // testiing in 2+ recurisve call
    })

    it('max_guest', function() {
        const guest1: Guest = {
            name: 'chinee',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 2, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest2: Guest = {
            name: 'mongolia',
            guestOf: "Molly",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: true
        }
        const guest3: Guest = {
            name: 'gabriel',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 1, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: true
        }
        const guest4: Guest = {
            name: 'Kevin',
            guestOf: "James",
            dietRestriction: 'sugar',
            additionalGuestNumber: 0, 
            additonalGuestName: 'chinehuu',
            additionalGuestDiteryRestriction: 'alcochol',
            isFamily: false
        }
        const guest_array1: Array<Guest> = [guest1, guest2];
        const guest_array2: Array<Guest> = [guest3, guest4];
        const guest_array3: Array<Guest> = [guest1, guest2, guest3, guest4];
        const guest_array4: Array<Guest> = [guest2, guest1, guest3, guest4];
        // 0-1-many: base case, 0 recursive calls
        assert.strictEqual(countFamily(explode_array([])), 0n); //testing if it is retruning nil when empty array
        assert.strictEqual(countFamily(explode_array([])), 0n); //testing if it is retruning nil when empty array
        // 0-1-many: 1 recursive call
        assert.strictEqual(countFamily(explode_array(guest_array2)), 1n); // testing if the min is 2
        assert.strictEqual(countFamily(explode_array(guest_array3)), 2n); // tesing if the min is 3
        // 0-1-many: 2+ recursive calls
        assert.strictEqual(countFamily(explode_array(guest_array3)), 2n); // testiing in 2+ recurisve call
        assert.strictEqual(countFamily(explode_array(guest_array4)), 2n); // testiing in 2+ recurisve call
        assert.strictEqual(countFamily(explode_array(guest_array1)), 1n); // testiing in 2+ recurisve call
        assert.strictEqual(countFamily(explode_array(guest_array1)), 1n); // testiing in 2+ recurisve call
    })
})