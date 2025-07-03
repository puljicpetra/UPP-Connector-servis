import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3002;

const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY } = process.env;

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    try {
        const dataFromCamunda = req.body;
        console.log("Primljeni podaci od Camunde:", dataFromCamunda);

        const emailJsPayload = {
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: PUBLIC_KEY,
            accessToken: PRIVATE_KEY,
            template_params: dataFromCamunda
        };

        await axios.post(
            "https://api.emailjs.com/api/v1.0/email/send", 
            emailJsPayload
        );

        console.log("Email uspješno poslan!");
        res.status(200).json({ message: "Email uspješno poslan!" });

    } catch (error) {
        console.error("Greška prilikom slanja emaila: ", (error.response && error.response.data) || error.message);
        res.status(500).json({ error: "Greška prilikom slanja emaila!", details: (error.response && error.response.data) || error.message });
    }
});

app.listen(PORT, () => {
  console.log(`Email servis sluša na http://localhost:${PORT}`);
});