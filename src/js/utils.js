/** JS utils common to multiple views/components. */
import { TimerConnection } from 'blitztime';

/** Get a cookie. */
export function getCookie(name) {
    const pattern = new RegExp(`^ *${name} *= *(.*)`);
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const match = cookie.match(pattern);
        if (match) return match[1];
    }
    return undefined;
}

/** Set a cookie. */
export function setCookie(name, value, { daysLasts = 30 } = {}) {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + 1000 * 60 * 60 * 24 * daysLasts);
    document.cookie =
        `${name}=${value};` +
        ` expires=${expiresAt.toUTCString()}; SameSite=Strict; Path=/`;
}

/** Delete a cookie. */
export function deleteCookie(name) {
    setCookie(name, '', { daysLasts: 0 });
}

/** Store socket credentials in cookies.
 *
 * Side should be:
 *  -2: Observer
 *  -1: Manager
 *   0: Home
 *   1: Away
 */
export function storeConnection(creds, side) {
    setCookie(`timer-${creds.timer}-token`, creds.token);
    setCookie(`timer-${creds.timer}-side`, side);
}

/** Get a connection to a timer. */
export function getConnection(timerId) {
    const token = getCookie(`timer-${timerId}-token`);
    return new TimerConnection(
        {
            timer: timerId,
            token: token,
        },
        process.env.VUE_APP_API_URL
    );
}

/** Get the side the connection to a timer is for. */
export function getSide(timerId) {
    const raw = getCookie(`timer-${timerId}-side`);
    if (raw === undefined) return -2;
    return Number.parseInt(raw);
}

/** Send a notification.
 *
 * Fields: title (str), message (str), iconChar (str) and important (bool).
 */
export function notify(notification) {
    document.dispatchEvent(
        new CustomEvent('appNotification', {
            detail: notification,
        })
    );
}
