import React, {useState} from 'react';
import CartContext from './cart-context.js';

const CartProvider = ({children}) => {

    // 장바구니 배열을 상태 관리
    const [cartItems, setCartItems] = useState([]);

    // 장바구니 모달을 여닫는 상태변수
    const [cartIsShown, setCartIsShown] = useState(false);

    // 장바구니에 데이터를 추가하는 함수
    const handleAddToCartItem = (newItem) => {

        // 원본 장바구니배열을 복사
        const existingItems = [...cartItems];
        // 이미 장바구니에 있는 항목인지를 체크
        const foundItem = existingItems.find(cartItem => cartItem.id === newItem.id);

        if (foundItem) { // 기존에 있는 아이템
            foundItem.amount += newItem.amount;
            foundItem.price += newItem.price;
            setCartItems(existingItems); // 원본에 수정된 복사배열 갱신
        } else { // 새롭게 추가된 아이템
            setCartItems([...cartItems, newItem]);
        }

    };

    // 장바구니 삭제 함수
    const handleRemoveToCartItem = (id) => {
        // 원본 장바구니배열을 복사
        const existingItems = [...cartItems];

        // 1. 이미 장바구니에 있는 항목인지를 체크
        const foundItem = existingItems.find(cartItem => cartItem.id === id);

        // 2. 해당 아이템의 현재 수량을 기준으로 단가를 계산합니다.
        const price = foundItem.price / foundItem.amount;

        // 3. 만약 아이템의 수량이 1개라면, filter를 이용해 배열에서 완전히 제거합니다.
        if (foundItem.amount === 1) {
            const filteredItems = cartItems.filter(item => item.id !== id);
            setCartItems(filteredItems);
        } else {
            // 4. 수량이 2개 이상이면, map을 이용해 해당 아이템의 수량과 가격을 1씩 감소시킵니다.
            const updatedItems = cartItems.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        amount: item.amount - 1,
                        price: item.price - price,
                    };
                }
                return item;
            });
            setCartItems(updatedItems);
        }

    };

    // 모달을 열어주는 함수
    const handleShowCart = () => setCartIsShown(true);

    // 모달을 닫아주는 함수
    const handleHideCart = () => setCartIsShown(false);

    // 컨텍스트가 실제로 관리할 중앙 상태값
    const initialValue = {
        cartIsShown,
        openModal: handleShowCart,
        closeModal: handleHideCart,
        cartItems,
        addToCartItem: handleAddToCartItem,
        removeToCartItem: handleRemoveToCartItem
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;