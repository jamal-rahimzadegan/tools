import webStorageKeys from "./web-storage-keys";

type Keys = keyof typeof webStorageKeys;

type MultipleItem = Partial<Record<Keys, any>>;

type ItemDestruction = [Keys, any];

type TargetStorage = "localStorage" | "sessionStorage";

interface CookieOptions {
    res?: any;
    req?: any;
    expires?: number; // in days
    path?: string;
    secure?: boolean;
}

type MultipleCookie = Array<{
    name: string;
    value: any;
    options?: CookieOptions;
}>;

export {Keys, MultipleItem, ItemDestruction, TargetStorage, CookieOptions, MultipleCookie}