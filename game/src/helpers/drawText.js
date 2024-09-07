
function drawText(ctx, text, x, y, c, font, fontSize) {

    ctx.font = `${fontSize}px ${font}`;  // You can customize the font size and family
    ctx.fillStyle = c;        // Set the color for the text

    // Draw the text at the specified coordinates
    ctx.fillText(text, x, y);

}
