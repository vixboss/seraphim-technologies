const mongoose = require('mongoose');

const Subscription = require('../models/subscription.model');

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

const getSubscription = async(req, res, next) => {
    try {
        const getSubscription = await Subscription.find();
        if(getSubscription.length === 0){
            return res.status(202).send('No Record(s) Found.');
        }
        else{
            return res.status(200).send(getSubscription);
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}

const addSubscription = async(req, res, next) => {
    try {
        let subscription = new Subscription({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            job: req.body.title,
            industry: req.body.industry,
            subscription: true,
            createdAt: currentDate()
        });
        const data = await Subscription.find({email: req.body.email});
        if(data.length === 0){
            await subscription.save();
        }
        else{
            return res.status(400).send("Subscription On Email Exist.");
        }
        return res.status(200).send("Subscription Added Successfully.");
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateSubscription = async(req, res, next) => {
    try {
        const email = req.params.email;
        console.log(email);
        const data = await Subscription.find({email: email});

        if(data.length === 1){
            await Subscription.findOneAndUpdate({email: email}, {
                subscription: false,
                createdAt: currentDate()
            });
        }
        else{
            res.status(400).send("Email doesn't exist on Subscription.");
        }
        return res.status(200).send('Unsubscribed successfully.');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

module.exports = {
    addSubscription,
    updateSubscription,
    getSubscription
}