export default class HostUtil {
    public static get Host(): string {
        if (
            window.location.hostname === 'localhost' ||
            window.location.hostname.startsWith('192.168')
        ) {
            return `${window.location.protocol}//${
                window.location.hostname
            }:8080`;
        } else {
            return `${window.location.protocol}//${window.location.host}`;
        }
    }
}
