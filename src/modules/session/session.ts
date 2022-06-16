class SessionService {
	get(key: string): any {
		try {
			const value = sessionStorage.getItem(key);
			const isJson = this.checkJSON(value);
			return isJson ? JSON.parse(value) : value;
		} catch (e) {
			console.log('err in ls get', e);
		}
	}

	getMultiple(keys: string[]) {
		try {
			let items = {};
			let i = keys.length;
			while (i--) items[keys[i]] = this.get(keys[i]);
			return items;
		} catch (e) {
			console.log('err in ls get multi', e);
		}
	}

	getAll() {
		try {
			let items = {};
			let keys = Object.keys(sessionStorage);
			let i = keys.length;
			while (i--) items[keys[i]] = this.get(keys[i]);

			return items;
		} catch (e) {
			console.log('err in ls get all', e);
		}
	}

	set(key: string, value: any) {
		try {
			const isPrimitive = this.checkPrimitive(value);
			const updatedValue = isPrimitive ? value : JSON.stringify(value);
			sessionStorage.setItem(key, updatedValue);
		} catch (e) {
			console.log('err in ls set', e);
		}
	}

	setMultiple(items: object) {
		try {
			return Object.entries(items).forEach(([key, value]) => this.set(key, value));
		} catch (e) {
			console.log('err in ls set multi', e);
		}
	}

	remove(key: string) {
		try {
			return sessionStorage.removeItem(key);
		} catch (e) {
			console.log('err in ls remove', e);
		}
	}

	removeMultiple(keys: string[]) {
		try {
			return keys.forEach((k) => this.remove(k));
		} catch (e) {
			console.log('err in ls remove multi', e);
		}
	}

	removeAll() {
		try {
			return sessionStorage.clear();
		} catch (e) {
			console.log('err in ls remove all', e);
		}
	}

	protected checkJSON(str: string): boolean {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}

		return true;
	}

	protected checkPrimitive(value: any): boolean {
		if (value === null) return true;
		return !(typeof value == 'object' || typeof value == 'function');
	}
}

export default new SessionService();