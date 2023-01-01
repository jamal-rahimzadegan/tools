type RegexList = 'IS_MOBILE_NUM' | 'HAS_HTML'

type RegexSet = {
  [key in RegexList]: RegExp
}

class ValidationService {
  readonly REGEX_SET: RegexSet

  constructor() {
    this.REGEX_SET = {
      IS_MOBILE_NUM: /^09\d{9}$/,
      HAS_HTML: /<\/?[a-z][\s\S]*>/i,
    }
  }

  private check(regExp: keyof RegexSet, txt: string): boolean {
    return this.REGEX_SET[regExp].test(txt) // outputs true
  }

  isMobile = (txt: string) => this.check('IS_MOBILE_NUM', txt)

  hasHtml = (txt: string) => this.check('HAS_HTML', txt)
}

const validationService = new ValidationService()
export default validationService
