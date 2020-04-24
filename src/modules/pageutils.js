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
