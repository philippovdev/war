class Modal {
    constructor (id) {
        this.modal = document.querySelector(`#id-${id}`)
        this.btn = document.querySelector(`[data-id='${id}'].slider-item__box-btn`)

        this.prev = document.querySelector('.nav-buttons .prev')
        this.next = document.querySelector('.nav-buttons .next')

        this.events()
    }

    events () {
        this.btn.addEventListener('click', this.toggleModal.bind(this))
        this.modal.addEventListener('click', e => {
            if (e.target.classList.contains('close-modal-btn') || e.target.classList.contains('close-modal-x')) {
                console.log('closesese')
                this.removeOpenClasses()
            }
        })
        document.addEventListener('click', e => {
            if ((e.target.classList.contains('slide-overlay') || e.target.classList.contains('has-overlay')) && this.modal.classList.contains('open')) {
                this.removeOpenClasses()
            }
        })


        document.addEventListener('click', e => {
            if (document.body.classList.contains('has-overlay')) {
                /*console.log('HELLOOOO')
                let targetEl = e.target
                if (targetEl === this.btn) {
                    console.log('BTN was clicked OPEN')
                    this.toggleModal()
                }

                do {
                    if (this.modal === targetEl) {
                        console.log('inside')
                        return
                    }
                    targetEl = targetEl.parentNode
                } while (targetEl)
                this.removeOpenClasses()
                console.log('outside')*/
            }
        })
    }


    toggleModal () {
        this.modal.classList.toggle('open')
        document.body.classList.toggle('has-overlay')
        this.prev.classList.toggle('hidden')
        this.next.classList.toggle('hidden')
        this.btn.classList.toggle('back-to-gallery')

        const activeSlide = document.querySelector('.slider-item--active')
        activeSlide.classList.toggle('show-modal')
    }

    openModal () {
        this.modal.classList.add('open')
        document.body.classList.add('has-overlay')
        this.prev.classList.add('hidden')
        this.next.classList.add('hidden')
        this.btn.classList.add('back-to-gallery')

        const activeSlide = document.querySelector('.slider-item--active')
        activeSlide.classList.add('show-modal')
    }

    /*closeModal (e) {
        if (e.target.classList.contains('close-modal-x') || e.target.classList.contains('close-modal-btn')) {
            this.removeOpenClasses()
        }
    }*/

    removeOpenClasses () {
        this.modal.classList.remove('open')
        document.body.classList.remove('has-overlay')
        this.prev.classList.remove('hidden')
        this.next.classList.remove('hidden')
        this.btn.classList.remove('back-to-gallery')

        const activeSlide = document.querySelector('.slider-item--active')
        activeSlide.classList.remove('show-modal')
    }
}

export default Modal
