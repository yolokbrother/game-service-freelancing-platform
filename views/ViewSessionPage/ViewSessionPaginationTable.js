import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

const ViewSessionPaginationTable = ({ ordersData }) => {

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const columns = [
        { field: 'id', headerName: 'Session ID', width: 200 },
        { field: 'ArriveBuyer', headerName: 'ArriveBuyer', width: 200 },
        { field: 'ArriveSeller', headerName: 'ArriveSeller', width: 150 },
        { field: 'buyerID', headerName: 'BuyerID', width: 200 },
        { field: 'orderID', headerName: 'OrderID', width: 100 },
        { field: 'rating', headerName: 'Rating', width: 100 },
        { field: 'sellerID', headerName: 'SellerID', width: 150 },
        { field: 'serviceId', headerName: 'ServiceId', width: 150 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={ordersData}
                columns={columns}
                pagination
                pageSize={pageSize}
                rowHeight={100}
                rowCount={ordersData.length}
                onPageChange={handleChange}
                paginationMode="client"
            />
        </div>
    );
};

export default ViewSessionPaginationTable;