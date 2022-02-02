
export function get_size(bytes: number): string {
    const units = ["", "K", "M", "G", "T", "P", "E"]
    for (const i in units){
        if (bytes < 1024){
            return `${precisionRound(bytes, 2)} ${units[i]}B`
        }
        bytes /= 1024
    }
    // will never happen
    return bytes.toString() + "B"
}

export function precisionRound(number: number, precision: number) {
    if (precision < 0)
    {
        let factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
    else
        return +(Math.round(Number(number + "e+" + precision)) +
            "e-" + precision);
}
