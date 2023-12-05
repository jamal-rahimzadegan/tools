type ComplexObject<T = string | number | symbol> = Record<T, any>;
type NestedObject = Record<string, any>;
type SwitchCase = {
  [K in 'camel' | 'kebab']: (str: string) => string;
};

const REGEX_SET = {
  engNum: /[0-9]/g,
  perNum: [/?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g, /?/g],
  CHECK_KEBAB: /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  CHECK_CAMEL: /(?:^\w|[A-Z]|\b\w|\s+)/g
};

const PERSIAN_DIGITS = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

  private sanitize(txt: string | number): string {
    if ([undefined, null].includes(txt)) return '';
    if (typeof txt === 'number') return txt.toString();
    return txt;
  }

  get case(): SwitchCase {
    return {
      camel(str) {
        return str.replace(REGEX.CHECK_CAMEL, function (match, i) {
          if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
          return i === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      },
      kebab(str) {
        return str
          .match(REGEX.CHECK_KEBAB)
          .map((x) => x.toLowerCase())
          .join('-');
      }
    };
  }
}

export default new StringUtilize();
