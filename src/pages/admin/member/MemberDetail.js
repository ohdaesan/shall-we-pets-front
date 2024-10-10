
import "./MemberDetail.css";
import Logo from "../../../images/shallwepets_logo.png";
import defaultProfilePic from '../../../images/default_pfp.png';
import defaultBusinessPic from '../../../images/reviewpic4.jpg';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getMemberList } from "../../../apis/MemberAPICalls";
import { getPostByMemberNoAPI } from "../../../apis/PostAPICalls";
import { useParams } from "react-router-dom";
import { getPostImageByPostNoAPI } from "../../../apis/ImagesAPICalls";


function MemberDetail() {
    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        id: '',
        grade: '',
        nickname: '',
        phone: '',
        email: '',
        zipcode: '',
        address: '',
        detailAddress: '',
    });
    const { memberNo } = useParams();

    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [businessList, setBusinessList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation(); // useLocation 훅 사용

    const [businessImages, setBusinessImages] = useState({}); // 이미지 상태

    useEffect(() => {
        if (!memberNo) {
            console.error("memberNo가 제공되지 않았습니다.");
            return; // memberNo가 없으면 더 이상 실행하지 않음
        }

        const fetchMemberData = async () => {
            try {
                const response = await getMemberList();
                if (response.httpStatusCode === 200) {
                    const memberData = response.results.members.find(member => member.memberNo === parseInt(memberNo));

                    if (memberData) {
                        setForm({
                            name: memberData.memberName,
                            birthDate: memberData.memberDob,
                            id: memberData.memberId,
                            grade: memberData.grade,
                            nickname: memberData.memberNickname,
                            phone: memberData.memberPhone,
                            email: memberData.memberEmail,
                            zipcode: memberData.memberZipcode || '',
                            address: memberData.memberRoadAddress || '',
                            detailAddress: memberData.memberDetailAddress || '',
                        });
                        if (memberData.image) {
                            setProfilePic(memberData.image.imageUrl || defaultProfilePic);
                        }
                    }
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("회원 데이터 가져오기 오류:", error);
            }
        };

        fetchMemberData();
    }, [memberNo]); // memberNo가 변경될 때마다 실행

    useEffect(() => {
        const fetchBusinessData = async () => {
            if (!memberNo) return;
            try {
                const data = await getPostByMemberNoAPI(memberNo);
                if (data.httpStatusCode === 200) {
                    const postListArray = Array.isArray(data.results.postList) ? data.results.postList : [];
                    const filteredPosts = postListArray.filter(post => post.memberNo === parseInt(memberNo));

                    const businesses = filteredPosts.map(post => ({
                        postNo: post.postNo,
                        fclty_nm: post.fcltyNm,
                        rdnmadr_nm: post.rdnmadrNm,
                        status: post.status,
                    }));

                    // 각 게시물에 해당하는 이미지를 가져옴
                    businesses.forEach(async (business) => {
                        try {
                            const imageData = await getPostImageByPostNoAPI(business.postNo, 1);

                            // 이미지 데이터가 존재하는지 확인
                            if (imageData.httpStatusCode === 200 && imageData.results && imageData.results.postImageList && imageData.results.postImageList.length > 0) {
                                setBusinessImages(prevImages => ({
                                    ...prevImages,
                                    [business.postNo]: imageData.results.postImageList[0].imageUrl // 첫 번째 이미지를 저장
                                }));
                            } else {
                                setBusinessImages(prevImages => ({
                                    ...prevImages,
                                    [business.postNo]: defaultBusinessPic // 기본 이미지 사용
                                }));
                            }
                        } catch (error) {
                            console.error("이미지 가져오기 오류:", error);
                            setBusinessImages(prevImages => ({
                                ...prevImages,
                                [business.postNo]: defaultBusinessPic // 에러 시 기본 이미지 사용
                            }));
                        }
                    });


                    setBusinessList(businesses);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("업체 데이터 가져오기 오류:", error);
            }
        };

        fetchBusinessData();
    }, [memberNo]);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("제출된 폼:", form);
    };

    const naviMemberInfo = () => {
        navigate("/member_detail");
    };

    const naviMemberPoint = () => {
        navigate("/point_list");
    };

    return (
        <div className="member-info-navbar">
            <h1 className="member-info-page">회원정보 페이지</h1>
            <div className="member-info-navbar1">
                <br /><a onClick={naviMemberInfo} className="member-info-navbar1-info">회원 정보</a><br /><br />
                <a href="" className="member-info-navbar1-review">회원 리뷰</a><br /><br />
                <a onClick={naviMemberPoint} className="member-info-navbar1-point">포인트 내역</a><br />
                <img className="member-detail-logo" src={Logo} alt="Logo" />
            </div>
            <div className="myinfo-body1">
                <h1 className="myinfo-h2">회원 정보</h1>
                <div className="myinfo-container1">
                    <div className="profile-section1">
                        <img src={profilePic} alt="Profile" className="profile-pic1" />
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group1">
                            <label className="form-group1-name" htmlFor="name">이름</label>
                            <input className="form-group1-name-holder"
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-birthday" htmlFor="birthDate">생년월일</label>
                            <input className="form-group1-birthday-holder"
                                type="text"
                                id="birthDate"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-id" htmlFor="id">아이디</label>
                            <input className="form-group1-id-holder"
                                type="text"
                                id="id"
                                name="id"
                                maxLength="20"
                                value={form.id}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-grade" htmlFor="grade">회원등급</label>
                            <input className="form-group1-grade-holder"
                                type="text"
                                id="grade"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-nicname" htmlFor="nickname">닉네임</label>
                            <input className="form-group1-nicname-holder"
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-phone" htmlFor="phone">휴대전화</label>
                            <input className="form-group1-phone-holder"
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-email" htmlFor="email">이메일</label>
                            <input className="form-group1-email-holder"
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group2">
                            <label className="form-group1-address">주소</label>
                            <div className="address-group1">
                                <div className="zipcode-container1">
                                    <input
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        value={form.zipcode}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    disabled
                                />
                                <input
                                    type="text"
                                    id='detailed-address'
                                    name="detailAddress"
                                    value={form.detailAddress}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-actions1">
                            <button type="button" className="btn-cancel1">회원정보 삭제</button>
                        </div>
                    </form>
                </div>
            </div>
            <h1 className="member-regist-business">회원이 등록한 업체</h1>
            <div className="member-regist-business-navbar">
                {businessList.map((business, index) => (
                    <div
                        key={index}
                        className="business-item"
                        onClick={() => navigate(`/member_list/apply_detail/${business.postNo}`)}
                        style={{ borderBottom: index < businessList.length - 1 ? '1px solid #ccc' : 'none' }}
                    >
                        <div className="member-regist-business-pic">
                            <img
                                className="member-regist-business-pic-img"
                                src={businessImages[business.postNo] || defaultBusinessPic} // 가져온 이미지 또는 기본 이미지 사용
                                alt={`${business.fclty_nm} 의 이미지`}
                            />
                        </div>
                        <div className="business-info">
                            <div className="member-regist-business-name">
                                {business.fclty_nm}
                            </div>
                            <div className="member-regist-business-address">
                                {business.rdnmadr_nm}
                            </div>
                        </div>
                        <p className={`member-regist-business-ok ${business.status === "APPROVED" ? "approved" : business.status === "AWAITING" ? "awaitting" : "not-approved"}`}>
                            {business.status === "APPROVED" ? "승인" : business.status === "AWAITING" ? "대기중" : "미승인"}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default MemberDetail;