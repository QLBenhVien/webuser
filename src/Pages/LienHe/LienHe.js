import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Nhập biểu tượng
import logo from "../../images/logo.png"
// Tạo theme tùy chỉnh
const theme = createTheme({
  palette: {
    
    
    text: {
      primary: '#22668E', // Màu văn bản chính
    },
  },
});

// Add a CSS class for the hover effect
const styles = {
  hoverEffect: {
    color: '#22668E',
    transition: 'transform 0.3s ease', // Smooth transition
    '&:hover': {
      transform: 'scale(1.05)', // Slightly enlarge the text
    },
  },
};

const LienHe = () => {
  return (
    <div style={{ backgroundColor: '#E1F5FE', minHeight: '100vh', padding: '1 0px' }}>
      <Typography 
        variant="h6" // Chuyển thành h6 để chữ nhỏ hơn
        align="left" 
        sx={{ marginLeft: '85px', color: '#22668E', marginTop:'10px' }} // Đặt màu văn bản chính
      >
        THÔNG TIN LIÊN HỆ
      </Typography>
      <Container
        sx={{
          backgroundColor: '#fff',
          padding: 10, // Tăng padding để làm cho khung lớn hơn
          borderRadius: 2,
          boxShadow: 2,
          minHeight: '400px', // Thay đổi chiều cao tối thiểu nếu cần
        }}
      >
        <Typography variant="h5" align="left" sx={{ color: '#22668E' }}>
          Liên Hệ Với Bệnh Viện UMC
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={styles.hoverEffect}>Địa chỉ: [Nhập địa chỉ của bệnh viện]</Typography>
            <Typography sx={styles.hoverEffect}>Số điện thoại: [Nhập số điện thoại]</Typography>
            <Typography sx={styles.hoverEffect}>Email: [Nhập địa chỉ email]</Typography>
            <Typography sx={styles.hoverEffect}>Website: [Nhập URL trang web]</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
  <div
    style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'contain', // Đảm bảo logo hiển thị đúng tỷ lệ
      backgroundRepeat: 'no-repeat', // Không lặp lại logo
      height: '200px', // Chiều cao cho logo
      width: '100%', // Để nó chiếm toàn bộ chiều rộng
    }}
  />
</Grid>
        </Grid>
        <Typography variant="h6" sx={{ marginTop: 4, color: '#22668E' }}>
          Giờ làm việc:
        </Typography>
        <Typography sx={{ color: '#22668E' }}>Thứ Hai - Thứ Sáu: 8:00 - 17:00</Typography>
        <Typography sx={{ color: '#22668E' }}>Thứ Bảy - Chủ Nhật: Nghỉ</Typography>
        <Box sx={{ marginTop: 3, textAlign: 'center', color: '#22668E' }}>
          <Typography>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong mọi nhu cầu chăm sóc sức khỏe.
          </Typography>
          <Typography>
            Đừng ngần ngại liên hệ với chúng tôi!
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

// Bọc component LienHe bằng ThemeProvider
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LienHe />
    </ThemeProvider>
  );
};

export default App;
