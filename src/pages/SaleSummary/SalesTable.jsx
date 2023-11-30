
const SalesTable = ({item, index}) => {
    const totalProfit= parseInt(item.sellingPrice) - parseInt(item.productionCost);
    const excludeTax=(totalProfit * (7.5 / 100));
    const actualProfit=totalProfit-excludeTax;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.productName}</td>
            <td>{item.dateTime}</td>
            <td>{actualProfit} $</td>
        </tr>
    );
};

export default SalesTable;