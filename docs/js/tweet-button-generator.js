class TweetButtonGenerator {
    constructor() {
        this.icon = new TweetButtonBase64Svg() 
    }
    async copy() {
        try {
            this.#toast('クリップボードにコピーしました！')
            await navigator.clipboard.writeText(document.getElementById('export-code').value) 
        }
        catch(e) { console.debug('クリップボードのコピーに失敗しました……。', e) }
    }
    #toast(message) {
        console.debug(message)
        if (Toastify) {
            Toastify({
                text: message,
                gravity: 'bottom', // `top` or `bottom`
                position: 'right',
            }).showToast();
        } else { alert(message) }
    }
    generate() {
        const a = this.#makeA()
        const img = this.#makeImg()
        a.appendChild(img)
        return a
    }
    #makeA() {
        const a = document.createElement('a')
        const url = new URL('https://twitter.com/share')
        url.searchParams.set('url', document.getElementById('url').value)
        url.searchParams.set('text', document.getElementById('text').value)
        url.searchParams.set('hashtags', document.getElementById('hashtags').value)
        a.setAttribute('href', url.href)
        a.setAttribute('target', url.href)
        a.setAttribute('rel', 'noopener noreferrer')
        return a
    }
    // format(svg,png), color(blue,white), shape:circle:
    #makeImg() {
        const img = document.createElement('img')
        img.classList.add('tweet-button')
        img.setAttribute('width', document.getElementById('size').value)
        img.setAttribute('height', document.getElementById('size').value)
        img.setAttribute('src', `data:image/svg+xml;base64,${this.#getImgSrc()}`)
        return img
    }
    #getImgSrc() {
        const src = document.getElementById('src').value
        switch(src) {
            case 'circle': return this.icon.Circle
            case 'rounded-square': return this.icon.RoundedSquare
            case 'square': return this.icon.Square
            default: return  this.icon.Circle
        }
    }
}
