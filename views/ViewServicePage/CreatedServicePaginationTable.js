import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import ConfirmDialog from './ConfirmDialog';

//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore, collection, query,
    orderBy, limit, startAfter, getDocs, doc, where
} from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import firebase from "firebase/app";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const CreatedServicePaginationTable = ({ user }) => {

    const [page, setPage] = useState(1);
    const [servicesData, setServicesData] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: '',
        message: '',
        serviceId: '',
        docId: '',
    });
    const pageSize = 10;
    const router = useRouter();

    //initial firebase with routing
    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();



    //pagination table
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            const userID = user.uid;
            const db = getFirestore();
            const services = [];

            const q = query(collection(db, "userService"),
                where("sellerID", "==", userID),
                where("state", "==", "Published"),
                orderBy("serviceName"));
            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                const docData = doc.data();
                const storageRef = ref(storage, `service_image/${doc.id}`);
                const imageURL = await getDownloadURL(storageRef);

                services.push({
                    id: doc.id,
                    serviceId: doc.id,
                    serviceName: docData.serviceName,
                    serviceImage: imageURL,
                    serviceDetail: docData.serviceDetail,
                    teamLink: docData.teamLink,
                    language: docData.language,
                    price: docData.price,
                    date: docData.date,
                    dateArrange: docData.dateArrange,
                    state: docData.state,
                    sellerID: docData.sellerID,
                    buyerID: docData.buyerID,
                });
            }

            setServicesData(services);
        };

        fetchData();
    }, [user]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleRowClick = (params) => {
        router.push({
            pathname: 'ViewCreatedServicePage',
            query: { rowData: JSON.stringify(params.row) },
        });
    };

    // Update the handleDelete function
    const handleDelete = (id, serviceId) => {
        setConfirmDialog({
            open: true,
            title: 'Delete Service',
            message: 'Are you sure you want to delete this service?',
            serviceId,
            docId: id,
        });
    };

    const handleConfirmDelete = async () => {
        const { docId, serviceId } = confirmDialog;

        // Delete the record from Firestore
        const docRef = doc(db, 'userService', docId);
        await deleteDoc(docRef);

        // Remove the associated image from Firebase Storage
        const storageRef = ref(storage, `service_image/${serviceId}`);
        await deleteObject(storageRef);

        // Update the servicesData state to remove the deleted service
        const updatedServicesData = servicesData.filter(service => service.id !== docId);
        setServicesData(updatedServicesData);

        // Close the confirmation dialog
        setConfirmDialog({ ...confirmDialog, open: false });
    };

    const handleCancelDelete = () => {
        setConfirmDialog({ ...confirmDialog, open: false });
    };

    const columns = [
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
        { field: 'price', headerName: 'Price', width: 10 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    color="secondary"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(params.row.id, params.row.serviceId);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },


    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <ConfirmDialog
                open={confirmDialog.open}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <DataGrid
                rows={servicesData}
                columns={columns}
                pagination
                pageSize={pageSize}
                rowHeight={100}
                rowCount={servicesData.length}
                onPageChange={handleChange}
                onRowClick={handleRowClick}
                paginationMode="client"
            />
        </div>
    );
};

export default CreatedServicePaginationTable;