import { Product } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState{
    item:Array<Product>;
    totalAmount:number;
    totalQuantity:number;
}
const initialState: CartState= {
item:[],
totalAmount:0,
totalQuantity:0
}
export const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state: CartState, action: PayloadAction<{product:Product; quantity:number }> ){
            const newItem = action.payload.product;
            const existingItem = state.item.find((item) => item._id === newItem._id);
            state.totalQuantity = state.totalQuantity+action.payload.quantity;
            state.totalAmount = state.totalAmount+action.payload.quantity * action.payload.product.price;
            if(!existingItem){
                const totalPrice = newItem.price * action.payload.quantity;
                state.item.push({
                    ...newItem,
                    quantity:action.payload.quantity,
                    totalPrice,
                })
            }
            else{
                const totalPrice = existingItem.totalPrice + existingItem.price * action.payload.quantity;
                existingItem.quantity +=action.payload.quantity;
                existingItem.totalPrice= totalPrice;

            }
        },
            removeProduct(state:CartState, action:PayloadAction<string>)
            {
                const productId= action.payload;
                state.item = state.item.filter((item)=> item._id !== productId);
                state.totalQuantity = state.item.reduce((total,item) => total+item.quantity,0)
                state.totalAmount = state.item.reduce((total,item) => total+item.totalPrice,0)
            },
            decrementCartProduct(state: CartState, action:PayloadAction<string>)
            {
                const ProductId= action.payload;
                const existingItem =state.item.find((item)=> item._id !== ProductId); 
                state.totalQuantity--;
                state.totalAmount = state.totalAmount- existingItem?.price!;
                if(existingItem?.quantity === 1){
                    state.item = state.item.filter((item)=> item._id !== ProductId);
                }
                else{
                    existingItem!.quantity--;
                    existingItem!.totalPrice= existingItem!.totalPrice = existingItem?.price!;
                }
            }
        },
        
    }

)
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;