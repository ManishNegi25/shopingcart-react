import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => {
    const productName = faker.commerce.productName().split(' ').join('-'); // Replace spaces with hyphens
    return {
      id: faker.datatype.uuid(),
      image: `https://source.unsplash.com/200x200/?${productName}`, 
      name: `${productName}`,
      price: faker.commerce.price(),
     // Unsplash URL for random shopping item image
      inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    };
  });

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
