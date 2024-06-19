import AWS from 'aws-sdk';
import fs from 'fs'

const uploadFileToS3 = async(req, res) => {
  
 const filePath = "C:/Users/nihal/OneDrive/Pictures/IMG_20201222_191746__01_compress22(yIBtyGNWv1Y) 77kb.jpg";

   // Check if the file exists
   if (!fs.existsSync(filePath)) {
       console.log('File does not exist: ', filePath);
       return;
   }    


   AWS.config.update({
       region: 'ap-south-1',
       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   });


   const params = {
       Bucket: process.env.AWS_BUCKET,
       Key: 'deals.jpg',
       Body: fs.createReadStream(filePath)
   };


   const s3 = new AWS.S3();


   // Upload the file to S3
   s3.upload(params, (err, data) => {
       if (err) {
           console.log('Error uploading file:', err);
           res.status(404).send('File could not be uploaded!');
       } else {
           console.log('File uploaded successfully. File location:', data.Location);
           res.status(200).send('File uploaded successfully');
       }
   });
}


export default uploadFileToS3;
