export const objectInArray = (arrOfObjects: Array<any>, IdToSearch: string) => {
	/*
    get array of objects with _Id property of type 'object'
    find the index in the array of the object who meets the "IdToSearch = _id"
    return the index
    */

	for (let i = 0; i < arrOfObjects.length; i++) {
		if (!arrOfObjects[i]._id) {
			return false;
		}
		if (arrOfObjects[i]._id.toString() === IdToSearch) {
			return arrOfObjects[i];
		} else {
			return false;
		}
	}
};
