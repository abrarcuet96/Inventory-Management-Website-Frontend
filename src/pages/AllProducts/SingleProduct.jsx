import { CiMoneyCheck1 } from "react-icons/ci";

const SingleProduct = ({ product, handleProductCart }) => {
    const { productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount, _id } = product;
    const newProduct = { productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount };
    return (
        <tr>
            <th>
                {_id}
            </th>
            <th>
                {productName}
            </th>
            <th>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={productImage} />
                    </div>
                </div>
            </th>

            <th>{productionQuantity}</th>
            <th>{productDiscount}%</th>
            <th>$ {sellingPrice}</th>
            <th>
                {
                    productionQuantity === '0' ? 'Not Available' : <button onClick={() => handleProductCart(newProduct)} className="btn btn-ghost btn-md"><CiMoneyCheck1 className="text-4xl text-blue-800" /></button>
                }
            </th>
        </tr>
    );
};

export default SingleProduct;