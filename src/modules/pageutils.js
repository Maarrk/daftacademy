const buttonScrollWidth = 60,
  buttonScrollHeight = 60

function createButtonScroll() {
  let buttonScroll = document.createElement('button')
  buttonScroll.innerHTML = '⇑'
  buttonScroll.style.cssText = `
    position: fixed;
    bottom: 0px;
    right: -${buttonScrollWidth}px;
    width: ${buttonScrollWidth}px;
    height: ${buttonScrollHeight}px;
    font-size: ${buttonScrollHeight * 0.6}px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 50%;
  `
  buttonScroll.onclick = () => { window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })}
  return buttonScroll
}

function showButtonScroll(buttonRef) {
  buttonRef.style.right = '0px'
}

function hideButtonScroll(buttonRef) {
  buttonRef.style.right = `-${buttonScrollWidth}px`
}

export function addButtonScroll() {
  var visible = false
  var buttonNode = document.body.appendChild(createButtonScroll())

  window.addEventListener('scroll', () => {
    if(window.scrollY > window.innerHeight / 2 && !visible) {
      showButtonScroll(buttonNode)
      visible = true
    }
    else if (window.scrollY < window.innerHeight / 2 && visible){
      hideButtonScroll(buttonNode)
      visible = false
    }
  })
}

function mockApiCall() {
  let item = {
    name: 'Dynamically loaded item',
    tags: 'SO DYNAMIC',
    price: '$ 99.70',
    image: 'https://via.placeholder.com/309x390'
  }
  let collection = []
  for (let i = 0; i < 4; i++) collection.push(item)
  return collection
}

function loadProducts(containerRef) {
  let responseData = mockApiCall()

  for (const item of responseData) {
    // I knew from Vue that templates are cool and I will not pretend this is not copied from:
    // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
    let template = document.createElement('template');
    let html = `
      <div class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
        <div class="is-inline-block has-text-left">
          <img src="${item.image}" alt="Photo of ${item.name}">
          <p>${item.tags}</p>
          <p>${item.name}</p>
          <p>${item.price}</p>
        </div>
      </div>
    `
    html = html.trim();
    template.innerHTML = html;
    containerRef.appendChild(template.content.firstChild)
  }
}

export function addProductLoader() {
  var buttonProducts = document.getElementById('button-all-products')
  if(buttonProducts === null) {
    console.log('Cannot mount ProductLoader without element: #button-all-products')
    return
  }
  var containerProducts = document.getElementById('container-all-products')
  if(containerProducts === null) {
    console.log('Cannot mount ProductLoader without element: #container-all-products')
    return
  }

  buttonProducts.addEventListener('click', () => {loadProducts(containerProducts)})
}
