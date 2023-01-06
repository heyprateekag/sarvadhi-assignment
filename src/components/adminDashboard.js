import { useTable } from 'react-table';
import { useMemo } from 'react';
import './adminDashboard.module.css';

const columns = [
    {  
        Header: 'Name',  
        accessor: 'name'  
    },
    {  
        Header: 'Opening Time',  
        accessor: 'openingTime'  
    },
    {  
        Header: 'Closing Time',  
        accessor: 'closingTime'  
    },
    {  
        Header: 'Capacity',  
        accessor: 'seatingCapacity'  
    },
    {  
        Header: 'Address',  
        accessor: 'address'  
    },
    {  
        Header: 'Rating',  
        accessor: 'rating'  
    },
    ];
const AdminDashboard = (props) => {
    const data = useMemo(() => {
        return JSON.parse(localStorage.getItem('restaurants'));
    }, []);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return <div>
         <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    </div>
}

export default AdminDashboard;