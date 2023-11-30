import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useProducts from "../../hooks/useProducts";
import { jsPDF } from "jspdf";
const CheckOut = ({ item, cartLoading, refetch }) => {
    const { _id, productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount } = item;
    const newId = { _id };
    const newItem = { productName, productImage, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount, productAddedDate, shopName, userEmail, sellingPrice, saleCount };
    const [productData] = useProducts();
    console.log(productData);
    const productId = productData.filter(data => data.productName === productName);
    console.log(productId[0]);
    const axiosSecure = useAxiosSecure();

    const handleGetPaid = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Get Paid"
        }).then((result) => {
            if (result.isConfirmed) {
                const dateTime = new Date();
                const saleData = {
                    ...newItem,
                    dateTime: dateTime
                }
                axiosSecure.post('/sales', saleData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Product is paid",
                                text: "Product paid successfully",
                                icon: "success"
                            });
                            axiosSecure.delete(`/cart/${newId._id}`)
                                .then(res => {
                                    if (res.data.deletedCount > 0) {
                                        refetch();
                                    }
                                })
                            const newSaleCount = newItem.saleCount + 1;
                            const newQuantity = parseInt(productionQuantity) === 0 ? parseInt(productionQuantity) : parseInt(productionQuantity) - 1;
                            const newQuantityString = newQuantity.toString();
                            const newInfo = {
                                productName: productName,
                                productImage: productImage,
                                productDescription: productDescription,
                                productLocation: productLocation,
                                productionCost: productionCost,
                                productionQuantity: newQuantityString,
                                profitMargin: profitMargin,
                                productDiscount: productDiscount,
                                productAddedDate: new Date(),
                                shopName: shopName,
                                userEmail: userEmail,
                                sellingPrice: sellingPrice,
                                saleCount: newSaleCount
                            }
                            const pdfArray = [
                                `Product Name: ${newInfo.productName}`,
                                `Product Description: ${newInfo.productDescription}`,
                                `Product Location: ${newInfo.productLocation}`,
                                `Production Cost: ${newInfo.productionCost}`,
                                `Production Quantity: ${newInfo.productionQuantity}`,
                                `Profit Margin: ${newInfo.profitMargin}`,
                                `Product Discount: ${newInfo.productDiscount}`,
                                `User Email: ${newInfo.userEmail}`,
                                `Sale Count: ${newInfo.saleCount}`,

                            ];
                            console.log(pdfArray);
                            console.log(id);
                            axiosSecure.patch(`/products/${id}`, newInfo)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.modifiedCount > 0) {
                                        refetch();
                                        const doc = new jsPDF();
                                        doc.text(pdfArray, 10, 10);
                                        doc.save("sale_info.pdf");
                                    }
                                })
                        }
                    })

            }
        });
    }
    return (
        <div>
            {
                cartLoading ? '' :
                    <div className="card w-96 h-96 bg-base-200 rounded-none">
                        <figure className="px-10 pt-10">
                            <img src={newItem.productImage} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-blue-800 font-bold">{newItem.productName}</h2>
                            <p className="text-xl font-semibold">$ {newItem.sellingPrice}</p>
                            <div className="card-actions">
                                <button onClick={() => handleGetPaid(productId[0]._id)} className="btn btn-primary text-xl">Get Paid</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default CheckOut;