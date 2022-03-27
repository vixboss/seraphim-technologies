export const productDetailArrayFilter = (productObject) => {
    const filteredProductObject =[];
    for(var firstArrayVariable = 0; firstArrayVariable < productObject.length; firstArrayVariable++){
        if(productObject[firstArrayVariable] !== ''){
            for(var secondArrayVariable = 0; secondArrayVariable < productObject[firstArrayVariable].length; secondArrayVariable++){
                if(productObject[firstArrayVariable][secondArrayVariable] !== ''){
                    filteredProductObject.push(productObject[firstArrayVariable][secondArrayVariable]);
                }
            }
        }
    }

    return filteredProductObject;
}

export const collectionItemsDescription = (collections, collectionUrlParam) => {
    var collectionItem = collections ? Object.keys(collections).map(key => collections[key].title.toLowerCase() === collectionUrlParam.category.toLowerCase() ? collections[key].items.map(collectionsItem => collectionsItem.name.toLowerCase() === collectionUrlParam.product.toLowerCase() ? collectionsItem : '') : '') : '';
    return collectionItem;
}