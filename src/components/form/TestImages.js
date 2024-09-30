import { useEffect, useState } from "react";
import { findImageByImageNoAPI, deleteImageByImageNoAPI, updateImageByImageNoAPI } from "../../apis/ImagesAPICalls";

// 이미지 가져오기/수정/삭제 예시 코드
export function TestShowImage() {
    const [s3image, setS3Image] = useState(null);
    const [file, setFile] = useState(null);

    const getImageByImageNo = async () => {
        try {
            const response = await findImageByImageNoAPI(30);

            if(response?.results?.image) {  // 서버에서 이미지 찾아오기 성공
                alert('이미지 찾기 성공');
                setS3Image(response.results.image.imageUrl);
            } else {
                alert('이미지 찾기 실패');
            }
        } catch (error) {
            console.error('이미지 찾아오기 실패: ', error);
        }
    };

    const deleteImageByImageNo = async () => {
        try {
            const response = await deleteImageByImageNoAPI(30);
            if(response?.results?.success) { 
                alert('이미지 삭제 성공');
            } else {
                alert('이미지 삭제 실패');
            }
        } catch (error) {
            console.error('이미지 삭제 실패: ', error);
        }
    };

    const updateImageByImageNo = async () => {
        try {
            const response = await updateImageByImageNoAPI(30, file);
            
            if(response?.results?.imageNo) {
                alert('이미지 수정 성공');
            } else {
                alert('이미지 수정 실패');
            }
        } catch (error) {
            console.error('이미지 수정 실패: ', error);
        }
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <>
            <button onClick={getImageByImageNo}>이미지 가져오기</button>
            {s3image && <img src={s3image} alt="S3에서 가져온 이미지" style={{width: "200px", margin: "10px"}}/>}<br/><hr/>
            <button onClick={deleteImageByImageNo}>이미지 삭제하기</button><br/><hr/>
            <input type="file" onChange={handleFileChange} /><br/>
            <button onClick={updateImageByImageNo}>이미지 수정하기</button>
        </>
    );
}
