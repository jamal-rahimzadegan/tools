function checkIsJSON(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

function checkIsPrimitive(value: any): boolean {
    if (value === null) return true;
    return !(typeof value == "object" || typeof value == "function");
}

export {checkIsJSON, checkIsPrimitive}