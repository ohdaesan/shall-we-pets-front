import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import "./SelectLocation.css"
import businessImage from "../../images/shallwepets_business_pic.png"
import { map } from "jquery";
import { useEffect, useRef } from "react";

const { kakao } = window;

function SelectLocation() {

    const mapContainer = useRef(null);

    useEffect(() => {

        // 지도를 표시할 div
        const mapOption = {
            center: new kakao.maps.LatLng(37.6376755, 128.559285), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤 추가
        mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
        const zoomControl = new kakao.maps.ZoomControl();
        mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 주소변환 기능
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch("제주특별자치도 서귀포시 안덕면 창천리 564", function (result, status) {

            if (status === kakao.maps.services.Status.OK) {
    
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
                const marker = new kakao.maps.Marker({
                    map: mapInstance,
                    position: coords
                });
    
                // 커서 위 정보창
                const infowindow = new kakao.maps.InfoWindow({
    
                    content: '<div class="business-info-window">' +
                        '<div class="title">군산오름</div>' +

                        '<div class="business-info-window-body">' +
                        '<div class="business-address">제주특별자치도 서귀포시 안덕면 창천리 564</div>' +
                        '<div class="business-phone-number">064-740-6000</div>' +

                        '<img class="business-img" src="' + businessImage + '"/>' +
                        '</div>' +

                        '<div class="road-search">' +
                        '<a href="">길찾기</a>' +
                        '</div>' +
                        '</div>'

                });
                infowindow.open(mapInstance, marker);
    
                mapInstance.setCenter(coords);
            }
        });
    }, []);


    return (

        <div>
            <div id="map" ref={mapContainer} style={{ width: "100%", height: "704px"}}></div>
            
            </div>

    );
}

export default SelectLocation;