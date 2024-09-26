import { useEffect, useState } from "react";
import { getBusinesses } from "../../apis/BusinessAPI";

const Map = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await getBusinesses();
                setBusinesses(response.results.businesses);
            } catch (error) {
                setError('업체 정보를 불러오는데 실패했습니다.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>업체 목록</h1>
            <ul>
                {businesses.map(business => (
                    <li key={business.postNo}>
                        <h2>{business.fcltyNm}</h2>
                        <p>주소: {business.rdnmadrNm}</p>
                        <p>전화번호: {business.telNo}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Map;