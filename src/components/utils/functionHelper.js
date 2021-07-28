export function ratingPointFixed(ratingPoint) {
    if (ratingPoint == null) {
        return 0;
    }
    return Number.parseFloat(ratingPoint).toFixed(1)
}

export function priceFormat(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(price);
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}