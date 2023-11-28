
const CheckOut = ({ item, cartLoading }) => {
    return (
        <div>
            {
                cartLoading ? '' :
                    <div className="card w-96 h-96 bg-base-200 rounded-none">
                        <figure className="px-10 pt-10">
                            <img src={item.productImage} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-blue-800 font-bold">{item.productName}</h2>
                            <p className="text-xl font-semibold">$ {item.sellingPrice}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary text-xl">Proceed Check Out</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default CheckOut;