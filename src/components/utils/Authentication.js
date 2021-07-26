import Cookies from 'js-cookie';

export function compareRole(stringRole) {
    var roles = Cookies.get("roles");
    console.log(roles.includes(stringRole));
}

export function isLoggedIn() {
    if (Cookies.get('username') === null || Cookies.get('username') === undefined) {
        return false;
    }
    return true;
}

export function getJWT() {
    if(Cookies.get('token') === null || Cookies.get('token') === undefined) {
        return Cookies.get('token');
    }
    return null;
}