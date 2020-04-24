import './styles/fontjost.sass'
import './styles/bulmasetup.sass'
import './styles/style.sass'

window.addEventListener('DOMContentLoaded', () => {
  import('./modules/pageutils.js').then(module => {
    module.addButtonScroll()
    module.addProductLoader()
  })
})