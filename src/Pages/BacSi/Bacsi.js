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
  width: calc(100% - 20px); // Chiều rộng bằng 100% - 20px
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DoctorCard = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  align-items: flex-start; // Căn các thành phần ở trên
  background-color: #fff;
  height: 200px;
  height: ${({ isDetail }) => (isDetail ? '500px' : 'auto')}; // Chiều cao 500px khi hiển thị chi tiết
`;

const DoctorImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const DoctorInfo = styled.div`
  flex: 1;
  color: #22668e;  
`;

const DetailButton = styled.button`
  background-color: #22668E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

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
const doctors = [
  {
    id: 1,
    name: "Bác sĩ Nguyễn Văn An",
    specialty: "Nội khoa",
    experience: "Với hơn 20 năm kinh nghiệm trong lĩnh vực nội khoa...",
    detailedInfo: "Bác sĩ Nguyễn Văn An là một chuyên gia uy tín trong lĩnh vực nội khoa với hơn 20 năm kinh nghiệm...",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 2,
    name: "Bác sĩ Trần Thị Bích",
    specialty: "Nhi khoa",
    experience: "Đã điều trị thành công nhiều ca bệnh phức tạp liên quan đến nhi khoa...",
    detailedInfo: "Bác sĩ Trần Thị Bích có nhiều năm kinh nghiệm trong việc điều trị các bệnh lý phức tạp của trẻ em...",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 3,
    name: "Bác sĩ Phạm Văn Hưng",
    specialty: "Tim mạch",
    experience: "Chuyên gia hàng đầu trong lĩnh vực điều trị bệnh tim mạch...",
    detailedInfo: "Bác sĩ Phạm Văn Hưng đã công tác tại nhiều bệnh viện lớn và tham gia nghiên cứu về các bệnh lý tim mạch...",
    imageUrl: "https://via.placeholder.com/120",
  },
  {
    id: 4,
    name: "Bác sĩ Lê Thị Hoa",
    specialty: "Hô hấp",
    experience: "Chuyên điều trị các bệnh về đường hô hấp cho cả trẻ em và người lớn...",
    detailedInfo: "Bác sĩ Lê Thị Hoa có hơn 15 năm kinh nghiệm trong việc điều trị các bệnh lý liên quan đến hô hấp...",
    imageUrl: "https://via.placeholder.com/120",
  },
  // Add more doctors as needed
];

const Bacsi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const doctorsPerPage = 2;
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedDoctor(null); // Close detail view when changing page
  };

  return (
    <Container>
      <InfoText>ĐỘI NGŨ Y - BÁC SĨ</InfoText>
      {/* Ẩn thanh tìm kiếm và pagination khi đã chọn bác sĩ */}
      {selectedDoctor ? (
        <>
          <DoctorCard isDetail>
            <DoctorImage src={selectedDoctor.imageUrl} alt={selectedDoctor.name} />
            <DoctorInfo>
              <h2>{selectedDoctor.name}</h2>
              <p>{selectedDoctor.detailedInfo}</p>
            </DoctorInfo>
            <CloseButton onClick={() => setSelectedDoctor(null)}>Đóng</CloseButton>
          </DoctorCard>
        </>
      ) : (
        <>
          <SearchInput
            type="text"
            placeholder="Hãy nhập tên bác sĩ bạn cần tìm..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          {currentDoctors.map((doctor) => (
            <DoctorCard key={doctor.id}>
              <DoctorImage src={doctor.imageUrl} alt={doctor.name} />
              <DoctorInfo>
                <h3>{doctor.name}</h3>
                <p>Chuyên môn: {doctor.specialty}</p>
                <p>Kinh nghiệm: {doctor.experience}</p>
                <DetailButton onClick={() => setSelectedDoctor(doctor)}>Chi tiết</DetailButton>
              </DoctorInfo>
            </DoctorCard>
          ))}
          <Pagination>
            {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage))].map((_, index) => (
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

export default Bacsi;
