import bcrypt from 'bcryptjs'

class Security {
  hashData(plainData: string): string {
    return bcrypt.hashSync(plainData, 10)
  }

  matchData(plainData: string, hashData: string, cb: (res: boolean) => any) {
    bcrypt.compare(plainData, hashData, (err, isMatch) => {
      if (err) return this.handleErr(err, 'matching hash')
      return cb(isMatch)
    })
  }

  private handleErr(err: Error, src: string) {
    console.error(`err in ${src}: `, err)
  }
}

const secService = new Security()
export default secService
