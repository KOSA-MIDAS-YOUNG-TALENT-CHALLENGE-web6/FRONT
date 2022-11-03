import React, { useState, useRef, useEffect } from "react";
import SkeletonModule from "./Skeleton";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Button, Modal } from "@mui/material";
import { Container } from "@mui/material";
import Webcam from "react-webcam";
import Swal from 'sweetalert2'
import customAxios from "../../../lib/customAxios"

const padNumber = (num, length) => {
  return String(num).padStart(length, '0');
};

function Profile() {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWorking, setIsWorking] = useState(false);



  //Time
  let now = new Date();

  const storeTime = () => {
    const hour = padNumber(now.getHours(), 2)
    const min = padNumber(now.getMinutes(), 2)
    const sec = padNumber(now.getSeconds(), 2)
    const time = `${hour}:${min}:${sec}`
    console.log(time.toString())
    console.log(localStorage.getItem("token"))
    customAxios.post('/officegoing')
    .then((res) => {
      if(res.status == 201) {
        Swal.fire(
          '성공',
          '',
          'success'
        )
      }
    })

  }

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  useEffect(() => {}, [videoRef]);

  useEffect(() => {
    // customAxios.get('/officegoing')
  })
  return !isLoading ? (
    <ProfileCard sx={{ width: 450, padding: 5 }}>
      <div className="info">
        <AccountCircleIcon sx={{ fontSize: 150 }} />
        <Box>
          <p>
            <strong>이름:</strong> 정우재
          </p>
          <p>
            <strong>소속:</strong> 프론트엔드팀
          </p>
          <p>
            <strong>직급:</strong> 신입사원
          </p>
        </Box>
      </div>

      {!isWorking ? (
        <Box
          sx={{ height: 40, display: "flex", justifyContent: "space-around" }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(true);
              setIsPlaying(true);
            }}
          >
            출근 하기
          </Button>
          <Chip sx={{ width: 100 }} label="출근 전" />
        </Box>
      ) : (
        <Box
          sx={{ height: 40, display: "flex", justifyContent: "space-around" }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setIsWorking(false);
            }}
          >
            퇴근 하기
          </Button>

          <Chip sx={{ width: 100 }} color="success" label="작업 중" />
        </Box>
      )}
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 20 }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            {isPlaying && (
              <Webcam
                audio={false}
                mirrored={true}
                screenshotFormat="image/jpeg"
                ref={webcamRef}
              />
            )}
          </Box>
          <Button
            sx={{ width: 100 }}
            variant="contained"
            onClick={() => {
              setIsOpen(false);
              capture();
              setIsPlaying(false);
              setIsWorking(true);
              storeTime()
            }}

          >
            업로드
          </Button>
        </Container>
      </Modal>
    </ProfileCard>
  ) : (
    <SkeletonModule />
  );
}

export default Profile;

const ProfileCard = styled(Card)(({ theme }) => ({
  boxSizing: "border-box",
  display: "box",
  color: "darkslategray",
  backgroundColor: "aliceblue",
  borderRadius: 4,
  "&>.info": { display: "flex", justifyContent: "space-around" },
}));
