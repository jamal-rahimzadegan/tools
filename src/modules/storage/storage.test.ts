import { ls, session } from "./storage";
import webStorageKeys from "./web-storage-keys";

const targetStorage = false ? ls : session; // change it to test both

describe("LS should work for single operations ", () => {
	const { userToken, items } = webStorageKeys;
	let tokenValue = "";

	const createItem = (value) => {
		targetStorage.set(userToken, value);
		tokenValue = targetStorage.get(userToken);
	};

	it("number", () => {
		createItem(7);
		expect(tokenValue).toBe(7);
	});

	it("string", () => {
		createItem("random-string");
		expect(tokenValue).toBe("random-string");
	});

	it("null", () => {
		createItem(null);
		expect(tokenValue).toBe(null);
	});

	it("undefined", () => {
		createItem(undefined);
		expect(tokenValue).toBe("undefined");
	});

	it("object", () => {
		createItem({});
		expect(tokenValue).toStrictEqual({});
	});

	it("remove", () => {
		targetStorage.remove(userToken);
		expect(targetStorage.get(userToken)).toStrictEqual(null);
	});
});

//------------------------------------------------------------------
describe("LS should work for multiple operations ", () => {
	const { multipleItems } = webStorageKeys;
	const multipleKeyToGet = Object.keys(multipleItems);

	targetStorage.clear();
	targetStorage.setMultiple(multipleItems);

	beforeAll(() => {
		targetStorage.clear();
		targetStorage.setMultiple(multipleItems);
	});

	it("getMultiple", () => {
		const multiResult = targetStorage.getMultiple(multipleKeyToGet);
		const allResult = targetStorage.allItems;

		expect(multiResult).toStrictEqual(multipleItems);
		expect(allResult).toStrictEqual(multipleItems);
	});

	it("removeMultiple", () => {
		targetStorage.removeMultiple(multipleKeyToGet);
		expect(targetStorage.allItems).toStrictEqual({});
	});

	it("removeAll", () => {
		targetStorage.clear();
		expect(targetStorage.allItems).toStrictEqual({});
	});
});

//------------------------------------------------------------------
// Enable this test if you want to test internals and you should make them public

// describe("LS internal should work", () => {
// 	const { checkPrimitive, checkJSON } = ls;
//
// 	it("checkPrimitive", () => {
// 		expect(checkPrimitive(null)).toBe(true);
// 		expect(checkPrimitive(true)).toBe(true);
// 		expect(checkPrimitive("string")).toBe(true);
// 		expect(checkPrimitive(7)).toBe(true);
// 		expect(checkPrimitive(Symbol("id"))).toBe(true);
// 		expect(checkPrimitive(() => {})).toBe(false);
// 		expect(checkPrimitive({})).toBe(false);
// 	});
//
// 	it("checkJSON", () => {
// 		expect(checkJSON("random-string")).toBe(false);
// 		expect(checkJSON(JSON.stringify({ key: "value" }))).toBe(true);
// 	});
// });
