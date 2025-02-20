interface TextScrambleOptions {
  chars?: string;
  delay?: number;
  speed?: number;
}

class TextScramble {
    private el: HTMLElement;
    private chars: string;
    private _delay: number;
    private speed: number;
    private queue: any[];
    private frame: number;
    private frameRequest: number;
    private resolve!: (value: unknown) => void;

    public get delay(): number {
        return this._delay;
    }

    constructor(el: HTMLElement, options: TextScrambleOptions = {}) {
      this.el = el;
      this.chars = options.chars || '!<>-_\\/[]{}—=+*^?#________';
      this._delay = options.delay || 800;
      this.speed = options.speed || 40;
      this.update = this.update.bind(this);
    }

    setText(newText: string, callback: () => void) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise<void>((resolve) => {
        this.resolve = resolve
      })
      this.queue = []
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * this.speed)
        const end = start + Math.floor(Math.random() * this.speed)
        this.queue.push({ from, to, start, end })
      }
      
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise.then(callback)
    }

    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve(undefined)
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

export const initTextAnimation = (selector: string, phrases: string[], options: TextScrambleOptions = {}) => {
    const el = document.querySelector(selector);
    if (!el || !(el instanceof HTMLElement)) return;
    
    const fx = new TextScramble(el, options)
    let counter = 0
    
    const next = () => {
        fx.setText(phrases[counter], () => {
            setTimeout(next, fx.delay)
        })
        counter = (counter + 1) % phrases.length
    }
    
    next()
}

