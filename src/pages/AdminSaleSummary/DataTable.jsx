const DataTable = ({item, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.shopName}</td>
            <td>{item.role}</td>
        </tr>
    );
};

export default DataTable;