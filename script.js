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

sessionStorage.clear()

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