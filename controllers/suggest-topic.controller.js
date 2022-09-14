const mongoose = require('mongoose');

const SuggestTopic = require('../models/suggest-topic.model');

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

const getSuggestTopic = async(req, res, next) => {
    try {
        const getSuggestTopic = await SuggestTopic.find();
        if(getSuggestTopic.length === 0){
            return res.status(202).send('No Record(s) Found.');
        }
        else{
            return res.status(200).send(getSuggestTopic);
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}

const addSuggestTopic = async(req, res, next) => {
    try {
        let suggestTopic = new SuggestTopic({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            job: req.body.title,
            industry: req.body.industry,
            suggestedTopic: req.body.topicSuggestion,
            createdAt: currentDate()
        });
        
        await suggestTopic.save();
        return res.status(200).send("Suggest Topic Added Successfully.");
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    addSuggestTopic,
    getSuggestTopic
}