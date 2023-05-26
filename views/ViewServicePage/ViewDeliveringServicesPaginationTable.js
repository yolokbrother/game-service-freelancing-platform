import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

const ViewDeliveringServicesPaginationTable = ({ ordersData }) => {

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const router = useRouter();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleRowClick = (params) => {
        router.push({
          pathname: 'ViewDeliveringServiceViewPage',
          query: { rowData: JSON.stringify(params.row) },
        });
    };

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 200 },
        { field: 'serviceId', headerName: 'Service ID', width: 200 },
        {
            field: 'serviceImage',
            headerName: 'Service Image',
            width: 150,
            renderCell: (params) => {
              return <img src={params.value} alt="Service" style={{ width: '100%', height: 'auto' }} />;
            },
          },
        { field: 'serviceName', headerName: 'Service Name', width: 150 },
        { field: 'serviceDetail', headerName: 'Service Detail', width: 200 },
        { field: 'teamLink', headerName: 'Team Link', width: 100 },
        { field: 'language', headerName: 'Language', width: 100 },
        { field: 'buyerID', headerName: 'Buyer ID', width: 150 },
        { field: 'dateArrange', headerName: 'Date Arrange', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        

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
                onRowClick={handleRowClick}
                paginationMode="client"
            />
        </div>
    );
};

export default ViewDeliveringServicesPaginationTable;