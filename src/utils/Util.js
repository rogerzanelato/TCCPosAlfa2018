export default class Util {
    static randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    static pad(n, width, z) {
        z = z || '0';
        n = n + '';
        
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}