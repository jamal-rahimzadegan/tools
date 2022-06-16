import ls from "./storage";

describe("LS should work for single operations ", () => {
    const singleKey = "singleKey";
    let testValue;

    const createItem = (value) => {
        ls.set(singleKey, value);
        testValue = ls.get(singleKey);
    };

    it("number", () => {
        createItem(7);
        expect(testValue).toBe(7);
    });

    it("string", () => {
        createItem("random-string");
        expect(testValue).toBe("random-string");
    });

    it("null", () => {
        createItem(null);
        expect(testValue).toBe(null);
    });

    it("undefined", () => {
        createItem(undefined);
        expect(testValue).toBe("undefined");
    });

    it("object", () => {
        const MOCK_OBJECT = [
            { name: "John Doe", isDeveloper: true, city: null, info: { age: 16 } },
        ];
        createItem(MOCK_OBJECT);
        expect(testValue).toStrictEqual(MOCK_OBJECT);
    });

    it("remove", () => {
        ls.remove(singleKey);
        expect(ls.get(singleKey)).toStrictEqual(null);
    });
});

//------------------------------------------------------------------
describe("LS should work for multiple operations ", () => {
    const items = { name: "John", family: "Doe", info: { age: 16 } };
    const multipleKeyToGet = Object.keys(items);
    ls.setMultiple(items);

    it("getMultiple", () => {
        const multiResult = ls.getMultiple(multipleKeyToGet);
        const allResult = ls.getAll();

        expect(multiResult).toStrictEqual(items);
        expect(allResult).toStrictEqual(items);
    });

    it("removeMultiple", () => {
        ls.removeMultiple(multipleKeyToGet);
        expect(ls.getAll()).toStrictEqual({});
    });

    it("removeAll", () => {
        ls.removeAll();
        expect(ls.getAll()).toStrictEqual({});
    });
});

//------------------------------------------------------------------
//Todo: Enable this test if you want to test internals and you should make them public

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