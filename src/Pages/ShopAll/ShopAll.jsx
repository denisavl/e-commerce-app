/* eslint-disable react/prop-types */
import styles from '../ShopAll/shopAll.module.css'
import Header from '../../components/Header/Header'
export default function ShopAll({cartProd,
    showCart,
    toggleActive,
    handleDelete,
    setCartProd,}){
    return (
        <div>
        <Header cartProd={cartProd}
        showCart={showCart}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        setCartProd={setCartProd}/>
        
        </div>
    )
}