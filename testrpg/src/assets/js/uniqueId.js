export const uniqueId = function () {
    return parseInt(
        Math.ceil(Math.random() * Date.now())
            .toPrecision(12)
            .toString()
            .replace(".", "")
    )
}
