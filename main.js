const handleCSSAnimation = require("./cssAnimation.js").handleCSSAnimation;
const handleCanvasAnimation = require("./canvasAnimation.js").handleCanvasAnimation;
const handleThreeAnimation = require("./threeAnimation.js").handleThreeAnimation;
const SLIDES_COUNT = require("./utils.js").SLIDES_COUNT;

const title = document.getElementById('title')

let slideIndex = 0

const updateSlide = () => {
  title.innerHTML = ''
  const text = document.createTextNode(`slide${slideIndex+1}`)
  title.appendChild(text)

  handleCSSAnimation()
  handleCanvasAnimation(slideIndex)
}

const nextSlide = () => {
  if(slideIndex >= SLIDES_COUNT){
    slideIndex = 0
  } else {
    slideIndex++
  }
  updateSlide()
  handleThreeAnimation(1, 1)
}

const prevSlide = () => {
  if(slideIndex <= 0){
    slideIndex = SLIDES_COUNT
  } else {
    slideIndex--
  }
  updateSlide()
  handleThreeAnimation(0, -1)
}