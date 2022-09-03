const mongoose = require('mongoose');

const SpeakerOpportunity = require('./../models/speaker-opportunity.model');

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

const addSpeakerOpportunity = async ( req, res, next ) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const jobTitle = req.body.jobTitle;
        const company = req.body.company;
        const phone = req.body.phone;
        const fax = req.body.fax;
        const email = req.body.email;
        const industries = req.body.industries;

        const speakerOpportunity = new SpeakerOpportunity({
            _id: new mongoose.Types.ObjectId(),
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            company: company,
            phone: phone,
            fax: fax,
            email: email,
            industries: industries,
            createdAt: currentDate()
        });
        const responseAPI = await speakerOpportunity.save();
        return res.status(200).send(responseAPI);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getAllSpeakerOpportunity = async (req, res, next) => {
    try {
        const getAllSpeakerOpportunities = await SpeakerOpportunity.find({});
        return res.status(200).send(getAllSpeakerOpportunities);
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    addSpeakerOpportunity,
    getAllSpeakerOpportunity
}