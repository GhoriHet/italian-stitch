import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const initialState = {
    isLoading: false,
    clothsubcat: [],
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

export const getClothSubCat = createAsyncThunk(
    'clothsubcat/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "subcategory"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        return data;
    }
)

export const addClothSubCat = createAsyncThunk(
    'clothsubcat/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "subcategory"), data);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const deleteClothSubCat = createAsyncThunk(
    'clothsubcat/delete',
    async (id) => {

        await deleteDoc(doc(db, "subcategory", id));

        return id;
    }
)

export const updateClothSubCat = createAsyncThunk(
    'clothsubcat/put',
    async (data) => {
        const washingtonRef = doc(db, "subcategory", data.id);

        let watchsubcatData = { ...data, id: data.id };
        delete watchsubcatData.id;

        await updateDoc(washingtonRef, watchsubcatData);

        return data;
    }
)

export const ClothsubSlice = createSlice({
    name: 'ClothSubCat',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getClothSubCat.pending, onLoading);

        builder.addCase(getClothSubCat.fulfilled, (state, action) => {
            state.clothsubcat = action.payload;
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(getClothSubCat.rejected, onError);

        builder.addCase(addClothSubCat.fulfilled, (state, action) => {
            state.clothsubcat = state.clothsubcat.concat(action.payload)
        })

        builder.addCase(deleteClothSubCat.fulfilled, (state, action) => {
            state.clothsubcat = state.clothsubcat.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateClothSubCat.fulfilled, (state, action) => {
            state.clothsubcat = state.clothsubcat.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default ClothsubSlice.reducer;