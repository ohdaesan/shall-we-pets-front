import { useEffect, useRef, useState } from "react";
import { getBusinesses } from "../../apis/BusinessAPI";
import "./SelectLocation.css";
import businessImage from "../../images/shallwepets_business_pic.png";

const { kakao } = window;

const SelectLocation = () => {
    const mapContainer = useRef(null);
    const [business, setBusiness] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await getBusinesses(); // 전체업체 리스트 불러오기
                const foundBusiness = response.results.businesses.find(b => b.postNo === 334); // X번 업체 찾기
                if (foundBusiness) {
                    setBusiness(foundBusiness);
                } else {
                    setError('업체를 찾을 수 없습니다.');
                }
            } catch (error) {
                setError('업체 정보를 불러오는데 실패했습니다.');
                console.error(error);
            }
        };

        fetchBusiness();
    }, []);

    useEffect(() => {
        if (!business) return; // business가 없으면 아무것도 하지 않음

        // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.6376755, 128.559285), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        const mapInstance = new window.kakao.maps.Map(mapContainer.current, mapOption);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤 추가
        mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
        const zoomControl = new kakao.maps.ZoomControl();
        mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 주소 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(business.rdnmadrNm, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new window.kakao.maps.Marker({
                    map: mapInstance,
                    position: coords
                });

                // 업체 정보창
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `
                        <div class="business-info-window">
                            <div class="map-business-title">${business.fcltyNm}</div>
                            <div class="business-info-window-body">
                                <div class="business-address">${business.rdnmadrNm}</div>
                                <div class="business-phone-number">${formatPhoneNumber(business.telNo)}</div>
                                <img class="business-img" src="${businessImage}"/>
                            </div>
                            <div class="road-search">
                                <a href="">길찾기</a>
                            </div>
                        </div>`
                });
                infowindow.open(mapInstance, marker);
                mapInstance.setCenter(coords);
            }
        });
    }, [business]); // 의존성 배열에 business 추가

    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');

        // 전화번호 길이에 따라 포맷팅
        switch (cleaned.length) {
            case 8:
                return `0${cleaned.slice(0, 1)}-${cleaned.slice(1, 4)}-${cleaned.slice(4)}`; // 0X-XXX-XXXX 포맷
            case 9:
                return `0${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`; // 0XX-XXX-XXXX 포맷
            case 10:
                return `0${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`; // 0XX-XXXX-XXXX 포맷
            case 11:
                return `0${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`; // 0XXX-XXXX-XXXX 포맷
            default:
                return number; // 형식에 맞지 않는 경우 원본 반환
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            <div id="map" ref={mapContainer} style={{ width: "100%", height: "704px"}}></div>
        </div>
    );
};

export default SelectLocation;
