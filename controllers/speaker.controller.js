const Speaker = require('./../models/speaker.model');

const addSpeaker = async(req, res, next) => {
    try {
        let  speaker = new Speaker(req.body.name, req.body.url);
        var [data, _] = await Speaker.checkDataExisting(req.body.title, req.body.url);
        if(data.length === 0 ){
            await speaker.save();  
        }
        else{
            return res.status(400).json({message: "Product Type exist."});
        }
        res.status(201).json({message: "Speaker Added"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSpeaker
}