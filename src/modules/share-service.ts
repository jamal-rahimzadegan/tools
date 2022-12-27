// TODO: complete it

type SocialMedias = 'WHATSAPP' | 'FACEBOOK' | 'TWITTER'

class ShareService {
  SHARE_URL_SET: Record<SocialMedias, string>

  constructor() {
    this.SHARE_URL_SET = {
      WHATSAPP: 'https://api.whatsapp.com/send/?text=',
      FACEBOOK: 'https://www.facebook.com/sharer/sharer.php?u=',
      TWITTER: 'https://twitter.com/intent/tweet?text=',
    }

    Object.entries(this.SHARE_URL_SET).forEach(([media, shareUrl]) => {
      this[media.toLowerCase()] = (content: string) => {
        window.open(shareUrl + ' ' + content, '_blank', 'noopener,noreferrer')
      }
    })
  }
}

const shareOn = new ShareService()
