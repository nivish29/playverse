import s3ToS3 from "../hls/s3Tos3";
import KafkaConfig from "../kafka/kafka";

const kafkaconfig = new KafkaConfig()
kafkaconfig.consume("transcode", async (message) => {
   try {
       console.log("Got data from Kafka:", message);
      
       // Parsing JSON message value
       const value = JSON.parse(message);
      
       // Checking if value and filename exist
       if (value && value.filename) {
           console.log("Filename is", value.filename);
           await s3ToS3(value.filename); // Make this change in controller
       } else {
           console.log("Didn't receive filename to be picked from S3");
       }
   } catch (error) {
       console.error("Error processing Kafka message:", error);
       // You might want to handle or log this error appropriately
   }
});
