import Item from "./Item";
import { useCart } from "../context/CartContext";
export default function Cart(){
    const {products} = useCart()
    return(
        <div className="cart">
            {products.map((data)=>{
                return <Item key={data.id} {...data}/>
            })}
        </div>
    )
}