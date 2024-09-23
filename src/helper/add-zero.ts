export function addZero(num: number) {
    return num > 9 ? num.toString() : `0${num}`
}