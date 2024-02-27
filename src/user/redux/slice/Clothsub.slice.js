import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const initialState = {
    isLoading: false,
    subcategory: [],
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

export const getSubcategory = createAsyncThunk(
    'subcategory/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "subcategory"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        return data;
    }
)

export const addSubcategory = createAsyncThunk(
    'subcategory/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "subcategory"), data);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const deleteSubcategory = createAsyncThunk(
    'subcategory/delete',
    async (id) => {

        await deleteDoc(doc(db, "subcategory", id));

        return id;
    }
)

export const updateSubcategory = createAsyncThunk(
    'subcategory/put',
    async (data) => {
        const washingtonRef = doc(db, "subcategory", data.id);

        let watchsubcatData = { ...data, id: data.id };
        delete watchsubcatData.id;

        await updateDoc(washingtonRef, watchsubcatData);

        return data;
    }
)

export const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getSubcategory.pending, onLoading);

        builder.addCase(getSubcategory.fulfilled, (state, action) => {
            state.subcategory = action.payload;
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(getSubcategory.rejected, onError);

        builder.addCase(addSubcategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.concat(action.payload)
        })

        builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateSubcategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default subcategorySlice.reducer;