window.onload = function () {



let homeSchema = mongoose.Schema({
    "id": Number,
    "owner": String,
    "ownerPicture_url": String,
    "propertyType": String,
    "title": String,
    "location": String,
    "numberOfGuests": Number,
    "studio": Boolean
    "numberOfRooms": Number,
    "numberBeds": Number,
    "numberOfBaths": Number,
    "numberOfViews": Number,
    "homeHighlights": Schema.Types.Mixed,
    "descriptionSummary": String,
    "description": Schema.Types.Mixed,
    "Amenities": Schema.Types.Mixed,
    "sleepingArrangments": [String],
    "smoking": Boolean,
    "petSuitable": Boolean,
    "partiesOrEvents": Boolean,
    "noSafeForChildrenUnder": Number,
    "checkInStartTime": String,
    "checkInEndTime": String,
    "checkOutTime": String,
    "selfCheckInWithLockBox": Boolean,
    "allRules": Schema.Types.Mixed,
    "cancellationType": Number,
    "cancelationSummary": String,
    "nightsOfStayVary": Boolean,
    "nightsOfMinimumStay": Number,
    "nightsOfMinimumStayForDateRange": Schema.Types.Mixed,
    "daysFromLastUpdate": Number
};










}
