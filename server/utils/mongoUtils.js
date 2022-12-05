import { ObjectId } from "mongodb";

export function arrayStringToObjectId(arrayOfStrings) {
    for (let i = 0; i < arrayOfStrings.length; i++) {
        arrayOfStrings[i] = ObjectId(arrayOfStrings[i]);
    }
    return arrayOfStrings;
}


