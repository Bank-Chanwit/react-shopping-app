const cartReducer = (state, action) => {
  //กระบวนการจัดการ state ผ่าน action
  if (action.type === "CALCULATE_TOTAL") {
    const { total, amount } = state.products.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item;
        const totalprice = price * quantity; //ยอดรวมสินค้าแต่ละรายการ
        cartTotal.total += totalprice; //จำนวนเงินรวม
        cartTotal.amount += quantity; // ปริมาณรวม
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      },
    );
    return {
      ...state,
      total,
      amount,
    };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "ADD") {
    let upadateProduct = state.products.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      products: upadateProduct,
    };
  }
  if (action.type === "SUBTRACT") {
    let upadateProduct = state.products
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
    return {
      ...state,
      products: upadateProduct,
    };
  }
  return state;
};

export default cartReducer;
