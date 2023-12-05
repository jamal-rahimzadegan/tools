type ComplexObject<T = string | number | symbol> = Record<T, any>;
type NestedObject = Record<string, any>;

const REGEX_SET = {
  engNum: /[0-9]/g,
  perNum: [/?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g]
};

const PERSIAN_DIGITS = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export { REGEX_SET, PERSIAN_DIGITS, ENGLISH_DIGITS };

class StringUtilize {
  constructor() {}

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

  toCurrency(amount: number): string {
    amount = +this.sanitize(amount);

    const form = new Intl.NumberFormat('en-pt', {
      currency: 'EUR',
      style: 'currency'
    });

    return form.format(amount);
  }

  shortenNumber(num: number | string): string {
    num = +this.sanitize(num);
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
  }

  addLeadingZero(num: number | string): string {
    num = this.sanitize(num);
    return String(num).padStart(2, '0');
  }

  camelize(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  private sanitize(txt: string | number): string {
    if ([undefined, null].includes(txt)) return '';
    if (typeof txt === 'number') return txt.toString();
    return txt;
  }
}

export default new StringUtilize();
