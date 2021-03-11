// used to create events so it has the direction property
function createEvent(direction)
{
    const event = new Event("swipe");
    event.direction = direction;
    return event;
}


// detect if the distance between touch end and start for
// x and y planes are big enough to be a swipe.
// if so, detect which direction.
function detectSwipesWithTouchEnd(element, minSwipeDistance, xStart, xEnd, yStart, yEnd)
{
    // tap
    if (xStart === xEnd && yStart === yEnd)
    {
        element.dispatchEvent(new Event("tap"));
        return;
    }

    // left swipe
    if (xStart > xEnd && Math.abs(xStart - xEnd) >= minSwipeDistance)
    {
        element.dispatchEvent(createEvent("left"));
        return;
    }

    // right swipe
    if (xStart < xEnd && Math.abs(xStart - xEnd) >= minSwipeDistance)
    {
        element.dispatchEvent(createEvent("right"));
        return;
    }

    // down swipe
    if (yStart > yEnd && Math.abs(yStart - yEnd) >= minSwipeDistance)
    {
        element.dispatchEvent(createEvent("up"));
        return;
    }

    // up swipe
    if (yStart < yEnd && Math.abs(yStart - yEnd) >= minSwipeDistance)
    {
        element.dispatchEvent(createEvent("down"));
        return;
    }
}


// create the SwipeListener class
class SwipeListener
{
    element;
    minSwipeDistance;
    xStart;
    xEnd;
    yStart;
    yEnd;

    constructor(element, minSwipeDistance = 200)
    {
        this.element = element;
        this.minSwipeDistance = minSwipeDistance;
    }

    startListening()
    {
        if (!this.isTouchDevice()) return;

        this.element.addEventListener("touchstart", event =>
        {
            this.xStart = event.changedTouches[0].screenX;
            this.yStart = event.changedTouches[0].screenY;
        });

        this.element.addEventListener("touchend", event =>
        {
            this.xEnd = event.changedTouches[0].screenX;
            this.yEnd = event.changedTouches[0].screenY;
            detectSwipesWithTouchEnd(this.element, this.minSwipeDistance, this.xStart, this.xEnd, this.yStart, this.yEnd);
        });
    }

    isTouchDevice()
    {
        const hasEvent = "ontouchstart" in window;
        const hasTouchPoints = navigator.maxTouchPoints > 0;
        const msHasTouchPoints = navigator.msMaxTouchPoints > 0;
        return hasEvent || hasTouchPoints || msHasTouchPoints;
    }
}