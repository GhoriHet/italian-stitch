import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";


export const signupAPI = async (data) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        const userInfo = {
            email: user.email,
            isVerified: false,
        };
        // await db.collection("user").doc(user.uid).set(userInfo)
        await setDoc(doc(db, "user", user.uid), userInfo);

        await sendEmailVerification(user);

        return { message: 'Email verification sent!', user: user };
    } catch (error) {
        console.error("Error during user creation:", error);

        if (error && error.code) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                throw { message: "Email ID already used!" };
            } else if (errorCode.localeCompare("auth/weak-password") === 0) {
                throw { message: "Password is too short - should be 6 characters..." };
            } else {
                throw { message: errorMessage };
            }
        } else {
            throw { message: 'Unexpected error during user creation.' };
        }
    }
};

export const loginAPI = (values) => {
    try {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then(async (userCredential) => {
                    const user = userCredential.user;

                    if (user.emailVerified) {
                        const docRef = await updateDoc(doc(db, "user", user.uid), { isVerified: true });

                        resolve({ message: 'Login Successfully', user: user });

                    } else {
                        return reject({ message: 'Email is not verified' })
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (error.code.localeCompare('auth/invalid-credential') === 0) {
                        reject({ message: 'Please enter valid password.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    } else {
                        reject({ message: 'Unexpected error during login.' });
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

// export const loginAPI = (values) => {
//     try {
//         return new Promise((resolve, reject) => {
//             signInWithEmailAndPassword(auth, values.email, values.password)
//                 .then((userCredential) => {
//                     const user = userCredential.user;
//                     if (user.emailVerified) {
//                         resolve({ message: 'Login Successfully', user: user });
//                     } else {
//                         reject({ message: 'Your added email is not verified.' })
//                     }
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     if (error.code.localeCompare('auth/invalid-credential') === 0) {
//                         reject({ message: 'Please enter valid password.' })
//                     } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
//                         reject({ message: 'Please check your internet connection.' })
//                     }
//                 });
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

export const forgotPassAPI = (data) => {
    try {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth, data.email)
                .then(() => {
                    resolve({ message: 'Password reset email sent!' });
                })
                .catch((error) => {
                    if (error.code.localeCompare('auth/user-not-found') === 0) {
                        reject({ message: 'Please enter your registred email address.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const logoutAPI = () => {
    try {
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                resolve({ message: 'Logout Successfully.' });
            }).catch((error) => {
                reject({ message: error.code })
            });
        })
    } catch (error) {
        console.log(error)
    }
}