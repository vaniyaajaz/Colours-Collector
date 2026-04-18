const current = document.getElementById("current")
current.style.textDecoration = 'underline'
current.style.textUnderlineOffset = '125%'
const container = document.getElementById("trayElements")
urls = sessionStorage.getItem('addToList')
if (urls) {
    if (urls.length != 0) {
        addingImages = urls.split(',')
        addingImages.forEach(imageUrl => {
            const Addedimage = document.createElement('img')
            Addedimage.src = imageUrl
            Addedimage.className = 'trayImages'
            container.appendChild(Addedimage)
            Addedimage.addEventListener('mouseenter', () => {
                const rect = Addedimage.getBoundingClientRect()
                displayMenu(rect.left, rect.top)
            })
            Addedimage.addEventListener('mouseenter', () => {
                lastHoveredImg = Addedimage.src
            })
            Addedimage.addEventListener('click', () => {
                const rect = Addedimage.getBoundingClientRect()
                displayMenu(rect.left, rect.top)
                lastHoveredImg = Addedimage.src
            })
        })
    }
}
const menu = document.createElement('div')
const remove = document.createElement('button')
menu.style.display = 'none'
menu.appendChild(remove)
menu.style.zIndex = '999'
remove.style.zIndex = '1000'
container.appendChild(menu)
let lastHoveredImg = ""

function displayMenu(x, y) {
    menu.style.display = 'block'
    menu.style.position = 'fixed'
    menu.style.left = (x + 10) + "px"
    menu.style.top = (y + 10) + "px"
    remove.className = 'removeButton'
    remove.innerText = ""
}

remove.addEventListener('click', () => {
    if (lastHoveredImg !== "") {
        const img = document.querySelector('img[src="' + lastHoveredImg + '"]')
        img.remove()
        let urlArray = sessionStorage.getItem('addToList').split(',')
        urlArray = urlArray.filter(item => item !== lastHoveredImg)
        sessionStorage.setItem('addToList', urlArray.join(','))
        menu.style.display = 'none';
        lastHoveredImg = ""
    }
})

const clearButton = document.getElementById('clearAll')
clearButton.addEventListener('click', () => {
    let urlArray = sessionStorage.getItem('addToList').split(',')
    urlArray.forEach(url => {
        const img = document.querySelector('img[src="' + url + '"]')
        console.log(url)
        img.remove()
    })
    urlArray = ''
    sessionStorage.setItem('addToList', '')
    menu.style.display = 'none'
    lastHoveredImg = ""
    container.innerHTML = ''
})

document.getElementById('downloadAll').addEventListener('click', () => {
    const images = document.querySelectorAll('img');
    const delay = 500;

    images.forEach((img, index) => {
        setTimeout(async () => {
            const src = img.src;
            if (!src) return;

            try {
                const fetchResponse = await fetch(src)
                const blob = await fetchResponse.blob()
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob);
                a.download = `image-${index + 1}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(a.href)
            } catch (e) {
                console.error('Failed to download:', src, e)
            }
        }, index * delay);
    });
});
