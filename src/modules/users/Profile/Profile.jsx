import React, { useState, useRef, useEffect } from "react";
import SkeletonModule from "./Skeleton";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Button, Modal } from "@mui/material";
import { Container } from "@mui/material";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import customAxios from "../../../lib/customAxios";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../../recoil/atom";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {}, [image]);
  //Time
  let now = new Date();

  const storeTime = async () => {
    const hour = padNumber(now.getHours(), 2);
    const min = padNumber(now.getMinutes(), 2);
    const sec = padNumber(now.getSeconds(), 2);
    const time = `${hour}:${min}:${sec}`;
    console.log(time.toString());
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const { imageUrl } = await customAxios.post(`/images`, {
        image: formData,
      });
      setImageUrl(imageUrl);
    }
  };

  const workingStart = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const { imageUrl } = await customAxios.post(`/images`, {
        image: formData,
      });
      setImageUrl(imageUrl);
    }
    customAxios.post("/officegoing", { image: imageUrl }).then((res) => {
      if (res.status === 201) {
        Swal.fire("출근", "", "success").then(() => {
          setUserInfo((props) => {
            return { ...props, is_office_going: true };
          });
        });
      }
    });
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const quit = async () => {
    customAxios.post("/quitting").then(() => {
      setUserInfo((props) => {
        return { ...props, is_office_going: false };
      });
    });
  };

  useEffect(() => {
    console.log("call");
  }, [videoRef, userInfo]);

  return !isLoading ? (
    <ProfileCard sx={{ width: 450, padding: 5 }}>
      <div className="info">
        <AccountCircleIcon sx={{ fontSize: 150 }} />
        <Box>
          <p>
            <strong>이름:</strong>
            {userInfo.name}
          </p>
          <p>
            <strong>소속:</strong>
            {userInfo.user_application ? userInfo.user_application : "무"}
          </p>
          <p>
            <strong>직급:</strong>
            {userInfo.user_position ? userInfo.user_position : "무"}
          </p>
        </Box>
      </div>

      {!userInfo.is_office_going ? (
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
              quit();
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
              storeTime();
              workingStart();
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
