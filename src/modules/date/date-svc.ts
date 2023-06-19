type Lang = 'en' | 'fa' | 'pt' | 'ar'
type Country = 'US' | 'GB' | 'IR' | 'PT' | 'AE'
type Locale = `${Lang}-${Country}`
type Options = Intl.DateTimeFormatOptions
type DayInfo = {
  name: string
  ofWeek: number
  ofMonth: number
  year: number
  month: {
    name: string
    ofYear: number
  }
}

class DateService {
  readonly locale: string

  constructor(locale: Locale) {
    this.locale = locale
  }

  getTimeStr(date: Date): string {
    return date.toLocaleTimeString()
  }

  get today(): DayInfo {
    const today = new Date(Date.now())
    return this.getDayInfo(today)
  }

  getDayInfo(date: Date): DayInfo {
    const getFromDate = (options: Options) => {
      return date.toLocaleString(this.locale, options)
    }

    return {
      name: getFromDate({ weekday: 'long' }),
      ofWeek: date.getDay(),
      ofMonth: +getFromDate({ day: '2-digit' }),
      year: +getFromDate({ year: 'numeric' }),
      month: {
        ofYear: +getFromDate({ month: '2-digit' }),
        name: getFromDate({ month: 'long' }),
      },
    }
  }
}

export const dateSvc = new DateService('en-US')
