import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./SelectLocation.css";
import businessImage from "../../images/business_def_img.jpg";

const { kakao } = window;

const SelectLocation = ({ onSelectAddress }) => {
    const mapContainer = useRef(null);
    const [business, setBusiness] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const { info, postPreviewImage } = location.state || {};

    useEffect(() => {
        setBusiness(info);
    }, []);

    useEffect(() => {
        if (!business) return;

        const mapOption = {
            center: new kakao.maps.LatLng(37.6376755, 128.559285), // 지도의 중심좌표
            level: 3
        };

        // 지도 생성
        const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤 추가
        mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
        const zoomControl = new kakao.maps.ZoomControl();

        // 지도에 컨트롤 추가
        mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 좌표를 주소로 변환
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(business.rdnmadrNm, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new kakao.maps.Marker({
                    map: mapInstance,
                    position: coords
                });

                // 업체 정보창
                const infowindow = new kakao.maps.InfoWindow({
                    content: `
                        <div class="business-info-window">
                            <div class="map-business-title">${business.fcltyNm}</div>
                            <div class="business-info-window-body">
                                <div class="business-address"><b>${business.rdnmadrNm}</b></div>
                                <div class="business-phone-number"><a href={'tel:${business.telNo}'}>${formatPhoneNumber(business.telNo)}</a></div>
                                <img class="business-img" src="${postPreviewImage ? postPreviewImage.imageUrl : businessImage}" />
                            </div>
                            <div class="road-search">
                                <button id="road-search-btn">길찾기</button>
                            </div>
                        </div>`
                });

                infowindow.open(mapInstance, marker);
                mapInstance.setCenter(coords);

                const roadSearchBtn = document.getElementById("road-search-btn");

                if (roadSearchBtn) {
                    roadSearchBtn.onclick = () => {
                        if (onSelectAddress) {
                            onSelectAddress(business.rdnmadrNm); // 주소 저장
                        }
                        navigate(`/directions`); // 경로 이동
                    };
                }
            }
        });
    }, [business, onSelectAddress, navigate, postPreviewImage]);

    // 전화번호 형식에 맞게 변환
    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');

        switch (cleaned.length) {
            case 8:
                return `0${cleaned.slice(0, 1)}-${cleaned.slice(1, 4)}-${cleaned.slice(4)}`;
            case 9:
                return `0${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
            case 10:
                return `0${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
            case 11:
                return `0${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
            default:
                return number; // 형식에 맞지 않는 경우 원본 전화번호 반환
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            <div id="map" ref={mapContainer} style={{ width: "100%", height: "704px" }}></div>
        </div>
    );
};

export default SelectLocation;
