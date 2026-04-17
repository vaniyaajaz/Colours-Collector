const landscapeImages = document.querySelectorAll('.Limages')
const natureImages = document.querySelectorAll('.Nimages')
const objectsImages = document.querySelectorAll('.Oimages')
const patternsImages = document.querySelectorAll('.Pimages')
const current = document.getElementById("current")
const tryButton = document.getElementById("tryItYourself")
current.style.textDecoration = 'underline'
current.style.textUnderlineOffset = '125%'
const totalLImages = 15
const totalNImages = 15
const totalOImages = 15
const totalPImages = 15

assignSources(landscapeImages, 'landscapes/', totalLImages)
assignSources(natureImages, 'nature/', totalNImages)
assignSources(objectsImages, 'objects/', totalOImages)
assignSources(patternsImages, 'patterns/', totalPImages)


function assignSources(arr, folder, total) {
    let done = []
    arr.forEach(image => {
        let random = Math.ceil(Math.random() * total)
        while (done.includes(random)) {
            random = Math.ceil(Math.random() * total)
        }
        let source = folder + random + '.jpg'
        image.src = source
        done.push(random)
        console.log(source)
    });
}

tryButton.addEventListener('click', () => {
    window.location.href = 'landscapes.html'
})

const tray = document.getElementById("tray")
const menu = document.createElement('div')
const save = document.createElement('button')
menu.style.display = 'none'
menu.appendChild(save)
menu.style.zIndex = '999'
save.style.zIndex = '1000'
addingImages = sessionStorage.getItem('addToList')
const Images = document.createElement('div')
tray.appendChild(Images)
Images.style.display = 'grid'
Images.style.gridTemplateColumns = 'repeat(28, 1fr)'
Images.style.columnGap = '0%'
Images.style.rowGap = '5px'
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
        })
    }
}
