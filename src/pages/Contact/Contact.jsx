import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import whiteLogo from "../../assets/images/white_logo.png";

// Google Apps Script URL - Replace with your actual script URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("query", formData.query);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setAlert({
          open: true,
          message: "Message sent successfully! We'll get back to you soon.",
          severity: "success",
        });
        setFormData({ name: "", email: "", query: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setAlert({
        open: true,
        message:
          "Failed to send message. Please try again or contact us directly.",
        severity: "error",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "0" : "80px 40px",
          gap: "40px",
          border: isMobile ? "none" : "2px solid rgba(252, 243, 227, 0.52)",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            height: isMobile ? "auto" : "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            flexDirection: "column",
            padding: isMobile ? "0 20px" : "0",
            gap: isMobile ? "20px" : "0",
          }}
        >
          {/* Top */}
          <Box
            sx={{
              width: "100%",
              height: isMobile ? "auto" : "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: isMobile ? "4rem" : "6rem",
                fontWeight: 500,
                color: "#fcf3e3",
                margin: 0,
              }}
            >
              Contact
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                width: "100%",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: isMobile ? "4rem" : "6rem",
                  fontWeight: 500,
                  color: "#fcf3e3",
                  margin: 0,
                }}
              >
                Us
              </Typography>
              <Box
                component="hr"
                sx={{
                  width: "60%",
                  border: "1px solid #fcf3e3",
                  marginBottom: "30px",
                  marginLeft: "20px",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: "Helvetica",
                fontSize: isMobile ? "1.2rem" : "1.3rem",
                marginTop: "10px",
                letterSpacing: "0.15rem",
                opacity: 0.5,
                color: "#fcf3e3",
              }}
            >
              Got an idea or a dream? <br />
              We're here to bring it to life - let's talk.
            </Typography>
          </Box>

          {/* Bottom */}
          <Box
            sx={{
              width: "100%",
              height: isMobile ? "auto" : "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                marginTop: isMobile ? "30px" : "0",
                width: isMobile ? "250px" : "400px",
                "& img": {
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                },
              }}
            >
              <img src={whiteLogo} alt="BAW Studios Logo" />
            </Box>

            <Typography
              component="a"
              href="mailto:saberazehra37@gmail.com"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "1.4rem",
                fontWeight: 200,
                textDecoration: "none",
                color: "#fcf3e3",
                opacity: 0.5,
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: theme.palette.blue,
                  opacity: 1,
                  letterSpacing: "0.05rem",
                },
                "&:active": {
                  letterSpacing: "0.03rem",
                },
              }}
            >
              saberazehra37@gmail.com
            </Typography>
          </Box>
        </Box>

        {/* Right Section - Form */}
        <Box
          sx={{
            width: isMobile ? "100%" : "35%",
            height: isMobile ? "auto" : "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="POST"
            action="#"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "40px",
              width: isMobile ? "90%" : "100%",
            }}
          >
            <TextField
              fullWidth
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                  height: isMobile ? "50px" : "60px",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: 200,
                  border: "none",
                  color: "#fcf3e3",
                  backgroundColor: "transparent",
                  "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid #fcf3e3",
                    borderRadius: 0,
                  },
                  "&:hover fieldset": {
                    borderBottom: "1px solid #fcf3e3",
                  },
                  "&.Mui-focused fieldset": {
                    outline: "none",
                    borderBottom: "2px solid #1563ff",
                  },
                  "&.Mui-focused": {
                    color: "#1563ff",
                  },
                  "& input": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                "& input::placeholder": {
                  color: "#fcf3e3",
                  fontSize: "1.4rem",
                  opacity: 0.5,
                  transition: "all 0.3s ease",
                },
                "& .MuiOutlinedInput-root.Mui-focused input::placeholder": {
                  opacity: 0.4,
                  letterSpacing: "0.15rem",
                },
              }}
            />

            <TextField
              fullWidth
              type="email"
              placeholder="Your Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                  height: isMobile ? "50px" : "60px",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: 200,
                  border: "none",
                  color: "#fcf3e3",
                  backgroundColor: "transparent",
                  "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid #fcf3e3",
                    borderRadius: 0,
                  },
                  "&:hover fieldset": {
                    borderBottom: "1px solid #fcf3e3",
                  },
                  "&.Mui-focused fieldset": {
                    outline: "none",
                    borderBottom: "2px solid #1563ff",
                  },
                  "&.Mui-focused": {
                    color: "#1563ff",
                  },
                  "& input": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                "& input::placeholder": {
                  color: "#fcf3e3",
                  fontSize: "1.4rem",
                  opacity: 0.5,
                  transition: "all 0.3s ease",
                },
                "& .MuiOutlinedInput-root.Mui-focused input::placeholder": {
                  opacity: 0.4,
                  letterSpacing: "0.15rem",
                },
              }}
            />

            <TextField
              fullWidth
              placeholder="Share your thoughts"
              value={formData.query}
              autoComplete="off"
              onChange={handleInputChange("query")}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                  height: isMobile ? "50px" : "60px",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: 200,
                  border: "none",
                  color: "#fcf3e3",
                  backgroundColor: "transparent",
                  "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid #fcf3e3",
                    borderRadius: 0,
                  },
                  "&:hover fieldset": {
                    borderBottom: "1px solid #fcf3e3",
                  },
                  "&.Mui-focused fieldset": {
                    outline: "none",
                    borderBottom: "2px solid #1563ff",
                  },
                  "&.Mui-focused": {
                    color: "#1563ff",
                  },
                  "& input": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                },
                "& input::placeholder": {
                  color: "#fcf3e3",
                  fontSize: "1.4rem",
                  opacity: 0.5,
                  transition: "all 0.3s ease",
                },
                "& .MuiOutlinedInput-root.Mui-focused input::placeholder": {
                  opacity: 0.4,
                  letterSpacing: "0.15rem",
                },
              }}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                width: "100%",
                height: isMobile ? "50px" : "60px",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                textTransform: "uppercase",
                fontWeight: 200,
                backgroundColor: "#fcf3e3",
                border: "none",
                color: "#080808",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 1px rgba(252, 243, 227, 0.27)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#1563ff",
                  color: "#fcf3e3",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "#1563ff",
                  color: "#fcf3e3",
                  boxShadow: "0px 0px 10px #1563ff",
                  transform: "translateY(2px) scale(0.98)",
                },
                "&:disabled": {
                  backgroundColor: "rgba(252, 243, 227, 0.5)",
                  color: "rgba(8, 8, 8, 0.5)",
                  transform: "none",
                },
              }}
            >
              {isSubmitting ? "Sending..." : "Share your feedback"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{
            width: "100%",
            backgroundColor:
              alert.severity === "success" ? "#4caf50" : "#f44336",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
            "& .MuiAlert-action": {
              color: "white",
            },
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
