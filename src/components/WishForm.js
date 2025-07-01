// WishForm.js
import React from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import RecipeReviewCard from "./RecipeReviewCard";

const validationSchema = Yup.object({
  wish: Yup.string().required("กรุณาเขียนคำอวยพร"),
  name: Yup.string(), // ไม่ required
});

export default function WishForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      wish: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: 'url("/background_main.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <RecipeReviewCard />
      </Container>
    </Box>
  );
}
