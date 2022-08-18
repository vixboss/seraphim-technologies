const { default: mongoose } = require('mongoose');
const Speaker = require('./../models/speaker.model');

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

const addSpeaker = async(req, res, next) => {
   try {
        let speaker = new Speaker({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            url: req.body.url,
            qualification: req.body.qualification,
            description: req.body.description,
            createdAt: currentDate()
        });
        var data = await Speaker.find({title: req.body.title});
        if(data.length === 0 ){
            await speaker.save();  
        }
        else{
            return res.status(400).send("Speaker exist.");
        }
        res.status(201).send("Speaker Created");
   } catch (error) {
        res.status(400).send(error.message);
   }
}

const getSpeaker = async(req, res, next) => {
    try {
        let speaker = await Speaker.find();
        res.status(200).send(speaker);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSpeaker = async(req, res, next) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const url = req.body.url;
        const qualification =req.body.qualification;
        const description = req.body.description;

        await Speaker.findByIdAndUpdate({
            _id: id
        }, {
            title: title,
            url: url,
            qualification: qualification,
            description: description,
            createdAt: currentDate()
        });
        res.status(200).send('Speaker updated successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSpeakerById = async(req, res, next) => {
    try {
        let id = req.params.id;
        await Speaker.remove({_id: id});

        res.status(200).send('Speaker deleted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSpeaker, 
    getSpeaker,
    updateSpeaker,
    deleteSpeakerById
}