import seSt from './session';

describe('Session Service should work for single operations ', () => {
    const singleKey = 'singleKey';
    let testValue;

    const createItem = (value) => {
        seSt.set(singleKey, value);
        testValue = seSt.get(singleKey);
    };

    it('number', () => {
        createItem(7);
        expect(testValue).toBe(7);
    });

    it('string', () => {
        createItem('random-string');
        expect(testValue).toBe('random-string');
    });

    it('null', () => {
        createItem(null);
        expect(testValue).toBe(null);
    });

    it('undefined', () => {
        createItem(undefined);
        expect(testValue).toBe('undefined');
    });

    it('object', () => {
        const MOCK_OBJECT = [{ name: 'John Doe', isDeveloper: true, city: null, info: { age: 16 } }];
        createItem(MOCK_OBJECT);
        expect(testValue).toStrictEqual(MOCK_OBJECT);
    });

    it('remove', () => {
        seSt.remove(singleKey);
        expect(seSt.get(singleKey)).toStrictEqual(null);
    });
});

//------------------------------------------------------------------
describe('Session Service should work for multiple operations ', () => {
    const items = { name: 'John', family: 'Doe', info: { age: 16 } };
    const multipleKeyToGet = Object.keys(items);
    seSt.setMultiple(items);

    it('getMultiple', () => {
        const multiResult = seSt.getMultiple(multipleKeyToGet);
        const allResult = seSt.getAll();

        expect(multiResult).toStrictEqual(items);
        expect(allResult).toStrictEqual(items);
    });

    it('removeMultiple', () => {
        seSt.removeMultiple(multipleKeyToGet);
        expect(seSt.getAll()).toStrictEqual({});
    });

    it('removeAll', () => {
        seSt.removeAll();
        expect(seSt.getAll()).toStrictEqual({});
    });
});