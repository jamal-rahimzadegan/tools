
type Position = {
  coords: {
    latitude: number
    longitude: number
    accuracy: number
    altitude: unknown
    altitudeAccuracy: unknown
    heading: unknown
    speed: unknown
  }
  timestamp: number
}

type Callback = (coords: Position['coords']) => any

class PositionService {
  private get hasSupport(): boolean {
    return !!window.navigator.geolocation
  }

  requestPermission() {
    if (!this.hasSupport) return console.error('No Geo-Location Support')

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      switch (result.state) {
        case 'granted':
          return console.log('Has approved the permission.')
        case 'denied':
          return alert('Location Permission Is Denied.')
        case 'prompt':
          alert('Please confirm location access')
          return this.getPosition(() => {})
        default:
          break
      }

      // result.addEventListener('change', () => {}) // can use it for more complex use-cases
    })
  }

  getPosition(cb: Callback) {
    if (!this.hasSupport) return console.error('No Geo-Location Support')

    navigator.geolocation.getCurrentPosition(
      (position) => cb(position.coords),
      console.error,
    )
  }
}

export const location = new PositionService()
