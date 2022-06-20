import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyC2i0ysezEM7Oualp3EvgMW9-HCiN4mYQw",
    authDomain: "seraphim-db.firebaseapp.com",
    projectId: "seraphim-db",
    storageBucket: "seraphim-db.appspot.com",
    messagingSenderId: "589001300669",
    appId: "1:589001300669:web:71b36e0305ebc51242f5d4",
    measurementId: "G-4VE9ZGB0Y7"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } 
        catch(error){
            console.log("Error creating User", error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    // const transformedCollection = collections.docs.map(docSnapshot => {
    //     const { title, items } = docSnapshot.data();

    //     console.log(docSnapshot.data());
    //     return {
    //         routeName: encodeURI(title.toLowerCase()),
    //         id: docSnapshot.id,
    //         title,
    //         items
    //     }
    // })

    // return transformedCollection.reduce((accumulator, collection) => {
    //     accumulator[collection.title.toLowerCase()] = collection;
    //     return accumulator;
    // }, {});

    const transformedCollection = collections.data.map(docSnapshot => {
        return {
                    routeName: encodeURI(docSnapshot.title.toLowerCase()),
                    id: docSnapshot.id,
                    title: docSnapshot.title,
                    items: docSnapshot.items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
    
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;