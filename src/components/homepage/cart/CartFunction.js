import Cookies from 'js-cookie';
import { isEmpty } from '../../utils/functionHelper'
import { isLoggedIn } from '../../utils/Authentication'

export function addCart(productId, productName, productPrice, orderQuantity) {
    if (isLoggedIn() === false) {
        alert("You must login to add a product to cart!");
    } else {
        var total = productPrice * orderQuantity;
        if (Cookies.get('orderDetails') === undefined) {
            const orderDetail = {
                productId: productId, productName: productName,
                orderQuantity: orderQuantity, orderPrice: productPrice, total: total
            };
            const orderDetailList = { [productId]: orderDetail };
            Cookies.set('orderDetails', orderDetailList, { expires: 1 });
        } else {
            const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));
            if (orderDetailListArray.hasOwnProperty(productId)) {
                var orderDetail = orderDetailListArray[productId];
                orderDetail.orderQuantity += orderQuantity;
                orderDetail.orderPrice = productPrice
                orderDetail.total = orderDetail.orderQuantity * orderDetail.orderPrice;
                orderDetailListArray[productId] = orderDetail;
                Cookies.set('orderDetails', orderDetailListArray, { expires: 1 });
            } else {
                const orderDetail = {
                    productId: productId, productName: productName,
                    orderQuantity: orderQuantity, orderPrice: productPrice, total: total
                };
                orderDetailListArray[productId] = orderDetail;
                Cookies.set('orderDetails', orderDetailListArray, { expires: 1 });
            }
        }
        alert("Add cart success");
        window.location.reload();
    }
}

export function updateCart(productId, orderQuantity) {
    const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));

    var orderDetail = orderDetailListArray[productId];
    orderDetail.orderQuantity = orderQuantity;
    orderDetail.total = orderDetail.orderQuantity * orderDetail.orderPrice;
    orderDetailListArray[productId] = orderDetail;
    Cookies.set('orderDetails', orderDetailListArray, { expires: 1 });
    window.location.reload();
}

export function getCartTotalNumberItem() {
    if (Cookies.get('orderDetails') === undefined) {
        return 0;
    }
    const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));
    if (isEmpty(orderDetailListArray)) {
        return 0;
    }
    var totalNumberItem = 0;
    for (const [key, value] of Object.entries(orderDetailListArray)) {
        totalNumberItem += parseInt(value.orderQuantity);
    }
    return totalNumberItem;
}

export function getCartTotalPrice() {
    if (Cookies.get('orderDetails') === undefined) {
        return 0;
    }
    const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));
    if (isEmpty(orderDetailListArray)) {
        return 0;
    }
    var totalPrice = 0;
    for (const [key, value] of Object.entries(orderDetailListArray)) {
        totalPrice += parseInt(value.total);
    }
    return totalPrice;
}

export function deleteCartDetail(productId) {

    if (Cookies.get('orderDetails') === undefined) {
        return 0;
    }


    const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));

    if (isEmpty(orderDetailListArray) || !orderDetailListArray.hasOwnProperty(productId)) {
        return 0;
    }

    delete orderDetailListArray[productId];

    if (isEmpty(orderDetailListArray)) {
        Cookies.remove('orderDetails')
    } else {
        Cookies.set('orderDetails', orderDetailListArray, { expires: 1 });
    }
    window.location.reload();
}



export function cartObjectToCartDetailArray() {

    if (Cookies.get('orderDetails') === undefined) {
        return 0;
    }
    const orderDetailListArray = JSON.parse(Cookies.get('orderDetails'));
    if (isEmpty(orderDetailListArray)) {
        return 0;
    }



    if (isEmpty(orderDetailListArray)) {
        Cookies.remove('orderDetails')
    } else {
        Cookies.set('orderDetails', orderDetailListArray, { expires: 1 });
    }
}