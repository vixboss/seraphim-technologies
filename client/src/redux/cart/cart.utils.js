export const addItemToCart = (cartItems, cartItemToAdd ) =>{
    // const existingCartItem =cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

    // if(existingCartItem){
    //     return(
    //         cartItems.map((cartItem) => (
    //             cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
    //         ))
    //     );
    // }

    // return [...cartItems, {...cartItemToAdd, quantity: 1}];

    // ***************New Code*************

    if((typeof cartItems === "undefined") || (cartItems === null)) {
        return [...cartItemToAdd];
    }
    else{
        var existingCartItem = cartItemToAdd.filter(item1 => 
            !cartItems.some(item2 => (item2.mode === item1.mode && item2.name === item1.name)));
        
        return [...cartItems, ...existingCartItem];
    }

}

export const increaseCartItemQty = (cartItems, cartItemForIncrement) => {
    var existingCartItem = cartItemForIncrement.filter(item1 => 
        cartItems.some(item2 => (item2.mode === item1.mode && item2.name === item1.name)));
    if(existingCartItem){
        var newQtyCartItem = cartItems.map((cartItem) => {
            return (
            ((cartItem.mode === existingCartItem[0].mode) && (cartItem.name === existingCartItem[0].name)) ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
            )
        });
        return [...newQtyCartItem];
    }
}

export const removeItemFromCart =(cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => ((cartItem.mode === cartItemToRemove.mode) && (cartItem.name === cartItemToRemove.name))
    )

    if(existingCartItem.quantity === 1){
        // var a = cartItems.filter(cartItem => ((cartItem.mode !== cartItemToRemove.mode) && (cartItem.name !== cartItemToRemove.name)))
        // console.log(a);
        return [...cartItems];
    }

    return cartItems.map(
        cartItem=> ((cartItem.mode === cartItemToRemove.mode) && (cartItem.name === cartItemToRemove.name)) ? 
        { ...cartItem, quantity: cartItem.quantity - 1} 
        : 
        cartItem
    )
}