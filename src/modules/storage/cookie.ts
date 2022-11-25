import {CookieOptions, MultipleCookie} from "./types";
import {checkIsJSON, checkIsPrimitive} from "./helpers";

class Cookie {
    set(name: string, value: any, options?: CookieOptions) {
        const {secure, path = '/', expires = 365} = options || {};
        const isPrimitive = checkIsPrimitive(value);
        const updatedValue = isPrimitive ? value : JSON.stringify(value);

        const cookie = `${name}=${updatedValue};${secure ? 'secure' : ''};path=${path};expires=${this.setExpireDate(
            expires
        )}`;

        if (typeof document !== 'undefined') document.cookie = cookie;
    }

    setMultiple(cookieList: MultipleCookie) {
        cookieList.map((cookie) => {
            const {name, value, options} = cookie || {};
            this.set(name, value, options);
        });
    }

    get(name: string) {
        let cookies = '';
        if (typeof document !== 'undefined') cookies = document.cookie;
        const targetCookie = cookies.match(`(^|;) ?${name}=([^;]*)(;|$)`)?.[2];
        const isJson = checkIsJSON(targetCookie);
        return isJson ? JSON.parse(targetCookie) : targetCookie;
    }

    getMultiple(names: string[]) {
        let cookies = {};
        if (typeof document !== 'undefined') cookies = this.getAll();
        let matchCookies = {};
        names.filter((name) => (matchCookies[name] = cookies[name]));
        return matchCookies;
    }

    getAll() {
        let formattedCookies = [];
        let allCookies = {};
        if (typeof document !== 'undefined') formattedCookies = document.cookie.split(';');

        formattedCookies?.map((cookie) => {
            const cookieName = cookie.split('=')[0].trim();
            allCookies[cookieName] = this.get(cookieName);
        });

        return allCookies;
    }

    remove(name: string) {
        const expiredCookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (typeof document !== 'undefined') document.cookie = expiredCookie;
    }

    removeMultiple(names: string[]) {
        names.map((name) => this.remove(name));
    }

    removeAll() {
        let allCookies = [];
        if (typeof document !== 'undefined') allCookies = document.cookie.split(';');
        allCookies.map((cookieItem) => this.remove(cookieItem.split('=')[0]));
    }

    protected setExpireDate(expDays: number) {
        const expires = 24 * 60 * 60 * 1000 * expDays;
        let date = new Date();
        date.setTime(date.getTime() + expires);
        return date.toUTCString();
    }
}

export default new Cookie();
