import Modal from './Modal'

class Slider {
    constructor () {
        this.prev = document.querySelector('.nav-buttons .prev')
        this.next = document.querySelector('.nav-buttons .next')
        this.sliderItems = document.querySelectorAll('.slider-item')
        this.dotsBox = document.querySelector('.nav-dots')
        this.currentSlide = null

        this.events()
    }

    events () {
        this.checkPrev([...this.sliderItems].indexOf(this.currentSlide))
        this.checkNext([...this.sliderItems].indexOf(this.currentSlide))

        this.prev.addEventListener('click', () => {
            this.clearAnimated()
            this.handlePrev('.slider-item--active')
        })
        this.next.addEventListener('click', () => {
            this.clearAnimated()
            this.handleNext('.slider-item--active')

        })
        document.addEventListener('keyup', (e) => {
            if (!document.querySelector('.modal.open')) {
                this.clearAnimated()
                this.handleKeyPress(e)
            }
        })

        let touchstartX = 0;
        let touchendX = 0;

        this.currentSlide = document.querySelector('.slider-wrapper');

        this.currentSlide.addEventListener('touchstart', (event) => {
            this.clearAnimated()
            touchstartX = event.changedTouches[0].screenX;
        }, false);

        this.currentSlide.addEventListener('touchend', (event) => {
            touchendX = event.changedTouches[0].screenX;
            if (touchendX <= touchstartX) {
                if (touchendX <= touchstartX) {
                    this.handleNext('.slider-item--active')
                }
            }

            if (touchendX >= touchstartX) {
                if (document.querySelector('.slider-item--prev')) {
                    this.handlePrev('.slider-item--active')
                }
            }
        }, false);
    }

    clearAnimated () {
        this.sliderItems.forEach(item => {
            if (item.classList.contains('animated')) {
                item.classList.remove('animated')
            }
        })
    }

    handleKeyPress (e) {
        if (e.keyCode === 37) {
            if (document.querySelector('.slider-item--prev')) {
                this.handlePrev('.slider-item--active')
            }
        }
        if (e.keyCode === 39) {
            if (document.querySelector('.slider-item--next')) {
                this.handleNext('.slider-item--active')
            }
        }
    }

    checkPrev (i) {
        if (i === 0) {
            this.prev.classList.add('disabled')
        } else {
            this.prev.classList.remove('disabled')
        }
    }

    checkNext (i) {
        if (i === this.sliderItems.length - 1) {
            this.next.classList.add('disabled')
        } else {
            this.next.classList.remove('disabled')
        }
    }

    setDotColor (i) {
        const dots = [...document.querySelectorAll('.dot')]
        dots.map((dot, dotIndex, dotsArr) => {
            dot.classList.remove('dot--solid')
            if (i >= dotIndex) {
                dotsArr[dotIndex].classList.add('dot--solid')
            }
        })
    }

    handlePrev (selector) {
        this.currentSlide = document.querySelector(selector)

        this.checkPrev([...this.sliderItems].indexOf(this.currentSlide.previousElementSibling))
        this.setDotColor([...this.sliderItems].indexOf(this.currentSlide.previousElementSibling))
        this.checkNext([...this.sliderItems].indexOf(this.currentSlide.previousElementSibling))

        if (this.currentSlide.previousElementSibling && this.currentSlide.previousElementSibling.classList.contains('animated')) {
            this.currentSlide.classList.remove('animated')
        }
        setTimeout(() => {
            if (this.currentSlide.previousElementSibling.classList.contains('slider-item--prev')) {
                if (!this.currentSlide.previousElementSibling.previousElementSibling) {
                    this.currentSlide.previousElementSibling.classList.remove('slider-item--prev')
                    this.currentSlide.previousElementSibling.classList.remove('animated')
                    this.currentSlide.previousElementSibling.classList.add('slider-item--active')
                    this.currentSlide.classList.remove('slider-item--active', 'animated')
                    this.currentSlide.classList.add('slider-item--next', 'animated')
                    this.currentSlide.nextElementSibling.classList.remove('slider-item--next', 'animated')
                } else {
                    this.currentSlide.previousElementSibling.previousElementSibling.classList.remove('animated')
                    this.currentSlide.previousElementSibling.previousElementSibling.classList.add('slider-item--prev')
                    this.currentSlide.previousElementSibling.classList.remove('slider-item--prev')
                    this.currentSlide.previousElementSibling.classList.remove('animated')
                    this.currentSlide.previousElementSibling.classList.add('slider-item--active')
                }
            }

            this.currentSlide.classList.remove('slider-item--active')
            this.currentSlide.classList.add('slider-item--next')

            if (this.currentSlide.nextElementSibling) {
                this.currentSlide.nextElementSibling.classList.remove('slider-item--next')
            }
        }, 100)
        new Modal([...this.sliderItems].indexOf(document.querySelector('.slider-item--active')))
    }

    handleNext (selector) {
        this.checkPrev([...this.sliderItems].indexOf(this.currentSlide.nextElementSibling))
        this.currentSlide = document.querySelector(selector)

        if (this.currentSlide && this.currentSlide.nextElementSibling) {
            this.checkNext([...this.sliderItems].indexOf(this.currentSlide.nextElementSibling))
            this.setDotColor([...this.sliderItems].indexOf(this.currentSlide.nextElementSibling))
            if (this.currentSlide.previousElementSibling) {
                this.currentSlide.previousElementSibling.classList.remove('slider-item--prev')
            }
            this.currentSlide.classList.remove('slider-item--active')
            this.currentSlide.classList.add('slider-item--prev', 'animated')
            this.currentSlide.nextElementSibling.classList.remove('slider-item--next')
            this.currentSlide.nextElementSibling.classList.add('slider-item--active')
            if (this.currentSlide.nextElementSibling.nextElementSibling) {
                this.currentSlide.nextElementSibling.nextElementSibling.classList.add('slider-item--next')
            }
        }
        new Modal([...this.sliderItems].indexOf(document.querySelector('.slider-item--active')))
    }
}

export default Slider
