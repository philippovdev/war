import '../styles/styles.css'
import Slider from './modules/Slider'
import Modal from './modules/Modal'

new Slider()
new Modal(0)

if (module.hot) {
    module.hot.accept()
}
