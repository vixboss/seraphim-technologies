'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const Merchandise = require('../models/merchandise.model');

const addMerchandiseTitle = async(req, res, next) => {
    try {
        const titleData = req.body;
        const merchandiseTitle = await firestore.collection('merchandise');
        const checkMerchandiseExist = await merchandiseTitle
        .where('title', '==', req.body.title.toLowerCase())
        .get();
        const titleArray = [];
        checkMerchandiseExist.forEach(doc => {
            const title = new Merchandise(
                doc.id,
                doc.data().title,
            );
            titleArray.push(title);
        });
        if(titleArray.length !== 0){
            return res.status(409).send('Product Title exist');
        }
        else{
            merchandiseTitle.doc().set(titleData);
            return res.status(201).send({
                message: "Merchandise Title saved successfully."
            });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getAllMerchandise = async(req, res, next) => {
    try { 
        const merchandiseTitle = await firestore.collection('merchandise');
        const data = await merchandiseTitle.get();
        const merchandiseTitleArray = [];

        if(data.empty){
            res.status(202).send({
                merchandiseTitleArray,
                'message': 'No Product Types found.'
            });
        }else{
            data.forEach(doc => {
                const title = new Merchandise(
                    doc.id,
                    doc.data().title
                );
                merchandiseTitleArray.push(title);
            });
            res.status(200).send({
                merchandiseTitleArray
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMerchandise = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        console.log(body);
        const merchandiseTitle = await firestore.collection('merchandise');
        const checkMerchandiseTitle = await merchandiseTitle
            .where('title', '==', req.body.title.toLowerCase())
            .get();
        const typeArray = [];
        checkMerchandiseTitle.forEach(doc => {
            const type = new Merchandise(
                doc.id,
                doc.data().title
            );
            typeArray.push(type);
        });
        if(typeArray.length !== 0){
            res.status(409).send('Merchandise Title exist');
        }
        else{
            await firestore.collection('merchandise')
                .doc(id)
                .update(body);
            res.status(200).send('Merchandise updated successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMerchandiseById = async(req, res, next) => {
    try {
        var isMerchandiseExistOfTitle = false;
        const id = req.params.id;
        const titleRef = await firestore.collection('merchandise')
            .doc(id)
            .get();
        const title = titleRef.data().title;
        const collectionRef = await firestore.collection('collections');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                if(title.toLowerCase() === docSnapshot.data().title.toLowerCase()) {
                    isMerchandiseExistOfTitle = true;
                }
            })
        });
        if(!isMerchandiseExistOfTitle){
            await firestore.collection('merchandise').doc(id).delete();
            res.status(200).send('Merchandise deleted successfully');
        }
        else{
            res.status(400).send('Merchandise Exist For Same Type.');
        }
    } catch (error) {
        res.status(400).send(error.message);  
    }
}

module.exports = {
    addMerchandiseTitle,
    getAllMerchandise,
    updateMerchandise,
    deleteMerchandiseById
}