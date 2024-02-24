import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const initialState = {
    isLoading: false,
    clothcat: [],
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

export const getClothCat = createAsyncThunk(
    'clothcat/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "category"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        return data;
    }
)

export const addClothCat = createAsyncThunk(
    'clothcat/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "category"), data);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const deleteClothCat = createAsyncThunk(
    'clothcat/delete',
    async (id) => {

        await deleteDoc(doc(db, "category", id));
        return id;
    }
)

export const updateClothCat = createAsyncThunk(
    'clothcat/put',
    async (data) => {

        const washingtonRef = doc(db, "category", data.id);

        let clothCatData = { ...data, id: data.id };
        delete clothCatData.id;

        await updateDoc(washingtonRef, clothCatData);

        return data;
    }
)

export const clothcatSlice = createSlice({
    name: 'clothcat',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getClothCat.pending, onLoading);

        builder.addCase(getClothCat.fulfilled, (state, action) => {
            state.clothcat = action.payload;
        })

        builder.addCase(getClothCat.rejected, onError);

        builder.addCase(addClothCat.fulfilled, (state, action) => {
            state.clothcat = state.clothcat.concat(action.payload)
        })

        builder.addCase(deleteClothCat.fulfilled, (state, action) => {
            state.clothcat = state.clothcat.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateClothCat.fulfilled, (state, action) => {
            state.clothcat = state.clothcat.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default clothcatSlice.reducer;