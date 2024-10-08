import React, { useEffect, useState } from 'react';
import './BusinessRegister.css';
import { useNavigate } from 'react-router-dom';
import businessProfilePic from '../../images/plus.png';
import plus from '../../images/plus.png';
import { registerBusinessAPI } from '../../apis/MyInfoAPICalls';

function BusinessRegister() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [postDTO, setPostDTO] = useState({
        fcltyNm: '', // 시설명
        ctgryTwoNm: '', // 카테고리
        ctgryThreeNm: '', // 상세분류
        telNo: '', // 전화번호
        hmpgUrl: '', // 홈페이지 URL
        rstdeGuidCn: '', // 휴무일 안내 내용
        operTime: '', // 운영시간
        parkngPosblAt: '',
        utilizaPrcCn: '',
        rdnmadrNm: '',
        detailAddress: '',
        zipNo: '',
        petPosblAt: '',
        petInfoCn: '',
        entrnPosblPetSizeValue: '', // 입장 가능 반려동물 크기
        petLmttMtrCn: '', // 반려동물 제한 사항
        inPlaceAcpPosblAt: '', // 내부 장소 반려동물 동반 가능 여부
        outPlaceAcpPosblAt: '', // 외부 장소 반려동물 동반 가능 여부
        fcltyInfoDc: '', // 시설 정보 설명

    });

    const [images, setImages] = useState([]);

    const categoryOptions = [
        "반려동물 서비스",
        "식당-카페",
        "동반여행",
        "문화시설",
        "애완병원"
    ];

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + images.length > 10) {
            alert('최대 10장의 이미지만 업로드할 수 있습니다.');
            return;
        }
        setImages(prevImages => [...prevImages, ...files].slice(0, 10));
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const isLoggedIn = localStorage.getItem('loggedIn');
        
        console.log('Stored Token:', storedToken);
        console.log('Is Logged In:', isLoggedIn);

        if (storedToken && isLoggedIn === 'true') {
            setToken(storedToken);
        } else {
            console.log('No token found or not logged in');
            navigate('/member/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (token) {
            console.log('Token state updated:', token);
        }
    }, [token]);

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPostDTO({
            ...postDTO,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('해당 업체를 등록하시겠습니까?')) {
            try {
                const memberNo = localStorage.getItem('memberNo');
                
                const formData = new FormData();
                formData.append('memberNo', memberNo);
    
                // Append each field of postDTO to formData
                Object.entries(postDTO).forEach(([key, value]) => {
                    formData.append(key, value);
                });
    
                // Append images
                images.forEach((image, index) => {
                    formData.append(`images`, image);
                });
    
                await registerBusinessAPI(formData);
    
                alert('업체가 성공적으로 등록되었습니다.');
                navigate('/mypage/mybusinesslist');
            } catch (error) {
                console.error('Error registering business:', error);
                alert(error.message);
            }
        }
    };
    

    const findZipCode = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setPostDTO({
                        ...postDTO,
                        roadAddress: data.address,
                        zipCode: data.zonecode
                    });
                }
            }).open();
        };
    };

    return (
        <div className="businessregister-body">
            <h1 className="businessregister-h1">업체 등록</h1>
            <div className="businessregister-container">
                <div className="businessregister-propictitle">사진 등록(최대 10장)</div>
                <div className="businessregister-profile-section">
                    {/* <div className="add-picture">
                        <img src={plus} alt="Add" />
                    </div> */}
                    <div className="businessregister-image-grid">
                        {images.map((image, index) => (
                            <div key={index} className="businessregister-image-item" onClick={() => removeImage(index)}>
                                <img src={URL.createObjectURL(image)} alt={`Profile ${index + 1}`} className="businessregister-profile-pic" />
                            </div>
                        ))}
                        {images.length < 10 && (
                            <label className="businessregister-profile-pic-label">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    multiple
                                    style={{ display: 'none' }}
                                />
                                <div className="businessregister-add-image-button">
                                    <img src={businessProfilePic} alt="Add" className="businessregister-add-image-icon" />
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="businessregister-form-group">
                        <label htmlFor="fcltyNm" className="businessregister-businessinfo-label">시설명</label>
                        <input
                            type="text"
                            id="fcltyNm"
                            name="fcltyNm"
                            value={postDTO.fcltyNm}
                            onChange={handleChange}
                            placeholder="시설명 입력"
                        />
                    </div>
                    <br />
                    <div><a href="my_info">회원 정보 보기</a></div>
                    <br />

                    <div className="businessregister-form-group">
                        <label htmlFor="ctgryTwoNm" className="businessregister-businessinfo-label">카테고리 선택</label>
                        <select
                            id="ctgryTwoNm"
                            name="ctgryTwoNm"
                            value={postDTO.ctgryTwoNm}
                            onChange={handleChange}
                        >
                            <option value="">카테고리 선택</option>
                            {categoryOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="ctgryThreeNm" className="businessregister-businessinfo-label">상세분류</label>
                        <input
                            type="text"
                            id="ctgryThreeNm"
                            name="ctgryThreeNm"
                            value={postDTO.ctgryThreeNm} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="상세분류 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="telNo" className="businessregister-businessinfo-label">전화번호</label>
                        <input
                            type="text"
                            id="telNo"
                            name="telNo"
                            value={postDTO.telNo} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="전화번호 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="hmpgUrl" className="businessregister-businessinfo-label">홈페이지</label>
                        <input
                            type="text"
                            id="hmpgUrl"
                            name="hmpgUrl"
                            value={postDTO.hmpgUrl} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="홈페이지 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="rstdeGuidCn" className="businessregister-businessinfo-label">휴무일 안내 내용</label>
                        <input
                            type="text"
                            id="rstdeGuidCn"
                            name="rstdeGuidCn"
                            value={postDTO.rstdeGuidCn} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="휴무일 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="operTime" className="businessregister-businessinfo-label">운영시간</label>
                        <input
                            type="text"
                            id="operTime"
                            name="operTime"
                            value={postDTO.operTime} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="운영시간 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="parkngPosblAt" className="businessregister-businessinfo-label">주차가능여부</label>
                        <input
                            type="text"
                            id="parkngPosblAt"
                            name="parkngPosblAt"
                            value={postDTO.parkngPosblAt} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="주차가능여부 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="utilizaPrcCn" className="businessregister-businessinfo-label">이용가격내용</label>
                        <input
                            type="text"
                            id="utilizaPrcCn"
                            name="utilizaPrcCn"
                            value={postDTO.utilizaPrcCn} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="이용 가격 내용 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="petPosblAt" className="businessregister-businessinfo-label">반려동물 가능 여부</label>
                        <input
                            type="text"
                            id="petPosblAt"
                            name="petPosblAt"
                            value={postDTO.petPosblAt} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="반려동물 가능 여부 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="entrnPosblPetSizeValue" className="businessregister-businessinfo-label">입장가능 반려동물 크기값</label>
                        <input
                            type="text"
                            id="entrnPosblPetSizeValue"
                            name="entrnPosblPetSizeValue"
                            value={postDTO.entrnPosblPetSizeValue} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="입장 가능 반려동물 크기값"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="petLmttMtrCn" className="businessregister-businessinfo-label">반려동물 제한사항 내용</label>
                        <input
                            type="text"
                            id="petLmttMtrCn"
                            name="petLmttMtrCn"
                            value={postDTO.petLmttMtrCn} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="반려동물 제한사항 내용"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="inPlaceAcpPosblAt" className="businessregister-businessinfo-label">내부장소 동반가능 여부</label>
                        <input
                            type="text"
                            id="inPlaceAcpPosblAt"
                            name="inPlaceAcpPosblAt"
                            value={postDTO.inPlaceAcpPosblAt} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="내부장소 동반가능 여부"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="outPlaceAcpPosblAt" className="businessregister-businessinfo-label">외부장소 동반가능 여부</label>
                        <input
                            type="text"
                            id="outPlaceAcpPosblAt"
                            name="outPlaceAcpPosblAt"
                            value={postDTO.outPlaceAcpPosblAt} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="외부장소 동반가능 여부"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="fcltyInfoDc" className="businessregister-businessinfo-label">시설정보 설명</label>
                        <input
                            type="text"
                            id="fcltyInfoDc"
                            name="fcltyInfoDc"
                            value={postDTO.fcltyInfoDc} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="시설 정보 설명"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="petAcpAditChrgeValue" className="businessregister-businessinfo-label">반려동물 동반 추가 요금값</label>
                        <input
                            type="text"
                            id="petAcpAditChrgeValue"
                            name="petAcpAditChrgeValue"
                            value={postDTO.petAcpAditChrgeValue} // 수정된 value 속성
                            onChange={handleChange}
                            placeholder="반려동물 동반 추가요금"
                        />
                    </div>

                    <br />

                    <div className="businessregister-form-group">
                        <label>주소</label>
                        <div className="businessregister-signup-address-group">
                            <div className="businessregister-signup-zipcode-container">
                                <input
                                    type="text"
                                    id="zipNo" // 기존 id 속성 유지
                                    name="zipNo" // 기존 name 속성 유지
                                    value={postDTO.zipNo} // 기존 value 속성 유지
                                    onChange={handleChange}
                                    placeholder="우편번호"
                                    disabled
                                />
                                <button type="button" id='zipcode-btn' onClick={findZipCode}>우편번호 찾기</button>
                            </div>
                            <input
                                type="text"
                                id="rdnmadrNm" // 기존 id 속성 유지
                                name="rdnmadrNm" // 기존 name 속성 유지
                                value={postDTO.rdnmadrNm} // 기존 value 속성 유지
                                onChange={handleChange}
                                placeholder="도로명 주소"
                                disabled
                            />
                            <input
                                type="text"
                                id='detailAddress' // 기존 id 속성 유지
                                name="detailAddress" // 기존 name 속성 유지
                                value={postDTO.detailAddress} // 기존 value 속성 유지
                                onChange={handleChange}
                                placeholder="상세 주소"
                            />
                        </div>
                    </div>

                    <div className="businessregister-buttons-container">
                        <button type="button" className="businessregister-btn-cancel" onClick={() => navigate(-1)}>취소</button>
                        <button type="submit" className="businessregister-btn-submit">제출</button>
                    </div>

                </form>
            </div >
        </div >
    );
};

export default BusinessRegister;
