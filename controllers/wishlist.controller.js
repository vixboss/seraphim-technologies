const mongoose = require('mongoose');

const Wishlist = require('./../models/wishlist.model.js');
const Product = require('../models/product.model');

const currentDate = () => {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let hh = d.getHours();
    let min = d.getMinutes();
    let ss = d.getSeconds();

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

const addWishlist = async(req, res, next) => {
    try {
        const email = req.body.email;
        const itemList = req.body.itemList;

        await Promise.all(
            itemList.map(async (item) => {
                const wishlist = new Wishlist({
                    _id: new mongoose.Types.ObjectId(),
                    productId: new mongoose.Types.ObjectId(item.id),
                    mode: item.mode,
                    email: email,
                    createdAt : currentDate()
                });
    
                const data = await Wishlist.find({ 
                    email: email, 
                    productId: new mongoose.Types.ObjectId(item.id),
                    mode: item.mode
                });
    
                if(data.length === 0){
                    await wishlist.save();
                }
            })
        );

        return res.status(200).send("Added to wishlist.");
        
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getWishlist = async(req, res, next) => {
    try{
        const email = req.params.email;

        const productData = await Wishlist.find({email: email}).populate('productId');
        if(productData.length === 0){
            return res.status(202).send('No wishlist found.');
        }
        else{
            var newWishlistData = [];
            productData.map((data) => {
                const mode = data.mode.toLowerCase();
                const _id = data._id;
                const productId = data.productId._id;
                const email = data.email;
                const createdAt = data.createdAt;
                const name = data.productId.name;
                const image = data.productId.imageUrl;
                var price = '';
                data.productId.merchandise.map(merchandiseData => {
                    if(merchandiseData.name === mode){
                        price = merchandiseData.price;
                    }
                });
                newWishlistData.push({
                    _id: _id,
                    productId: productId,
                    name: name,
                    image:image,
                    price: price,
                    mode: mode,
                    email: email,
                    createdAt: createdAt
                });
            });

            return res.status(200).send(newWishlistData);
        }
    }
    catch(error){
        return res.status(400).send(error);
    }
}

const removeWishlist = async(req, res, next) => {
    try {
        const id = req.params.id;
        await Wishlist.remove({_id: id});
        return res.status(200).send('Product removed successfully.');
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}