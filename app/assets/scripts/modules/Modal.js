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
        this.modal.addEventListener('click', this.closeModal.bind(this))
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

    closeModal (e) {
        if (e.target.classList.contains('close-modal-x') || e.target.classList.contains('close-modal-btn')) {
            this.toggleModal()
        }
    }
}

export default Modal
