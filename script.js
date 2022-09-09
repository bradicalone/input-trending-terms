class InputRotate extends HTMLElement {
    constructor() {
        super();
        this.buttonsContainer = this.querySelector('.rotate_controls')
        this.slogans = Array.from(this.querySelectorAll('.c_input-wrap span'))
        this.components = this.querySelectorAll('.c_input-wrap, .rotate_controls')
        this.startPos = this.slogans.length - 1
        if(!this.startPos) return console.log('Need at least two items');
        this.intervalID = 0
        this.hiddenElement = null
        this.dist = 0;
        this.duration = 1000
        this.rotation = 0

        this.buttonsContainer.onclick = e => {
            const id = e.target.id

            if (id == 'c_input-pause') {
                clearInterval(this.intervalID)
                e.target.style.display = 'none'
                if (this.hiddenElement) this.hiddenElement.style.display = 'block'
                return this.hiddenElement = e.target
            }
    
            this.startRotate()
            console.log(this.hiddenElement)
            e.target.style.display = 'none'
            this.hiddenElement.style.display = 'block'
            this.hiddenElement = e.target
    
        }
        this.getElementsByClassName('c_input')[0].onclick = (e) => {
            console.log('e:', e.target)
            this.components[0].style.display = 'none' 
            this.components[1].style.display = 'none'
            this.clearInterval(this.intervalID)
        }

        this.startRotate = this.init()
        this.startRotate()
    }

    rotate() {
        const slogans = this.slogans
        const startPos = this.startPos
        console.log('startPos :', startPos )
        slogans[startPos].style.transition = 'transform .8s ease-out'
        slogans[startPos].style.transform = `translateY(${this.dist}%)`

        // Previous element
        if (this.dist == 100) {
            slogans[startPos - 1].style.transition = 'transform .8s ease-out'
            slogans[startPos - 1].style.transform = `translateY(${this.dist - 100}%)`
        }
        // When transformed below add element to begining of array
        if (this.dist === 200) {
            const lastItem = slogans.pop()
            lastItem.style.transition = 'none'
            lastItem.style.transform = null
            slogans.unshift(lastItem)
            this.dist = 0
        }

        this.dist += 100
        this.rotation++
    }

    init() {
        this.rotate()
        return () => this.intervalID = setInterval(() => {
            if (this.rotation++ >= 3) this.rotate()
        }, this.duration);
    }
}
customElements.define('input-rotate', InputRotate);