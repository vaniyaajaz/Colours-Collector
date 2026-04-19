const current = document.getElementById("current")
current.style.textDecoration = 'underline'
current.style.textUnderlineOffset = '125%'
const container = document.getElementById("imagesNature")
const totalNImages = 120
const tray = document.getElementById("tray")
const menu = document.createElement('div')
const save = document.createElement('button')
menu.style.display = 'none'
menu.appendChild(save)
menu.style.zIndex = '999'
save.style.zIndex = '1000'
container.appendChild(menu)
let lastHoveredImg = ""
addingImages = sessionStorage.getItem('addToList')
const Images = document.createElement('div')
tray.appendChild(Images)
Images.style.display = 'grid'
Images.style.gridTemplateColumns = 'repeat(28, 1fr)'
Images.style.columnGap = '0%'
Images.style.rowGap = '5px'
Images.className = 'imagesDivTray'
let urls = []
if (addingImages) {
    if (addingImages.length != 0) {
        addingImages = addingImages.split(',')
        addingImages.forEach(imageUrl => {
            const addedImage = document.createElement('img')
            addedImage.src = imageUrl
            addedImage.style.height = '80px'
            addedImage.style.width = '40px'
            addedImage.style.marginTop = '0%'
            addedImage.className = "tray-item"
            Images.appendChild(addedImage)
            console.log("re added to tray")
            urls.push(imageUrl)
        })
    }
}

for (let i = 1; i < totalNImages + 1; i++) {
    const image = document.createElement('img')
    image.src = "nature/" + i + ".jpg"
    image.className = "imagesCreated"
    container.appendChild(image)
}

const images = document.querySelectorAll(".imagesCreated")

images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        const rect = image.getBoundingClientRect()
        displayMenu(rect.left, rect.top)
    })
})


menu.addEventListener('mouseleave', () => {
    menu.style.display = 'none'
})

images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        lastHoveredImg = image.src
    })
})

function displayMenu(x, y) {
    menu.style.display = 'block'
    menu.style.position = 'fixed'
    menu.style.left = (x + 10) + "px"
    menu.style.top = (y + 10) + "px"
    save.className = 'saveButton'
    save.innerText = ""
}

save.addEventListener('click', () => {
    if (lastHoveredImg !== "") {
        urls.push(lastHoveredImg)
        const Image = document.createElement('img')
        Image.src = lastHoveredImg
        Image.className = "tray-item"
        Images.appendChild(Image)
        console.log("Added to tray:", lastHoveredImg)
        Image.style.height = '80px'
        Image.style.width = '40px'
        Image.style.marginTop = '0%'
    }
})


window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('addToList', urls.join(','))
})
