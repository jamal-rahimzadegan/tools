import bcrypt from 'bcryptjs'

class Security {
  hashData(plainData: string): string {
    return bcrypt.hashSync(plainData, 10)
  }

  retrieveHashedData(hashedData: string): string {
    return bcrypt.getSalt(hashedData)
  }

  matchData(plainData: string, hashData: string) {
    bcrypt.compare(plainData, hashData, (err, isMatch) => {
      if (err) return this.handleErr(err, 'matching hash')
      return console.info('Does Match: ', isMatch)
    })
  }

  private handleErr(err: Error, src: string) {
    console.error(`err in ${src}: `, err)
  }
}

const secService = new Security()
export default secService
