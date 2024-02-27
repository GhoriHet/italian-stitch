import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const initialState = {
    isLoading: false,
    category: [],
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

export const getCategory = createAsyncThunk(
    'category/get',
    async () => {

        let data = []

        const querySnapshot = await getDocs(collection(db, "category"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        return data;
    }
)

export const addCategory = createAsyncThunk(
    'category/post',
    async (data) => {

        try {
            const docRef = await addDoc(collection(db, "category"), data);

            return { ...data, id: docRef.id }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (id) => {

        await deleteDoc(doc(db, "category", id));
        return id;
    }
)

export const updateCategory = createAsyncThunk(
    'category/put',
    async (data) => {

        const washingtonRef = doc(db, "category", data.id);

        let categoryData = { ...data, id: data.id };
        delete categoryData.id;

        await updateDoc(washingtonRef, categoryData);

        return data;
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getCategory.pending, onLoading);

        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.category = action.payload;
        })

        builder.addCase(getCategory.rejected, onError);

        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.category = state.category.concat(action.payload)
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.category = state.category.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.category = state.category.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default categorySlice.reducer;