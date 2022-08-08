'use strict';
// const firebase = require('../db');
// const firestore = firebase.firestore();

const mongoose = require('mongoose');
const Merchandise = require('../models/merchandise.model');

// const addMerchandiseTitle = async(req, res, next) => {
//     // try {
//     //     const titleData = req.body;
//     //     const merchandiseTitle = await firestore.collection('merchandise');
//     //     const checkMerchandiseExist = await merchandiseTitle
//     //     .where('title', '==', req.body.title.toLowerCase())
//     //     .get();
//     //     const titleArray = [];
//     //     checkMerchandiseExist.forEach(doc => {
//     //         const title = new Merchandise(
//     //             doc.id,
//     //             doc.data().title,
//     //         );
//     //         titleArray.push(title);
//     //     });
//     //     if(titleArray.length !== 0){
//     //         return res.status(409).send('Product Title exist');
//     //     }
//     //     else{
//     //         merchandiseTitle.doc().set(titleData);
//     //         return res.status(201).send({
//     //             message: "Merchandise Title saved successfully."
//     //         });
//     //     }
//     // } catch (error) {
//     //     return res.status(400).send(error.message);
//     // }
// }

// const getAllMerchandise = async(req, res, next) => {
//     // try { 
//     //     const merchandiseTitle = await firestore.collection('merchandise');
//     //     const data = await merchandiseTitle.get();
//     //     const merchandiseTitleArray = [];

//     //     if(data.empty){
//     //         res.status(202).send({
//     //             merchandiseTitleArray,
//     //             'message': 'No Product Types found.'
//     //         });
//     //     }else{
//     //         data.forEach(doc => {
//     //             const title = new Merchandise(
//     //                 doc.id,
//     //                 doc.data().title
//     //             );
//     //             merchandiseTitleArray.push(title);
//     //         });
//     //         res.status(200).send({
//     //             merchandiseTitleArray
//     //         });
//     //     }
//     // } catch (error) {
//     //     res.status(400).send(error.message);
//     // }
// }

// const updateMerchandise = async (req, res, next) => {
//     // try {
//     //     const id = req.params.id;
//     //     const body = req.body;
//     //     console.log(body);
//     //     const merchandiseTitle = await firestore.collection('merchandise');
//     //     const checkMerchandiseTitle = await merchandiseTitle
//     //         .where('title', '==', req.body.title.toLowerCase())
//     //         .get();
//     //     const typeArray = [];
//     //     checkMerchandiseTitle.forEach(doc => {
//     //         const type = new Merchandise(
//     //             doc.id,
//     //             doc.data().title
//     //         );
//     //         typeArray.push(type);
//     //     });
//     //     if(typeArray.length !== 0){
//     //         res.status(409).send('Merchandise Title exist');
//     //     }
//     //     else{
//     //         await firestore.collection('merchandise')
//     //             .doc(id)
//     //             .update(body);
//     //         res.status(200).send('Merchandise updated successfully');
//     //     }
//     // } catch (error) {
//     //     res.status(400).send(error.message);
//     // }
// }

// const deleteMerchandiseById = async(req, res, next) => {
//     // try {
//     //     var isMerchandiseExistOfTitle = false;
//     //     const id = req.params.id;
//     //     const titleRef = await firestore.collection('merchandise')
//     //         .doc(id)
//     //         .get();
//     //     const title = titleRef.data().title;
//     //     const collectionRef = await firestore.collection('collections');
//     //     await collectionRef.get().then(snapshot => {
//     //         snapshot.docs.map(docSnapshot => {
//     //             if(title.toLowerCase() === docSnapshot.data().title.toLowerCase()) {
//     //                 isMerchandiseExistOfTitle = true;
//     //             }
//     //         })
//     //     });
//     //     if(!isMerchandiseExistOfTitle){
//     //         await firestore.collection('merchandise').doc(id).delete();
//     //         res.status(200).send('Merchandise deleted successfully');
//     //     }
//     //     else{
//     //         res.status(400).send('Merchandise Exist For Same Type.');
//     //     }
//     // } catch (error) {
//     //     res.status(400).send(error.message);  
//     // }
// }

// ************************* From MYSQL DB *****************************

// const addMerchandiseTitle = async(req, res, next) => {
//     try {
//         let  title = new Merchandise(req.body.title);
//         title = await title.save();

//         res.status(201).json({message: "Merchandise Created"});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getAllMerchandise = async(req, res, next) => {
//     try {
//         const [merchandiseTitleArray, _] = await Merchandise.findAll();
//         res.status(200).json({merchandiseTitleArray});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateMerchandise = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         let title = req.body.title;
//         await Merchandise.update(id, title);

//         res.status(200).json({message: 'Merchandise updated successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteMerchandiseById = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         await Merchandise.remove(id);

//         res.status(200).json({message: 'Merchandise Title Removed Successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }
// ******************************************************************

// ************** FROM MONGODB **************************************

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

const addMerchandiseTitle = async(req, res, next) => {
    try {
        let title = new Merchandise({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            createdAt: currentDate()
        });
        var data = await Merchandise.find({title: req.body.title});
        if(data.length === 0){
            await title.save();  
        }
        else {
            return res.status(400).json({message: "Merchandise Exist"});
        }
        res.status(201).json({message: "Merchandise Created"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMerchandise = async(req, res, next) => {
    try {
        const merchandiseTitleArray = await Merchandise.find();
        res.status(200).json({merchandiseTitleArray});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMerchandise = async(req, res, next) => {
    try {
        let id = req.params.id;
        let title = req.body.title;
        await Merchandise.findByIdAndUpdate({
            _id: id
        },{
            title: title,
            createdAt: currentDate()
        });

        res.status(200).json({message: 'Merchandise updated successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMerchandiseById = async(req, res, next) => {
    try {
        let id = req.params.id;
        await Merchandise.remove({_id: id});

        res.status(200).json({message: 'Merchandise Title Removed Successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// ******************************************************************

module.exports = {
    addMerchandiseTitle,
    getAllMerchandise,
    updateMerchandise,
    deleteMerchandiseById
}