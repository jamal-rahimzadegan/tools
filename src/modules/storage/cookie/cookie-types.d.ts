interface CookieOptions {
  res?: any;
  req?: any;
  expires?: number; // in days
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

type MultipleCookie = Array<{
  name: string;
  value: any;
  options?: CookieOptions;
}>;
