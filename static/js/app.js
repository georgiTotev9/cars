document.getElementById('cars').addEventListener('click', (e) => {
    if (e.target.classList.contains('more')) {
        const desc = e.target.parentElement.querySelector('.description');
        if (desc.style.display == 'block') {
            desc.style.display = 'none';
            e.target.textContent = 'Show More';
        } else {
            desc.style.display = 'block';
            e.target.textContent = 'Hide';
        }
    }
});
