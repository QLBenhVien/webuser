import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
const ListWrapper = styled.div`
  width: 80%;
  max-width: auto; /* Tăng chiều rộng */
  margin: 0 1rem;
  font-family: Arial, sans-serif;
  padding: 30px; /* Tăng padding */
`;

const ListTitle = styled.h1`
  color: #22668e;
  margin-bottom: 20px;
  text-align: left;
  font-size: 24px;
`;

const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Thêm khoảng cách giữa các container */
  height: 450px; /* Tăng chiều cao */
  max-width: auto; /* Tăng chiều rộng */
`;

const TableList = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid black;
`;

const TableListRow = styled.tr`
  border-bottom: 1px solid black;
`;

const TableListHeader = styled.th`
  padding: 10px;
  border: 1px solid black;
  text-align: left;
  background-color: #e6e6e6;
  color: black;
`;

const TableListCell = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const Button = styled.button`
  background-color: #22668e;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1b4e73;
  }
`;

const CloseButton = styled(Button)`
  background-color: #22668e; /* Sửa lại màu */
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PageWrapper = styled.div`
  width: 80%;
  max-width: 1200px; /* Tăng chiều rộng */
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Title = styled.h1`
  color: #22668e;
  margin-bottom: 10px;
  text-align: left;
  font-size: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between; /* Giữ khoảng cách đều */
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center; /* Căn giữa theo chiều dọc */
  margin: 0 10px; /* Thêm khoảng cách giữa các mục */
  flex: 1; /* Cho phép các mục chia đều không gian */
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 2px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid black;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr`
  border-bottom: 1px solid black;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid black;
  text-align: left; /* Căn trái cho tất cả các ô */
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid black;
  text-align: left; /* Căn trái cho tiêu đề */
  background-color: #e6e6e6;
  color: black;
`;

const TableBody = styled.tbody``;

// Styled components giữ nguyên...

const Benhan = () => {
  const [showDetail, setShowDetail] = useState(false);

  const handleViewDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <ListWrapper>
      <ListTitle>KẾT QUẢ KHÁM BỆNH</ListTitle>
      <Container>
        <TableList>
          <thead>
            <TableListRow>
              <TableListHeader>STT</TableListHeader>
              <TableListHeader>Tên bệnh nhân</TableListHeader>
              <TableListHeader>Tên bệnh</TableListHeader>
              <TableListHeader>Ngày khám</TableListHeader>
              <TableListHeader>Xem chi tiết</TableListHeader>
            </TableListRow>
          </thead>
          <tbody>
            <TableListRow>
              <TableListCell>1</TableListCell>
              <TableListCell>Ngọc Duy</TableListCell>
              <TableListCell>Đau đầu</TableListCell>
              <TableListCell>03/09/2024</TableListCell>
              <TableListCell>
                <Button onClick={handleViewDetail}>Xem</Button>
              </TableListCell>
            </TableListRow>
          </tbody>
        </TableList>
      </Container>

      {/* Dialog hiển thị chi tiết */}
      <Dialog
        open={showDetail}
        onClose={handleCloseDetail}
        aria-labelledby="draggable-dialog-title"
        fullWidth={true} // Đảm bảo dialog chiếm toàn bộ chiều rộng
        maxWidth="md" // Giới hạn chiều rộng tối đa
      >
        <DialogTitle id="draggable-dialog-title">
          KẾT QUẢ KHÁM BỆNH CHI TIẾT
        </DialogTitle>
        <DialogContent>
          <InfoRow>
            <InfoItem>
              <Label>Tên bệnh nhân:</Label>
              <div>Phạm Ngọc Duy</div>
            </InfoItem>
            <InfoItem>
              <Label>Mã BN:</Label>
              <div>10392</div>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              <Label>Tuổi:</Label>
              <div>20</div>
            </InfoItem>
            <InfoItem>
              <Label>Giới tính:</Label>
              <div>Nam</div>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              <Label>Địa chỉ:</Label>
              <div>Q8, TP. HCM</div>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              <Label>Tên bác sĩ:</Label>
              <div>Bác sĩ Trần Thị Bích</div>
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem>
              <Label>Chuẩn đoán:</Label>
              <div>
                Ai mà biết chời, mua bằng chứ hong phải tự học nên hong biết bị
                gì hết, còn thuốc là kê đại á!
              </div>
            </InfoItem>
          </InfoRow>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>STT</TableHeader>
                <TableHeader>Tên thuốc / Hàm lượng</TableHeader>
                <TableHeader>ĐVT</TableHeader>
                <TableHeader>Số lượng</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Paracetamol 500mg</TableCell>
                <TableCell>Viên</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Amoxicillin 250mg</TableCell>
                <TableCell>Viên</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Ibuprofen 400mg</TableCell>
                <TableCell>Viên</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>Ciprofloxacin 500mg</TableCell>
                <TableCell>Viên</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5</TableCell>
                <TableCell>Vitamin C 1000mg</TableCell>
                <TableCell>Viên</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </ListWrapper>
  );
};

export default Benhan;
