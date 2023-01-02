type Matchers = "IS_MOBILE_NUM" | "HAS_SCRIPT";

type RegexSet = {
  [key in Matchers]: RegExp;
};

type Validationtype = ValidationService;

class ValidationService {
  private readonly REGEX_SET: RegexSet;

  constructor() {
    this.REGEX_SET = {
      IS_MOBILE_NUM: /^09\d{9}$/,
      HAS_SCRIPT: /<\/?[a-z][\s\S]*>/i
    };
  }

  private check(regExp: keyof RegexSet, txt: string): boolean {
    return this.REGEX_SET[regExp].test(txt);
  }

  isMobile = (txt: string) => this.check("IS_MOBILE_NUM", txt);

  hasNoScript = (txt: string) => !this.check("HAS_SCRIPT", txt);
}

const validationService = new ValidationService();

export type { Validationtype };
export default validationService;
