type SocialMedias = 'TELEGRAM'

class ShareService {
  private readonly URL_SET: Record<SocialMedias, string>

  constructor() {
    this.URL_SET = {
      TELEGRAM: `https://t.me/share/url?s=&text=`, // NOTE: Maybe is changed
    }
  }

  private generateOpener(shareUrl: string, content: string) {
    window.open(shareUrl + content, '_blank', 'noopener,noreferrer')
  }

  telegram(content: string) {
    this.generateOpener(this.URL_SET.TELEGRAM, content)
  }
}

export const shareService = new ShareService()

// Usage:
// shareService.telegram('SOME_CONTENT')
