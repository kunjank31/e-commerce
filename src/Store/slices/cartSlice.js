import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  total: 0,
  qty: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      let findIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (findIndex >= 0) {
        state.products[findIndex].qty += 1;
      } else {
        let p = { ...action.payload, qty: 1 };
        state.products.push(p);
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setIncrement(state, action) {
      let findIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (state.products[findIndex].qty >= 1) {
        state.products[findIndex].qty += 1;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setDecrement(state, action) {
      let findIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (state.products[findIndex].qty === 1) {
        state.products[findIndex].qty = 1;
      } else if (state.products[findIndex].qty > 1) {
        state.products[findIndex].qty -= 1;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeCart(state, action) {
      state.products.map((product) => {
        if (product.id === action.payload) {
          let newCart = state.products.filter((p) => p.id !== product.id);
          state.products = newCart;
        }
        return localStorage.setItem("products", JSON.stringify(state.products));
      });
    },
    getTotals(state) {
      const { total, qty } = state.products.reduce(
        (cartTotal, item) => {
          const { qty, price } = item;
          const itemTotal = qty * price;
          // console.log(itemTotal)
          cartTotal.total += itemTotal;
          cartTotal.qty += qty;
          // console.log(cartTotal)
          return cartTotal;
        },
        {
          total: 0,
          qty: 0,
        }
      );
      state.qty = qty;
      state.total = total;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, removeCart, setIncrement, setDecrement, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
