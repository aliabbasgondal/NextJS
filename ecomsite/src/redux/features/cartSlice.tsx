import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../interfaces";
import { RootState } from "../store";

interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  isLoading: boolean;
  error: any;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "cart/fetchData",
  async (userID: string) => {
    console.log(userID);
    const res = await fetch(`/api/cart?user_id=${userID}`);
    if (!res.ok) {
      console.log("Failed to get Data");
    }
    const data = await res.json();
    console.log(data,'data');
    return data; // Make sure to return the fetched data
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<{ product: Product; quantity: number }>) {
      const newItem = action.payload.product;
      const existingItemIndex = state.items.findIndex((item) => item._id === newItem._id);

      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.quantity * newItem.price;

      if (existingItemIndex === -1) {
        const totalPrice = newItem.price * action.payload.quantity;
        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice,
        });
      } else {
        const totalPrice = state.items[existingItemIndex].totalPrice + newItem.price * action.payload.quantity;
        state.items[existingItemIndex].quantity += action.payload.quantity;
        state.items[existingItemIndex].totalPrice = totalPrice;
      }
    },
    removeProduct(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    decrementCartProduct(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item._id === productId);

      state.totalQuantity--;

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1); // Remove the item if the quantity becomes 0
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      }
    }
    ,
    clearCart(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // handle async actions with builder methods
    builder.addCase(fetchData.pending, (state) => {
      // set loading state to true
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { cartItems, totalQuantity, totalPrice } = action.payload;
      state.items = cartItems;
      state.totalAmount = totalPrice;
      state.totalQuantity = totalQuantity;
      state.isLoading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      // set loading state to false and error state to true
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const selectIsLoading = (state: RootState) => state.cart.isLoading;
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
