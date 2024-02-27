import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from '../../../firebase'

const initialState = {
    isLoading: false,
    product: [],
    error: null
}

const onLoading = (state, action) => {
    state.isLoading = true;
    state.error = null;
}

const onError = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
}

export const getProduct = createAsyncThunk(
    'product/get',
    async () => {
        try {
            const data = []
            const querySnapshot = await getDocs(collection(db, "product"));
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addProduct = createAsyncThunk(
    'product/post',
    async (data) => {
        let iData = { ...data }
        try {
            const rNum = Math.floor(Math.random() * 1000000);
            const precRef = ref(storage, 'prec/' + rNum + '_' + data.prec.name);

            await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        iData = { ...data, prec: url }
                        const docRef = await addDoc(collection(db, "product"), { ...iData, imgName: rNum + '_' + data.prec.name });
                        iData = {
                            id: docRef.id,
                            ...data,
                            prec: url,
                        }
                    });
            });
            return iData;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (data) => {
        try {
            const aptRef = ref(storage, 'prec/' + data.imgName);
            await deleteObject(aptRef).then(async () => {
                await deleteDoc(doc(db, "product", data.id));
            });
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
        return data.id;
    }
)

export const updateProduct = createAsyncThunk(
    'product/put',
    async (data) => {
        try {
            if (typeof data.prec === 'string') {
                const aptRef = doc(db, "product", data.id);
                await updateDoc(aptRef, data);
                return data;
            } else {
                const desertRef = ref(storage, 'prec/' + data.imgName);
                let iData = { data }
                await deleteObject(desertRef).then(async () => {
                    const rNo = Math.floor(Math.random() * 1000000);

                    const storageRef = ref(storage, 'prec/' + rNo + '_' + data.prec.name);

                    await uploadBytes(storageRef, data.prec).then(async (snapshot) => {

                        await getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                iData = { ...data, prec: url, imgName: rNo + '_' + data.prec.name }
                                const aptRef = doc(db, "product", data.id);

                                await updateDoc(aptRef, iData);

                                iData = {
                                    ...data,
                                    prec: url,
                                    imgName: rNo + '_' + data.prec.name
                                }
                            })
                    });
                }).catch((error) => {
                    console.log(error)
                });
                return iData
            }
        } catch (error) {
            console.log(error);
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(getProduct.pending, onLoading);

        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.isLoading = false;
            state.error = null;
        });

        builder.addCase(getProduct.rejected, onError);

        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.product = state.product.concat(action.payload)
        });

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.product = state.product.filter((v) => v.id !== action.payload)
        });

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.product = state.product.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        });
    }
});

export default productSlice.reducer;