window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const mention = new WebMention() 
    await mention.make() 
    const gen = new TweetButtonGenerator()
    document.getElementById('text').addEventListener('input', (event) => { generate() });
    document.getElementById('url').addEventListener('input', (event) => { generate() });
    document.getElementById('hashtags').addEventListener('input', (event) => { generate() });
    document.getElementById('src').addEventListener('input', (event) => { generate() });
    document.getElementById('size').addEventListener('input', (event) => { generate() });
    function generate() {
        document.getElementById('export').innerHTML = gen.generate().outerHTML
        document.getElementById('export-code').value = gen.generate().outerHTML
        gen.copy()
    }
    document.getElementById('text').focus()
    generate()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

