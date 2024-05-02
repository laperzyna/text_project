document.querySelectorAll('.shape').forEach(shape => {
    shape.addEventListener('mouseover', () => {
        shape.style.transform = 'rotate(180deg)';
    });
    shape.addEventListener('mouseout', () => {
        shape.style.transform = 'rotate(0deg)';
    });
});
