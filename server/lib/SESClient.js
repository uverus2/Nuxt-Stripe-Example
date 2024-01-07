import { SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_SDK_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SDK_SECRET_KEY
    }
});

export default sesClient;