import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from '../../../firebase'
const initState = {
    order: [],
    loading: false,
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
export const getOrder = createAsyncThunk(
    'order/get',
    async () => {
        try {
            const data = []
            const querySnapshot = await getDocs(collection(db, "order"));
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

export const updateOrderStatus = createAsyncThunk(
    'order/updateStatus',
    async ({ orderId, newStatus }) => {
        try {
            const orderRef = doc(db, 'order', orderId);
            await updateDoc(orderRef, {
                status: newStatus,
            });

            return { orderId, newStatus };
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }
);

export const addOrder = createAsyncThunk(
    'order/add',

    async (data) => {
        let iData = { ...data }
        try {
            const docRef = await addDoc(collection(db, "order"), { ...iData });
            iData = {
                id: docRef.id,
                ...data,
            }
        } catch (error) {
            console.log(error)
        }
        return iData;
    }
)
export const OrderSlice = createSlice({
    name: 'order',
    initialState: initState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, onLoading)
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(getOrder.rejected, onError)
            .addCase(addOrder.fulfilled, (state, action) => {
                state.order = state.order.concat(action.payload)
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const { orderId, newStatus } = action.payload;
                const orderToUpdate = state.order.find(order => order.id === orderId);

                if (orderToUpdate) {
                    orderToUpdate.status = newStatus;
                }
            });
    }
})

export const { setOrder } = OrderSlice.actions;
export const selectOrder = state => state.order.order;

export default OrderSlice.reducer;