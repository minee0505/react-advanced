
// 장바구니 앱에서 사용할 공유 상태값들을 중앙관리하는 저장소

import {createContext} from "react";

const defaultValue = {

        cartIsShown: false,
        openModal: () => {},
        closeModal:  () => {},
        cartItems: [],
        addToCartItem: (cartItems) => {},
        removeToCartItem: (id) => {},

};

const CaetContext = createContext(defaultValue);

export default CaetContext;
