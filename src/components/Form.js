import { useFormik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  /* padding: 2rem; */
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
`;

const Container = styled.div`
  background-image: url("/background_main.jpg"); // ใช้ public path
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #ff4081;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f50057;
  }
`;
const validationSchema = Yup.object({
  wish: Yup.string().required("กรุณาเขียนคำอวยพร"),
  name: Yup.string(), // ไม่ required
});
const Form = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [success, setSuccess] = useState(false);
  const { width, height } = useWindowSize();
  const formik = useFormik({
    initialValues: {
      name: "",
      wish: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formURL =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSch-0xMXXE14tdLGf96uAJHeFopuuHaAxdcWJvReJ8MxItfeA/formResponse";
      const data = new FormData();

      data.append("entry.2067923468", values.name);
      data.append("entry.1009774468", values.wish);

      fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      })
        .then(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 10000); // หยุด confetti หลัง 4 วินาที
          toast.success("ส่งคำอวยพรเรียบร้อยแล้ว");
          setSuccess(true);
          resetForm();
        })
        .catch(() => {
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
        });
    },
  });

  return (
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
      {success ? (
        <Typography
          sx={{
            textIndent: "40px",
            fontWeight: 500,
            color: "#333333",
            fontFamily: "mali",
          }}
        >
          <span style={{ color: "#CD5656" }}>ขอบคุณ</span>
          จากใจสำหรับทุกคำอวยพรในวันสำคัญของเราทุกข้อความ ทุกความรักที่ส่งมา
          เรารับไว้เต็มหัวใจ 🤍 ขอให้ทุกคนได้รับความสุข ความรัก และสิ่งดี ๆ
          กลับไปเช่นกันค่ะ/ครับ
        </Typography>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="icon"
              fill="#1f1f1f"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <input
              placeholder="ชื่อของคุณ"
              type="text"
              className="input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#1f1f1f"
              className="icon"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                   3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                   6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <input
              placeholder="คำอวยพร"
              type="text"
              className="input"
              name="wish"
              value={formik.values.wish}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.wish && formik.errors.wish && (
            <div className="error">{formik.errors.wish}</div>
          )}

          <Button type="submit">ส่งคำอวยพร</Button>
        </form>
      )}
    </div>
  );
};

export default Form;
