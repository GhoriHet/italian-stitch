import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { auth, db } from "../../../firebase"

const initialState = {
    isLoading: false,
    userInfo: [],
    errorMessage: null
}

export const getuserInfoData = createAsyncThunk(
    'userInfo/get',
    async () => {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000))

        let data = []

        const querySnapshot = await getDocs(collection(db, "user"));
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        return data;
    }
)

export const adduserInfoData = createAsyncThunk(
    'userInfo/add',
    async (data) => {
        console.log(data);
        let iData = { ...data }
        const user = auth.currentUser;
        if (user) {
            iData = {
                ...data,
                isVerified: true
            };
        } else {
            iData = {
                ...data,
                isVerified: false
            };
        }

        const docRef = addDoc(collection(db, "user"), {
            ...iData,
        });

        console.log(iData);
        return iData;
    }
)

export const updateUserData = createAsyncThunk(
    'userInfo/update',
    async (data) => {
        // Destructure the id from data and remove it to prevent updating it
        const { id, ...userData } = data;

        // Construct a reference to the user document using the provided id
        const docRef = doc(db, "user", id);

        // Update the document with the new userData
        await updateDoc(docRef, userData);

        // Return the updated document reference
        return docRef;
    }
)

export const deleteUserData = createAsyncThunk(
    'user/delete',
    async (id) => {
        await deleteDoc(doc(db, "user/", id))

        let user = auth.currentUser
        deleteUser(user).then(() => {
            // User deleted.
            console.log('User Deleted');
        }).catch((error) => {
            // An error ocurred
            console.log(error);
        });

        return id
    }
)

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getuserInfoData.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInfo = action.payload
            state.errorMessage = null
        })

        builder.addCase(updateUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInfo = state.userInfo.filter((v) => v.id === action.payload.id)
            state.errorMessage = null
        })

        builder.addCase(adduserInfoData.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInfo = action.payload
            state.errorMessage = null
        })

        builder.addCase(deleteUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInfo = state.userInfo.filter((v) => v.id !== action.payload)
            state.errorMessage = null
        })
    }
})

export default userInfoSlice.reducer