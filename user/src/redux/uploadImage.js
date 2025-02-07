import ImageKit from "imagekit";
import fs from 'node:fs/promises'; // To read local files

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: "public_uePe6aseysV1evspiEd9STbTQU0=", // Replace with your ImageKit public key
    privateKey: "private_VamKi9B1edE5yalpotf4lNhe9Q0=", // Replace with your ImageKit private key
    urlEndpoint: "https://ik.imagekit.io/8x6aqmirh/", // Replace with your ImageKit URL endpoint
});

// Define the local file path 

// Read the file and upload it
export default function uploadImg(file) {
    console.log(file);
    imagekit.upload(
        {
            file: fs.readFileSync(file.value), // Read file as buffer
            fileName: "uploaded_image.jpg", // Set the desired file name
            folder: "/uploads", // (Optional) Folder in ImageKit
        },
        function (error, result) {
            if (error) {
                console.error("Upload Error:", error);
            } else {
                console.log("File Uploaded Successfully:", result);
            }
        }
    );
}
