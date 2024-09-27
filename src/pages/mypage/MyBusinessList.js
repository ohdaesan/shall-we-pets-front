import React, { useEffect, useState } from 'react';
import './MyBusinessList.css';
import businessProfilePic from '../../images/pension.png';

const MyBusinessList = () => {
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        const initialData = [
            {
                id: 1,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                status: '승인',
            },
            {
                id: 4,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                status: '승인',
            },
            {
                id: 5,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                status: '승인',
            },
            {
                id: 6,
                name: '쉘위펫즈',
                address: '강원도 홍천군 홍천로 189-23',
                status: '승인',
            },
            {
                id: 2,
                name: '쉘위펫즈 2호점',
                address: '강원도 홍천군 홍천로 189-25',
                status: '승인 대기중',
            },
            {
                id: 3,
                name: '쉘위펫즈 3호점',
                address: '강원도 홍천군 홍천로 189-23',
                status: '반려',
                rejectReason: '필수 정보 미기재',
            },
        ];
        setStoreData(initialData);
    }, []);

    const getStatusClassName = (status) => {
        switch (status) {
            case '승인':
            case '승인 대기중':
                return 'mybusinesslist-approvedOrPending';
            case '반려':
                return 'mybusinesslist-rejected';
            default:
                return '';
        }
    };

    return (
        <div>
            <h1>내 업체 리스트</h1>
        </div>
    );
};

export default MyBusinessList;