let move = false, left  = 0, down = 0, up = 0, maxLeft = 0;
const d = document,
    $ = selector => 
        d.querySelector(selector),
    getProperty = (element, property) => 
        window.getComputedStyle(element).getPropertyValue(property),
    pxToNumber = size => 
        parseFloat(size.slice(0, size.length - 2)),
    getTotalWidth = element => {
            const width = pxToNumber(getProperty(element, "width"));
            const margin = pxToNumber(getProperty(element, "margin")) * 2;
            return width + margin;
    },
    setMaxLeft = () => {
        let carouselContainerWidth = getTotalWidth(carouselContainer);
        let numCards =10 - Math.floor(carouselContainerWidth / cardWidth);
        let extra = carouselContainerWidth - (cardWidth * (10 - numCards)) - 20;
        maxLeft = cardWidth * -1 * numCards + extra
    },
    carouselContainer = $(".carousel-container"),
    carousel =$(".carousel"),
    card = $(".card-container"),
    cardWidth = getTotalWidth(card);

const carouselMovement = () => {
    setMaxLeft();
    window.addEventListener("resize", e => {
        move = false, left  = 0, down = 0, up = 0, maxLeft = 0;
        carousel.style.left = `0px`
        setMaxLeft()
    });
    carouselContainer.addEventListener("mousedown", e => {
        move = true;
        down = e.clientX;
    })
    carouselContainer.addEventListener("mousemove", e => {
        if (move) {
            left = down - e.clientX;
            let moveLeft = up - left < 1 ? up - left : 0;
            moveLeft = up - left < maxLeft - 1 ? maxLeft : moveLeft;
            carousel.style.left = `${moveLeft}px`
        }
    })
    d.addEventListener("mouseup", e => {
        up -= (down - e.clientX);
        up = up > 0 ? 0 : up;
        up = up < maxLeft ? maxLeft : up
        move = false;
    })
}

export default carouselMovement;