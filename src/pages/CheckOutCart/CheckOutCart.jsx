import CheckOut from "../../components/CheckOut/CheckOut";
import useCart from "../../hooks/useCart";

const CheckOutCart = () => {
    const [cartData, cartLoading, refetch] = useCart();
    console.log(cartData);
    refetch();
    return (
        <div>
            {
                cartData?.length === 0 ? <h2 className="text-6xl text-red-500 text-center my-10 font-semibold">No Products</h2> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 m-5">
                        {
                            cartLoading ? '' : cartData.map(item => <CheckOut key={item._id} item={item} cartLoading={cartLoading} refetch={refetch}></CheckOut>)
                        }
                    </div>
            }
        </div>
    );
};

export default CheckOutCart;