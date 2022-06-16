const webStorageKeys = {};

type Keys = keyof typeof webStorageKeys;
type MultipleItem = Partial<Record<Keys, any>>;
type ItemDestruction = [Keys, any];

class Storage {
	get(key: Keys) {
		try {
			const value = localStorage.getItem(key);
			const isJson = this.checkJSON(value);
			return isJson ? JSON.parse(value) : value;
		} catch (e) {
			console.error("err in ls get", e);
		}
	}

	getMultiple(keys: Keys[]) {
		try {
			let items: MultipleItem = {};
			let i = keys.length;
			while (i--) {
				// @ts-ignore
				items[keys[i]] = this.get(keys[i]);
			}
			return items;
		} catch (e) {
			console.error("err in ls get multi", e);
		}
	}

	getAll() {
		try {
			let items = {};
			let keys = Object.keys(localStorage) as Array<Keys>;
			let i = keys.length;
			while (i--) {
				// @ts-ignore
				items[keys[i]] = this.get(keys[i]);
			}

			return items;
		} catch (e) {
			console.error("err in ls get all", e);
		}
	}

	set(key: Keys, value: any) {
		try {
			const isPrimitive = this.checkPrimitive(value);
			const updatedValue = isPrimitive ? value : JSON.stringify(value);
			localStorage.setItem(key, updatedValue);
		} catch (e) {
			console.error("err in ls set", e);
		}
	}

	setMultiple(items: MultipleItem) {
		try {
			return Object.entries(items).forEach(([key, value]: ItemDestruction) => {
				this.set(key, value);
			});
		} catch (e) {
			console.error("err in ls set multi", e);
		}
	}

	remove(key: Keys) {
		try {
			return localStorage.removeItem(key);
		} catch (e) {
			console.error("err in ls remove", e);
		}
	}

	removeMultiple(keys: Keys[]) {
		try {
			return keys.forEach((k) => this.remove(k));
		} catch (e) {
			console.error("err in ls remove multi", e);
		}
	}

	removeAll() {
		try {
			return localStorage.clear();
		} catch (e) {
			console.error("err in ls remove all", e);
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
		return !(typeof value == "object" || typeof value == "function");
	}
}

export default new Storage();
