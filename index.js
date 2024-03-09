const hexInputEl = document.getElementById("hex-input")
const outputEl = document.getElementById("input-color")
const inputColorBox = document.getElementById("input-color")
const alteredColorBox = document.getElementById("altered-color")
const errorTextEl = document.getElementById("error-txt")
const sliderTextEl = document.getElementById("slider-text")
const sliderInputEl = document.getElementById("slider-input")
const toggleBtnEl = document.getElementById("toggleBtn")
const lightenText = document.getElementById('lightenText')
const darkenText = document.getElementById('darkenText')
const resetBtnEl = document.getElementById('resetBtn')


toggleBtnEl.addEventListener('click', () => {

    toggleDarkenOrLighten()

    const change = toggleBtnEl.classList.contains("dark") ? -sliderInputEl.value : sliderInputEl.value

    if(isHexColorValid(hexInputEl.value)){
        let alteredHexColor = alterColorByPercentage(hexInputEl.value, change)
        alteredColorBox.style.backgroundColor = alteredHexColor
    }
})

hexInputEl.addEventListener('keyup', () => {
    const hexInput = hexInputEl.value

    if(isHexColorValid(hexInput)){
        errorTextEl.innerText = ""

        //const strippedHex = updateHexValue(hexInput)
        const input_hexColor = updateHexValue(hexInput)  // add the #
        inputColorBox.style.backgroundColor = input_hexColor

        // update the altered box color with the current slider value and the current input color
        const change = toggleBtnEl.classList.contains("dark") ? -sliderInputEl.value : sliderInputEl.value
        const altered_hexColor = alterColorByPercentage(hexInputEl.value, change)
        
        alteredColorBox.style.backgroundColor =  altered_hexColor

        hexInputEl.style.border = "none"
        hexInputEl.style.outlineColor = "black"
    }

    else {
        errorTextEl.innerHTML = "Invalid hex number."
        hexInputEl.style.outlineColor = "red"
        hexInputEl.style.border = "2px solid red"
    }
})


sliderInputEl.addEventListener('input', () => {
    sliderTextEl.innerText = `${sliderInputEl.value}%`

    let change = sliderInputEl.value

    // if darken, then change is -ve
    if(toggleBtn.classList.contains("dark")){
        change = -1 * sliderInputEl.value
    }
  
    if(isHexColorValid(hexInputEl.value)){
        let alteredHexColor = alterColorByPercentage(hexInputEl.value, change)
        alteredColorBox.style.backgroundColor = alteredHexColor
    }
})

function toggleDarkenOrLighten(){
    if(toggleBtnEl.classList.contains("dark")){
        toggleBtnEl.classList.remove("dark")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
    }
    else {
        toggleBtnEl.classList.add("dark")
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected")
    }
}

function isHexColorValid(hexValue) {
    const pattern = /^#?([0-9A-F]{3}){1,2}$/i
    
    return pattern.test(hexValue)
}

function updateHexValue(crntHexValue){
    
    crntHexValue = crntHexValue.replace('#', '')
    crntHexValue = '#' + crntHexValue

    return crntHexValue
}

function convertHexToRGB(hexValue) {

    // hex value is #xxx  or #xxxxxx
    hexValue = hexValue.replace('#', '')
    if(hexValue.length === 3) {
        hexValue = hexValue[0] + hexValue[0]
        + hexValue[1] + hexValue[1]
        + hexValue[2] + hexValue[2]
    }

    const r = parseInt(hexValue.substring(0,2), 16)
    const g = parseInt(hexValue.substring(2,4), 16)
    const b = parseInt(hexValue.substring(4,6), 16)
    //console.log(`rgb = ${hexValue.substring(0,2)}> ${r}, ${hexValue.substring(2,4)} > ${g}, ${hexValue.substring(4,6)} > ${b}`)
    
    return {r,g,b}    
}

function convertRGBToHex(rgb) {
    let r = rgb['r']
    let g = rgb['g']
    let b = rgb['b']

    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)
    
    const hexColor = "#" + firstPair + secondPair + thirdPair

    return hexColor
}

function alterColorByPercentage(hexVal, percentVal){
    
    let newColor = convertHexToRGB(hexVal)
    const amount = Math.floor((percentVal / 100) * 255)

    let r = changeWithin0To255(newColor['r'], amount)
    let g = changeWithin0To255(newColor['g'], amount)
    let b = changeWithin0To255(newColor['b'], amount)
    
    newColor = convertRGBToHex({r,g,b})

    return newColor
}

function changeWithin0To255(rgb, amount){
    /*
    const newHex = hex + amount
    if(newHex > 255) return 255
    if(newHex < 0) return 0
    return newHex
    */
    return Math.min(255, Math.max(0, rgb + amount))
}

resetBtnEl.addEventListener('click',() => {
    sliderInputEl.value = 0
    sliderTextEl.innerText = "0%"
    errorTextEl.innerText = ""
    hexInputEl.style.border = "none"
    hexInputEl.style.outlineColor = "black"

    if(isHexColorValid(hexInputEl.value)){
        const base_color = updateHexValue(hexInputEl.value)  // add the #
        inputColorBox.style.backgroundColor = base_color
        alteredColorBox.style.backgroundColor = base_color
    }
    else {
        hexInputEl.value = ""
        inputColorBox.style.backgroundColor = "#d3e1eb"
        alteredColorBox.style.backgroundColor = "#d3e1eb"
    }

    if(toggleBtnEl.classList.contains("dark")){
        toggleDarkenOrLighten()
    }

})