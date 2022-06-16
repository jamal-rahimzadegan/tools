interface CurrentDate {
	year: number;
	month: {
		number: number;
		name: string;
	};
	day: { number: number; name: string };
}

type ConvertPayload = [year: number, month: number, day: number];

enum PERSIAN_MONTH {
	فروردین,
	اردیبهشت,
	خرداد,
	تیر,
	مرداد,
	شهریور,
	مهر,
	آبان,
	آذر,
	دی,
	بهمن,
	اسفند,
}

export type { CurrentDate, ConvertPayload };
export { PERSIAN_MONTH };
