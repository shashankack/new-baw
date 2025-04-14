import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box height="100vh">
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          variant="h1"
          fontWeight="800"
          color="#1563ff"
          fontFamily={"Helvetica"}
        >
          ABOUT
        </Typography>
        <Typography
          variant="h5"
          fontWeight="400"
          color="#fcf3e3"
          maxWidth={800}
          textAlign={"justify"}
          sx={{
            fontSize: {
              xs: ".8rem",
              sm: "1.2rem",
              md: "1.5rem",
            },

            padding: {
              xs: "0 1rem",
              sm: "0 2rem",
              md: "0",
            },
          }}
        >
          BAW Studio is a creative hub established to deliver cutting-edge
          production, engaging social media management, innovative web design,
          and dynamic content creation. Our mission is to empower brands and
          artists by providing comprehensive solutions that enhance their
          digital presence and market impact. With a team of experienced
          professionals dedicated to excellence, we tailor our services to meet
          the unique needs of each client, ensuring their vision is brought to
          life with precision and creativity. At BAW Studio, we combine
          technical expertise with artistic passion to help you capture your
          audience's attention, making us the go-to studio for those looking to
          make a lasting impression in the digital world. As we continue to
          innovate and expand our services, BAW Studio remains at the forefront
          of the creative industry, committed to pushing boundaries and setting
          new standards in digital excellence.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
