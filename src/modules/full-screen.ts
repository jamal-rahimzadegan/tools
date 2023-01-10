class FullScreen {
  private get hasSupport(): boolean {
    return !!document?.exitFullscreen
  }

  enter(targetID: string = ''): void {
    if (!this.hasSupport) return

    const targetElement = document.getElementById(targetID) || document.documentElement

    if (!document.fullscreenElement) targetElement.requestFullscreen()
  }

  // NOTE: do not call it before entering fullscreen mode.
  exit(): void {
    if (!this.hasSupport) return
    if (document.exitFullscreen) document.exitFullscreen()
  }
}

export default new FullScreen()


// Usage (React): 
// <div id='fullscreen'>
//         <p>Some Fake Text</p>
//         <button onClick={exitFullScreen}>Exit</button>
//         <button onClick={goFullScreen}>Go</button>
// </div>

// const goFullScreen = () => fullScreen.enter('fullscreen')
// const exitFullScreen = () => fullScreen.exit()
