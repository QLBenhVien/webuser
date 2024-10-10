import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  width: 80%; 
  margin: 0 auto;
`;

const InfoText = styled.p`
  text-align: left;  
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #22668e;
`;

const SearchInput = styled.input`
  width: calc(100% - 22px); 
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const NewsCard = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  align-items: flex-start; 
  background-color: #fff;
  height: 200px;
`;

const DetailCard = styled(NewsCard)`
  height: 500px;
`;

const NewsImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const NewsInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NewsTitle = styled.h2`
  color: #22668e;  
  margin: 0;
`;

const NewsDetail = styled.p`
  color: #000;  
  margin: 0;
`;

const DetailButton = styled.button`
  background-color: #22668E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute; 
  bottom: 20px; 
  right: 20px; 

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: #22668E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }

  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#007bff" : "#000")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

// Fake data
const newsItems = [
  {
    id: 1,
    title: "Từ ngày 12/9/2022, Khu Điều trị theo yêu cầu triển khai nội soi tai mũi họng",
    content: "Nhằm phát hiện kịp thời và nâng cao hiệu quả điều trị các bệnh lý tai mũi họng, từ ngày 12/9/2022, Khu Điều trị theo yêu cầu triển khai hoạt động nội soi tai mũi họng (dịch vụ) vào các buổi sáng từ Thứ hai đến Thứ sáu hàng tuần. Phòng nội soi tai mũi họng ...",
    detailedInfo: "Nhằm phát hiện kịp thời và nâng cao hiệu quả điều trị các bệnh lý tai mũi họng, từ ngày 12/9/2022, Khu Điều trị theo yêu cầu triển khai hoạt động nội soi tai mũi họng (dịch vụ) vào các buổi sáng từ Thứ hai đến Thứ sáu hàng tuần. Phòng nội soi tai mũi họng do BS.CKI. Trần Văn Thảnh - Nguyên Trưởng khoa Tai Mũi Họng Bệnh viện Đa khoa tỉnh Tiền Giang phụ trách, thực hiện các dịch vụ nội soi thăm khám như: nội soi tai; nội soi mũi; nội soi họng; lấy dị vật và một số kỹ thuật chuyên sâu khác. Để biết thêm thông tin chi tiết, Quý khách hàng vui lòng liên hệ Quầy hướng dẫn Khu Điều trị theo yêu cầu hoặc số điện thoại: 0273 3850850 - 0913 939 524. Trân trọng!",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 2,
    title: "Tin tức 2",
    content: "Nội dung tin tức 2...",
    detailedInfo: "Chi tiết về tin tức 2...",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 3,
    title: "Tin tức 3",
    content: "Nội dung tin tức 3...",
    detailedInfo: "Chi tiết về tin tức 3...",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 4,
    title: "Tin tức 4",
    content: "Nội dung tin tức 4...",
    detailedInfo: "Chi tiết về tin tức 4...",
    imageUrl: "https://via.placeholder.com/120",
  },
  // Add more news items as needed
];

const Tintuc = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const newsPerPage = 2;
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  
  // Filter news items based on search query
  const filteredNewsItems = newsItems.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentNewsItems = filteredNewsItems.slice(indexOfFirstNews, indexOfLastNews);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedNews(null); // Close detail view when changing page
  };

  return (
    <Container>
      <InfoText>TIN TỨC</InfoText>
      {/* Chỉ hiển thị SearchInput khi không có tin tức nào được chọn */}
      {!selectedNews && (
        <SearchInput
          type="text"
          placeholder="Tìm kiếm tin tức..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      )}
      {selectedNews ? (
        <DetailCard>
          <NewsImage src={selectedNews.imageUrl} alt={selectedNews.title} />
          <NewsInfo>
            <NewsTitle>{selectedNews.title}</NewsTitle>
            <NewsDetail>{selectedNews.detailedInfo}</NewsDetail>
          </NewsInfo>
          <CloseButton onClick={() => setSelectedNews(null)}>Đóng</CloseButton>
        </DetailCard>
      ) : (
        <>
          {currentNewsItems.map((news) => (
            <NewsCard key={news.id}>
              <NewsImage src={news.imageUrl} alt={news.title} />
              <NewsInfo>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsDetail>{news.content}</NewsDetail>
                <DetailButton onClick={() => setSelectedNews(news)}>Chi tiết</DetailButton>
              </NewsInfo>
            </NewsCard>
          ))}
          <Pagination>
            {[...Array(Math.ceil(filteredNewsItems.length / newsPerPage))].map((_, index) => (
              <PageNumber
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageNumber>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default Tintuc;
