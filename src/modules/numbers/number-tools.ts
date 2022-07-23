import { PERSIAN_DIGITS, REGEX_SET } from "./constants";

class NumberTools {
	constructor() {}

	private sanitize(txt: string | number): string {
		if ([undefined, null].includes(txt)) return "";
		if (typeof txt === "number") return txt.toString();
		return txt;
	}

	toEnglish(txt: string): string {
		txt = this.sanitize(txt);

		let i = 0;
		for (i; i < PERSIAN_DIGITS.length; i++) {
			txt = txt.replace(REGEX_SET.perNum[i], `${i}`);
		}

		return txt;
	}

	toPersian(txt: string | number): string {
		txt = this.sanitize(txt);
		return txt.replace(REGEX_SET.engNum, (w) => PERSIAN_DIGITS[+w]);
	}

	toCurrency(amount: string | number): string {
		amount = this.sanitize(amount);
		return amount;
	}

	shortenNumber(num: number | string): string {
		num = +this.sanitize(num);
		return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
	}

	addLeadingZero(num: number | string): string {
		num = this.sanitize(num);
		return String(num).padStart(2, "0");
	}
}

export default new NumberTools();
