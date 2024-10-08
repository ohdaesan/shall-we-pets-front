import React, { useState } from 'react';
import './BusinessRegister.css';
import { useNavigate } from 'react-router-dom';
import businessProfilePic from '../../images/plus.png';
import plus from '../../images/plus.png';

function BusinessRegister() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        FCLTY_NM: '',
        CTGRY_ONE_NM: '',
        CTGRY_TWO_NM: '',
        TEL_NO: '',
        HMPG_URL: '',
        RSTDE_GUID_CN: '',
        OPER_TIME: '',
        PARKNG_POSBL_AT: '',
        UTILIIZA_PRC_CN: '',
        roadAddress: '',
        detailAddress: '',
        zipCode: '',
        PET_POSBL_AT: '',
        PET_INFO_CN: '',
        ENTRN_POSBL_PET_SIZE_VALUE: '',
        PET_LMTT_MTR_CN: '',
        IN_PLACE_ACP_POSBL_AT: '',
        OUT_PLACE_ACP_POSBL_AT: '',
        FCLTY_INFO_DC: '',
        PET_ACP_ADIT_CHRGE_VALUE: '',
    });

    const categoryOptions = [
        "반려동물 서비스",
        "식당-카페",
        "동반여행",
        "문화시설",
        "애완병원"
    ];

    const [profilePics, setProfilePics] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + profilePics.length > 10) {
            return;
        }

        const newImages = files.map(file => URL.createObjectURL(file));
        setProfilePics(prevPics => [...prevPics, ...newImages].slice(0, 10));
    };

    const removeImage = (index) => {
        setProfilePics(prevPics => prevPics.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [
            'FCLTY_NM', 'CTGRY_ONE_NM', 'CTGRY_TWO_NM', 'TEL_NO', 'HMPG_URL',
            'RSTDE_GUID_CN', 'OPER_TIME', 'PARKNG_POSBL_AT', 'UTILIIZA_PRC_CN',
            'roadAddress', 'detailAddress', 'zipCode', 'PET_POSBL_AT', 'PET_INFO_CN',
            'ENTRN_POSBL_PET_SIZE_VALUE', 'PET_LMTT_MTR_CN', 'IN_PLACE_ACP_POSBL_AT',
            'OUT_PLACE_ACP_POSBL_AT', 'FCLTY_INFO_DC', 'PET_ACP_ADIT_CHRGE_VALUE'
        ];

        // 필수 입력 값이 모두 입력되었는지 확인
        const missingFields = requiredFields.filter(field => !form[field]);
        if (missingFields.length > 0) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        if (window.confirm('해당 업체를 등록하시겠습니까?')) {
            // 여기서 실제 데이터 저장 로직을 구현할 수 있습니다.
            // 예: API 호출

            alert('업체가 성공적으로 등록되었습니다.');

            // 폼 초기화
            setForm({
                FCLTY_NM: '',
                CTGRY_ONE_NM: '',
                CTGRY_TWO_NM: '',
                TEL_NO: '',
                HMPG_URL: '',
                RSTDE_GUID_CN: '',
                OPER_TIME: '',
                PARKNG_POSBL_AT: '',
                UTILIIZA_PRC_CN: '',
                roadAddress: '',
                detailAddress: '',
                zipCode: '',
                PET_POSBL_AT: '',
                PET_INFO_CN: '',
                ENTRN_POSBL_PET_SIZE_VALUE: '',
                PET_LMTT_MTR_CN: '',
                IN_PLACE_ACP_POSBL_AT: '',
                OUT_PLACE_ACP_POSBL_AT: '',
                FCLTY_INFO_DC: '',
                PET_ACP_ADIT_CHRGE_VALUE: '',
            });
            setProfilePics([]);

            // mypage/mybusinesslist로 이동
            navigate('/mypage/mybusinesslist');
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
                    setForm({
                        ...form,
                        roadAddress: data.address,
                        zipcode: data.zonecode
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
                        {profilePics.map((pic, index) => (
                            <div key={index} className="businessregister-image-item" onClick={() => removeImage(index)}>
                                <img src={pic} alt={`Profile ${index + 1}`} className="businessregister-profile-pic" />
                            </div>
                        ))}
                        {profilePics.length < 10 && (
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
                        <label htmlFor="FCLTY_NM" className="businessregister-businessinfo-label">시설명</label>
                        <input
                            type="text"
                            id="FCLTY_NM"
                            name="FCLTY_NM"
                            value={form.FCLTY_NM}
                            onChange={handleChange}
                            placeholder="시설명 입력"
                        />
                    </div>
                    <br />
                    <div><a href="my_info">회원 정보 보기</a></div>
                    <br />

                    <div className="businessregister-form-group">
                        <label htmlFor="CTGRY_ONE_NM" className="businessregister-businessinfo-label">카테고리 선택</label>
                        <select
                            id="CTGRY_ONE_NM"
                            name="CTGRY_ONE_NM"
                            value={form.CTGRY_ONE_NM}
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
                        <label htmlFor="CTGRY_TWO_NM" className="businessregister-businessinfo-label">상세분류</label>
                        <input
                            type="text"
                            id="CTGRY_TWO_NM"
                            name="CTGRY_TWO_NM"
                            value={form.CTGRY_TWO_NM}
                            onChange={handleChange}
                            placeholder="상세분류 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="TEL_NO" className="businessregister-businessinfo-label">전화번호</label>
                        <input
                            type="text"
                            id="TEL_NO"
                            name="TEL_NO"
                            value={form.TEL_NO}
                            onChange={handleChange}
                            placeholder="전화번호 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="HMPG_URL" className="businessregister-businessinfo-label">홈페이지</label>
                        <input
                            type="text"
                            id="HMPG_URL"
                            name="HMPG_URL"
                            value={form.HMPG_URL}
                            onChange={handleChange}
                            placeholder="홈페이지 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="RSTDE_GUID_CN" className="businessregister-businessinfo-label">휴무일 안내 내용</label>
                        <input
                            type="text"
                            id="RSTDE_GUID_CN"
                            name="RSTDE_GUID_CN"
                            value={form.RSTDE_GUID_CN}
                            onChange={handleChange}
                            placeholder="휴무일 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="OPER_TIME" className="businessregister-businessinfo-label">운영시간</label>
                        <input
                            type="text"
                            id="OPER_TIME"
                            name="OPER_TIME"
                            value={form.OPER_TIME}
                            onChange={handleChange}
                            placeholder="운영시간 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="PARKNG_POSBL_AT" className="businessregister-businessinfo-label">주차가능여부</label>
                        <input
                            type="text"
                            id="PARKNG_POSBL_AT"
                            name="PARKNG_POSBL_AT"
                            value={form.PARKNG_POSBL_AT}
                            onChange={handleChange}
                            placeholder="주차가능여부 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="UTILIIZA_PRC_CN" className="businessregister-businessinfo-label">이용가격내용</label>
                        <input
                            type="text"
                            id="UTILIIZA_PRC_CN"
                            name="UTILIIZA_PRC_CN"
                            value={form.UTILIIZA_PRC_CN}
                            onChange={handleChange}
                            placeholder="이용 가격 내용 입력"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="PET_POSBL_AT" className="businessregister-businessinfo-label">반려동물 가능 여부</label>
                        <input
                            type="text"
                            id="PET_POSBL_AT"
                            name="PET_POSBL_AT"
                            value={form.PET_POSBL_AT}
                            onChange={handleChange}
                            placeholder="반려동물 사이즈 제한 여부"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="ENTRN_POSBL_PET_SIZE_VALUE" className="businessregister-businessinfo-label">입장가능 반려동물 크기값</label>
                        <input
                            type="text"
                            id="ENTRN_POSBL_PET_SIZE_VALUE"
                            name="ENTRN_POSBL_PET_SIZE_VALUE"
                            value={form.ENTRN_POSBL_PET_SIZE_VALUE}
                            onChange={handleChange}
                            placeholder="입장 가능 반려동물 크기값"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="PET_LMTT_MTR_CN" className="businessregister-businessinfo-label">반려동물 제한사항 내용</label>
                        <input
                            type="text"
                            id="PET_LMTT_MTR_CN"
                            name="PET_LMTT_MTR_CN"
                            value={form.PET_LMTT_MTR_CN}
                            onChange={handleChange}
                            placeholder="반려동물 제한사항 내용"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="IN_PLACE_ACP_POSBL_AT" className="businessregister-businessinfo-label">내부장소 동반가능 여부</label>
                        <input
                            type="text"
                            id="IN_PLACE_ACP_POSBL_AT"
                            name="IN_PLACE_ACP_POSBL_AT"
                            value={form.IN_PLACE_ACP_POSBL_AT}
                            onChange={handleChange}
                            placeholder="내부장소 동반가능 여부"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="OUT_PLACE_ACP_POSBL_AT" className="businessregister-businessinfo-label">외부장소 동반가능 여부</label>
                        <input
                            type="text"
                            id="OUT_PLACE_ACP_POSBL_AT"
                            name="OUT_PLACE_ACP_POSBL_AT"
                            value={form.OUT_PLACE_ACP_POSBL_AT}
                            onChange={handleChange}
                            placeholder="반려동물 사이즈 제한 여부"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="FCLTY_INFO_DC" className="businessregister-businessinfo-label">시설정보 설명</label>
                        <input
                            type="text"
                            id="FCLTY_INFO_DC"
                            name="FCLTY_INFO_DC"
                            value={form.FCLTY_INFO_DC}
                            onChange={handleChange}
                            placeholder="시설 정보 설명"
                        />
                    </div>

                    <div className="businessregister-form-group">
                        <label htmlFor="PET_ACP_ADIT_CHRGE_VALUE" className="businessregister-businessinfo-label">반려동물 동반 추가 요금값</label>
                        <input
                            type="text"
                            id="PET_ACP_ADIT_CHRGE_VALUE"
                            name="PET_ACP_ADIT_CHRGE_VALUE"
                            value={form.PET_ACP_ADIT_CHRGE_VALUE}
                            onChange={handleChange}
                            placeholder="반려동물 동반 추가요금"
                        />
                    </div>
                    <br />

                    <div class="businessregister-form-group">
                        <label>주소</label>
                        <div class="businessregister-signup-address-group">
                            <div class="businessregister-signup-zipcode-container">
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={form.zipCode}
                                    onChange={handleChange}
                                    placeholder="우편번호"
                                    disabled
                                />
                                <button type="button" id='zipcode-btn' onClick={findZipCode}>우편번호 찾기</button>
                            </div>
                            <input
                                type="text"
                                id="roadAddress"
                                name="roadAddress"
                                value={form.roadAddress}
                                onChange={handleChange}
                                placeholder="도로명 주소"
                                disabled
                            />
                            <input
                                type="text"
                                id='detailed-address'
                                name="detailAddress"
                                value={form.detailAddress}
                                onChange={handleChange}
                                placeholder="상세 주소"
                            />
                        </div>
                    </div>

                    <div className="businessregister-buttons-container">
                        <button type="button" className="businessregister-btn-cancel">취소</button>
                        <button type="submit" className="businessregister-btn-submit">제출</button>
                    </div>

                </form>
            </div >
        </div >
    );
};

export default BusinessRegister; 