function addEvents(keys){
    window.addEventListener('keydown', (e) => {
        if (e.key.startsWith('Arrow') || e.key === ' ') {
            keys.add(e.key);
            e.preventDefault(); // stop the page from scrolling
        }
    });
    
    window.addEventListener('keyup', (e) => {
        keys.delete(e.key);
    });
    
    window.addEventListener('blur', () => keys.clear());
}
export {addEvents};