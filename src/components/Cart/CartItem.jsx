import styles from './CartItem.module.scss';
import {useContext} from "react";
import CartContext from "../../context/cart-context.js";


const CartItem = ({ cart }) => {

    // Context에서 removeItem 함수를 가져옵니다. (함수 이름은 실제 Context에 정의된 이름에 맞춰야 합니다)
    const { addToCartItem, removeToCartItem } = useContext(CartContext);

    // cart 객체에서 id를 추출합니다. 아이템을 구별하기 위해 id가 필요합니다.
    const { id, name, price, amount } = cart;

    const {
        'cart-item': cartItem,
        summary,
        price: priceStyle,
        amount: amountStyle,
        actions,
    } = styles;

    const formatPrice = new Intl.NumberFormat('ko-KR').format(price);

    const handleAddToCart = () => {
        addToCartItem({ ...cart, amount: 1 });
    };

    const handleRemoveToCart = () => {
        removeToCartItem(id);
    };

    return (
        <li className={cartItem}>
            <div>
                <h2>{name}</h2>
                <div className={summary}>
                    <span className={priceStyle}>{formatPrice}</span>
                    <span className={amountStyle}>x {amount}</span>
                </div>
            </div>
            <div className={actions}>
                <button onClick={handleRemoveToCart}>−</button>
                <button onClick={handleAddToCart}>+</button>
            </div>
        </li>
    );
};

export default CartItem;