const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let startX, startY;
let currentShape = 'line';
let selectedColor = '#000000';

// Event listeners for tool selection and color change
document.querySelectorAll('input[name="shape"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentShape = e.target.value;
    });
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
    selectedColor = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        drawShape(e.offsetX, e.offsetY);
    }
});

function drawShape(endX, endY) {
    ctx.strokeStyle = selectedColor;
    ctx.beginPath();

    if (currentShape === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
    } else if (currentShape === 'rectangle') {
        ctx.rect(startX, startY, endX - startX, endY - startY);
    } else if (currentShape === 'circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    }

    ctx.stroke();
}
// Clear button functionality
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
