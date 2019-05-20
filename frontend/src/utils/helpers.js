export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatNumber(number){
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function formatPlural(stringSingle, stringPlural, number){
    return parseFloat(number) === 1 ? stringSingle : stringPlural;
}