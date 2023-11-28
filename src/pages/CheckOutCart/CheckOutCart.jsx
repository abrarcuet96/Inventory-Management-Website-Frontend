import CheckOut from "../../components/CheckOut/CheckOut";
import useCart from "../../hooks/useCart";

const CheckOutCart = () => {
    const [cartData, cartLoading, refetch] = useCart();
    console.log(cartData);
    refetch();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 m-5">
            {
                cartLoading? '': cartData.map(item=> <CheckOut key={item._id} item={item} cartLoading={cartLoading}></CheckOut>)
            }
        </div>
    );
};

export default CheckOutCart;