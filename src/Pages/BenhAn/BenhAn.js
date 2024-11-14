import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import axiosInstance from "../../Axios/axios";
import QRCodeComponent from "../../components/QRCodeComponent";
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
  const [dataBenhNhanDetail, setDataBenhNhanDetail] = useState();
  const [dataThuocDetail, setDataThuocDetail] = useState();

  const handleViewDetail = async (id) => {
    console.log(id);
    const res = await axiosInstance.get(`/user/detail_phieukham/${id}`);
    console.log(res);
    setDataBenhNhanDetail(res.data.data.phieukham);
    console.log("phieukham:", dataBenhNhanDetail);
    setDataThuocDetail(res.data.data.medicationDetails);
    console.log("thuoc", dataThuocDetail);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/user/tatca_ketquakhambenh");
      setData(res.data.data.phieukham);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            {data &&
              data.map((item, index) => (
                <TableListRow key={index}>
                  <TableListCell>{index + 1}</TableListCell>
                  <TableListCell>{item.MaBenhNhan?.Ten}</TableListCell>
                  <TableListCell>
                    {item.TrieuChung ? item.TrieuChung : "Bình thường"}
                  </TableListCell>
                  <TableListCell>{item.NgayKham}</TableListCell>
                  <TableListCell>
                    <Button onClick={() => handleViewDetail(item._id)}>
                      Xem
                    </Button>
                  </TableListCell>
                </TableListRow>
              ))}
          </tbody>
        </TableList>
      </Container>

      {/* Dialog hiển thị chi tiết */}
      <Dialog
        open={showDetail}
        onClose={handleCloseDetail}
        aria-labelledby="draggable-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="draggable-dialog-title">
          KẾT QUẢ KHÁM BỆNH CHI TIẾT
        </DialogTitle>
        <DialogContent>
          {dataBenhNhanDetail ? (
            <>
              <InfoRow>
                <InfoItem>
                  <Label>Tên bệnh nhân:</Label>
                  <div>{dataBenhNhanDetail.MaBenhNhan?.Ten}</div>
                </InfoItem>
                <InfoItem>
                  <Label>Mã BN:</Label>
                  <div>{dataBenhNhanDetail.MaBenhNhan?._id}</div>
                </InfoItem>
              </InfoRow>
              <InfoRow>
                <InfoItem>
                  <Label>Tên bác sĩ:</Label>
                  <div>{dataBenhNhanDetail.MaNhanVien?.HoTen}</div>
                </InfoItem>
              </InfoRow>
              <InfoRow>
                <InfoItem>
                  <Label>Ngày sinh:</Label>
                  <div>{dataBenhNhanDetail.MaBenhNhan?.NgaySinh}</div>
                </InfoItem>
                <InfoItem>
                  <Label>Giới tính:</Label>
                  <div>{dataBenhNhanDetail.MaBenhNhan?.GioiTinh}</div>
                </InfoItem>
              </InfoRow>
              <InfoRow>
                <InfoItem>
                  <Label>Địa chỉ:</Label>
                  <div>{dataBenhNhanDetail.MaBenhNhan?.DiaChi}</div>
                </InfoItem>
              </InfoRow>

              <InfoRow>
                <InfoItem>
                  <Label>Chuẩn đoán:</Label>
                  <div>{dataBenhNhanDetail.ChanDoan}</div>
                </InfoItem>
              </InfoRow>
              <InfoRow>
                <InfoItem>
                  <Label>Lời dặn:</Label>
                  <div>{dataBenhNhanDetail.LoiDan}</div>
                </InfoItem>
              </InfoRow>
              <InfoRow>
                <InfoItem style={{ display: "inline-flex" }}>
                  <Label>QR hóa đơn:</Label>
                  <div>
                    <QRCodeComponent url={dataBenhNhanDetail.pdf_hoadon} />
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
                  {dataThuocDetail &&
                    dataThuocDetail.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.tenthuoc}</TableCell>
                        <TableCell>{item.loaiThuoc}</TableCell>
                        <TableCell>{item.soluong}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <p>Loading...</p>
          )}
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
