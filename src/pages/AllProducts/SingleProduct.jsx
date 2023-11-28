import { CiMoneyCheck1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const SingleProduct = ({ product, handleProductCart }) => {
    const { productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount } = product;
    const newProduct = { productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount };
    return (
        <tr>
            <th>
                {newProduct._id}
            </th>
            <th>
                {newProduct.productName}
            </th>
            <th>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={newProduct.productImage} />
                    </div>
                </div>
            </th>

            <th>{newProduct.productionQuantity}</th>
            <th>$ {newProduct.productDiscount}</th>
            <th>$ {newProduct.sellingPrice}</th>
            <th><Link to={`/dashboard/checkOutCart`}><button onClick={() => handleProductCart(newProduct)} className="btn btn-ghost btn-md"><CiMoneyCheck1 className="text-4xl text-blue-800" /></button></Link></th>
        </tr>
    );
};

export default SingleProduct;