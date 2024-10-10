import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./Directions.css";

const { kakao } = window;

const Backdrop = ({ onClick, children }) => (
    <div className="backdrop" onClick={onClick}>
        {children}
    </div>
);

const Map = ({ map, pointObj, polyline }) => {
    useEffect(() => {
        if (map) {
            if (pointObj.startPoint.marker) {
                pointObj.startPoint.marker.setMap(map);
            }
            if (pointObj.endPoint.marker) {
                pointObj.endPoint.marker.setMap(map);
            }
            if (polyline) {
                polyline.setMap(map);
            }
        }
    }, [pointObj, map, polyline]);

    return null;
};

const Directions = ({ destinationAddress }) => {
    const [map, setMap] = useState(null);
    const [pointObj, setPointObj] = useState({
        startPoint: { marker: null, lat: null, lng: null, address: '', infoWindowVisible: true },
        endPoint: { marker: null, lat: null, lng: null, address: '', infoWindowVisible: true }
    });
    const [addressInput, setAddressInput] = useState({
        start: '',
        end: ''
    });
    const [error, setError] = useState('');
    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
    const [isEndPostcodeVisible, setIsEndPostcodeVisible] = useState(false);
    const [infoWindows, setInfoWindows] = useState({ start: null, end: null });
    const [polyline, setPolyline] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: null, duration: null, fare: null, guides: [] });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const startAddress = params.get('address');

        if (startAddress) {
            setAddressInput(prev => ({ ...prev, start: startAddress }));
        }
        if (destinationAddress) {
            setAddressInput(prev => ({ ...prev, end: destinationAddress }));
        }

        const mapContainer = document.getElementById('map');
        const mapOptions = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
        setMap(kakaoMap);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

        const zoomControl = new kakao.maps.ZoomControl();
        kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    }, [destinationAddress]);

    const setPoint = (lat, lng, pointType, address) => {
        if (pointObj[pointType].marker) {
            pointObj[pointType].marker.setMap(null);
            if (infoWindows[pointType]) {
                infoWindows[pointType].setMap(null);
            }
        }

        const iconUrl = pointType === 'startPoint'
            ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png'
            : 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';

        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng),
            image: new kakao.maps.MarkerImage(iconUrl, new kakao.maps.Size(64, 69))
        });
        marker.setMap(map);

        const label = pointType === 'startPoint' ? '출발지 : ' : '도착지 : ';
        const infoWindowContent = `<div style="background-color: #FFFDD0; padding: 10px; width: 150px; border: 2px solid; font-weight: bold; border-color: red;">${label}${address}</div>`;

        const infoWindow = new kakao.maps.InfoWindow({
            content: infoWindowContent
        });

        // 인포윈도우 열기
        infoWindow.open(map, marker);

        // 마커 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
            const isVisible = infoWindow.getMap() ? false : true; // 현재 인포윈도가 열려 있으면 false로 설정
            if (isVisible) {
                // 다른 인포윈도우 닫기
                if (infoWindows.start) {
                    infoWindows.start.close();
                }
                if (infoWindows.end) {
                    infoWindows.end.close();
                }
                infoWindow.open(map, marker);
            } else {
                infoWindow.close();
            }

            // 인포윈도우의 가시성 상태를 업데이트
            setPointObj(prev => ({
                ...prev,
                [pointType]: { ...prev[pointType], infoWindowVisible: isVisible }
            }));
        });

        setInfoWindows(prev => ({ ...prev, [pointType]: infoWindow }));

        setPointObj(prev => ({
            ...prev,
            [pointType]: { marker, lat, lng, address, infoWindowVisible: true }
        }));
    };

    const handleComplete = (data, pointType) => {
        const fullAddress = data.roadAddress;

        if (pointType === 'startPoint') {
            setAddressInput(prev => ({ ...prev, start: fullAddress }));
            setIsPostcodeVisible(false);
        } else if (pointType === 'endPoint') {
            setAddressInput(prev => ({ ...prev, end: fullAddress }));
            setIsEndPostcodeVisible(false);
        }
    };

    const handleSetStartPoint = () => {
        const address = addressInput.start;

        if (!address) {
            // setError('주소를 입력하세요.');
            console.error('출발지를 입력하세요.');
            return;
        }

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                setPoint(result[0].y, result[0].x, 'startPoint', address);
                setMap(prevMap => {
                    if (prevMap) {
                        prevMap.panTo(coords);
                    }
                    return prevMap;
                });
            } else {
                setError('주소를 찾을 수 없습니다.');
            }
        });
    };

    const handleSetEndPoint = () => {
        const address = addressInput.end;

        if (!address) {
            // setError('주소를 입력하세요.');
            console.error('도착지를 입력하세요.');
            return;
        }

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                setPoint(result[0].y, result[0].x, 'endPoint', address);
                setMap(prevMap => {
                    if (prevMap) {
                        prevMap.panTo(coords);
                    }
                    return prevMap;
                });
            } else {
                setError('주소를 찾을 수 없습니다.');
            }
        });
    };

    const getCarDirection = async () => {
        const REST_API_KEY = 'eaecc2f9170072b850006178197224c1';
        const url = 'https://apis-navi.kakaomobility.com/v1/directions';

        const origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
        const destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;
        const headers = {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json'
        };

        const queryParams = new URLSearchParams({
            origin: origin,
            destination: destination
        });

        const requestUrl = `${url}?${queryParams}`;

        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const linePath = [];
            data.routes[0].sections[0].roads.forEach(router => {
                router.vertexes.forEach((vertex, index) => {
                    if (index % 2 === 0) {
                        linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
                    }
                });
            });

            if (polyline) {
                polyline.setMap(null);
            }

            const newPolyline = new kakao.maps.Polyline({
                path: linePath,
                strokeWeight: 5,
                strokeColor: '#0000ff',
                strokeOpacity: 0.7,
                strokeStyle: 'solid'
            });
            newPolyline.setMap(map);
            setPolyline(newPolyline);

            const bounds = new kakao.maps.LatLngBounds();
            bounds.extend(new kakao.maps.LatLng(pointObj.startPoint.lat, pointObj.startPoint.lng));
            bounds.extend(new kakao.maps.LatLng(pointObj.endPoint.lat, pointObj.endPoint.lng));
            linePath.forEach(point => bounds.extend(point));

            map.setBounds(bounds);

            const totalMinutes = Math.floor(data.routes[0].summary.duration / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            setRouteInfo({
                distance: (data.routes[0].summary.distance / 1000).toFixed(2),
                duration: { hours, minutes },
                tollFare: data.routes[0].summary.fare.toll || 0,
                taxiFare: data.routes[0].summary.fare.taxi || 0,
                guides: data.routes[0].sections[0].guides.map(guide => ({
                    ...guide,
                    distance: guide.distance // distance 추가
                })) // 안내 문구 추가
            });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGetDirections = () => {
        if (!pointObj.startPoint.lat || !pointObj.endPoint.lat) {
            setError('출발지와 도착지를 모두 지정해야 합니다.');
            return;
        }
        getCarDirection();
    };

    return (
        <>
            <div id="map" />
            <div className="direction-menu">
                <input
                    type="text"
                    placeholder="출발지 주소 입력"
                    value={addressInput.start}
                    readOnly
                    onClick={() => setIsPostcodeVisible(true)}
                />
                <button onClick={handleSetStartPoint}>출발지 지정</button>
                <input
                    type="text"
                    placeholder="도착지 주소 입력"
                    value={addressInput.end}
                    readOnly
                    onClick={() => setIsEndPostcodeVisible(true)}
                />
                <button onClick={handleSetEndPoint}>도착지 지정</button>
                <button onClick={handleGetDirections}>길찾기</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <br/>
                {routeInfo.distance && (
                    <div>
                        <strong>총 거리 :</strong> {routeInfo.distance} km<br />
                        <strong>소요 시간 :</strong>
                        {routeInfo.duration.hours > 0 ? ` ${routeInfo.duration.hours} 시간 ` : ''}
                        {routeInfo.duration.minutes > 0 ? ` ${routeInfo.duration.minutes} 분` : ' 0 분'}<br />
                        <strong>통행 요금 :</strong> {routeInfo.tollFare.toLocaleString()} 원<br />
                        <strong>택시 요금 :</strong> {routeInfo.taxiFare.toLocaleString()} 원
                    </div>
                )}
                <br />
                {routeInfo.guides.length > 0 && (
                    <div>
                        <h3>경로 상세정보</h3>
                        <ul>
                            {routeInfo.guides.map((guide, index) => (
                                <li key={index}>
                                    <strong>{index === routeInfo.guides.length - 1
                                            ? (routeInfo.guides[index - 1]?.road_index || 0) + 1
                                            : guide.road_index} : </strong>
                                    {guide.name && <strong> {guide.name}</strong>} {guide.guidance}
                                    (거리 : {guide.distance >= 1000 ? (guide.distance / 1000).toFixed(2) + ' km' : guide.distance + ' m'})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
    
            {isPostcodeVisible && (
                <div className="address-modal">
                    <DaumPostcode
                        onComplete={(data) => handleComplete(data, 'startPoint')}
                    />
                </div>
            )}
    
            {isEndPostcodeVisible && (
                <div className="address-modal">
                    <DaumPostcode
                        onComplete={(data) => handleComplete(data, 'endPoint')}
                    />
                </div>
            )}
    
            <Map pointObj={pointObj} map={map} polyline={polyline} />
        </>
    );
    
};

export default Directions;
