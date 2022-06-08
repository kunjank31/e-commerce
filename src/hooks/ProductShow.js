

const ProductShow = (data) => {
    let tshirt = {}
    for (let item of data) {
        if (item.name in tshirt) {
            if (!tshirt[item.name].color.includes(item.color)) {
                tshirt[item.name].color.push(item.color)
            }
        } else {
            tshirt[item.name] = JSON.parse(JSON.stringify(item))
            tshirt[item.name].color = [item.color]
            tshirt[item.name].size = [item.size]
            tshirt[item.name].category = tshirt[item.name].category.split(',').join(' ').split(' ')
        }
    }
    return tshirt
}

export default ProductShow