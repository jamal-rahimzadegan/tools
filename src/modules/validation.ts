import DOMPurify from "dompurify"; // useful lib to prevent some sec issues

type Matchers = "IS_MOBILE_NUM"; // add more matchers here

type RegexSet = {
  [key in Matchers]: RegExp;
};

class Validation {
  private readonly REGEX_SET: RegexSet;

  constructor() {
    this.REGEX_SET = {
      IS_MOBILE_NUM: /^09\d{9}$/
    };
  }

  verify(txt: string, verifier: keyof RegexSet): boolean {
    return this.REGEX_SET[verifier].test(txt);
  }

  sanitize = (htmlCode: string): string => DOMPurify.sanitize(htmlCode);
}

const validation = new Validation();

export default validation;


// Usage (in React)
export default function DummyValidation() {
  const htmlCode = `<p>It's my input</p> <img src="?" onerror=alert('hacked') >`;

  const checkInput = () => {
    const isMobile = validation.verify("09123456789", "IS_MOBILE_NUM");
    console.log(isMobile);
  };

  return (
    <>
      <button onClick={checkInput}>check</button>
      <div
        dangerouslySetInnerHTML={{
          __html: validation.sanitize(htmlCode)
        }}
      />
    </>
  );
}
