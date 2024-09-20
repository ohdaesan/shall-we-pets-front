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
                return 'approvedOrPending'; // 클래스 이름을 문자열로 직접 사용
            case '반려':
                return 'rejected'; // 클래스 이름을 문자열로 직접 사용
            default:
                return '';
        }
    };

    return (
        <div className="businesslist-container">
            <h2 className="title">내 업체 조회</h2>
        
        <div className="container">
        
            <div className="businessList">
                {storeData.map((store) => (
                    <div key={store.id} className={`storeCard ${getStatusClassName(store.status)}`}>
                        <div className="storeImage">
                            <img src={businessProfilePic} alt={store.name} />
                        </div>
                        <div className="storeInfo">
                            <h3 className="storeName">{store.name}</h3>
                            <p className="storeAddress">{store.address}</p>
                            <span className="storeStatus">{store.status}</span>
                            {store.status === '반려' && (
                                <p className="rejectReason">반려 사유: {store.rejectReason}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <br/>
        <br/>
        </div>
    );
};

export default MyBusinessList;

