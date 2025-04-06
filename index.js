// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import cookie from "cookie";
// import cookieParser from "cookie-parser";
// import jsonwebtoken from "jsonwebtoken";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import path from "path";
// import bcrypt from "bcrypt";


// // import dotenv from 'dotenv';
// // app.use(express.json());
// // dotenv.config(); // equivalent of require('dotenv').config()

// // import Stripe from 'stripe';
// // const stripe = new Stripe("sk_test_...", {
// //   apiVersion: "2024-04-10",
// // })
// import PaytmChecksum from 'paytmchecksum';

// // const { default: MobileCharger } = require("../Frontend/my-app/src/ElectronicsComponent/MobileCharger");

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://nishant:rfRisP9JhzYKCWBD@cluster0.chi3o.mongodb.net/" );
//     console.log('Connected to MongoDB successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };
// connectToMongoDB();

// const app=express();

// app.use(
//   cors({
//     origin: "*", // No trailing slash
//     // origin: 'http://localhost:3002', // No trailing slash
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.urlencoded({extended:true}));
// const JWT_secretkey= process.env.JWT_SECRET_KEY


// const RegisterSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true // Recommended to prevent duplicate emails
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ["Customer", "Seller"], // Restrict role to Customer or Seller
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   houseNumber: {
//     type: String,
//     required: true
//   },
//   pincode: {
//     type: String,
//     required: true
//   }
// });
//       const ModelRegister= mongoose.model("ModelRegister"     ,   RegisterSchema     );
//       app.post("/api/Register", async (request, response) => {
//         try {
//           const {    name,
//             email,
//             password,
//             role,
//             address,
//             country,
//             city,
//             houseNumber,
//             pincode, } = request.body;

//               console.log(email)
//               console.log(password);
      
//           // Ensure the user and password are not undefined
//           if (!email || !password) {
//             return response.status(400).json({ Information: "email and password are required" });
//           }
//             console.log(name);    
//           console.log("email:", email);
//           console.log("Password:", password);
//           console.log("Password:", role);
//           console.log("Password:",address );
//           console.log("Password:", country);
//           console.log("Password:", city);
//           console.log("Password:", houseNumber);
//           console.log("Password:", pincode);
      
//           // Check if user is already registered
//           const AlreadyRegistered = await ModelRegister.findOne({ email });
//           if (AlreadyRegistered) {
//             return response.status(400).json({ Information: "email already registered" });
//           }
      
//           // Hash the password with bcrypt
//           console.log("Hashing the password");
//           const SaltedPassword = await bcrypt.hash(password, 14);
      
//           // Create new registration entry
//           const RegisterInformation = new ModelRegister({ name,email, password: SaltedPassword ,  role,
//             address,
//             country,
//             city,
//             houseNumber,
//             pincode, });
//           await RegisterInformation.save();
      
//           // Return success response
//           // response.status(200).json({ Information: "Register information saved successfully" });
//           return response.status(201).json({ Information: "User registered successfully" });
//         } catch (error) {
//           console.error("Error in /api/Register:", error);
//           response.status(500).json({ Information: "Internal server error" });
//         }
//       });
    
//       app.post("/api/Login", async (request, response) => {
//         try {
//           const { email, password } = request.body;
//       console.log(email, password);
//           // Check if the user exists in the database
//           const RegisterInformation = await ModelRegister.findOne({ email });
//           if (!RegisterInformation) {
//             return response.status(404).json({ Information: "User not found. Please check your credentials." });
//           }
      
//           // Compare the password with the hashed password
//           const RegisteredPassword = await bcrypt.compare(password, RegisterInformation.password);
//           if (!RegisteredPassword) {
//             return response.status(401).json({ Information: "Incorrect password. Please try again." });
//           }
      
//           // Create JWT token if login is successful
//           const token = jsonwebtoken.sign({ userId: RegisterInformation._id }, "This_is_Secret_Key", { expiresIn: "1h" });
      
//           return response.status(200).json({ Information: "Login Successful", token });
//         } catch (error) {
//           console.error("Error in /api/Login:", error);
//           return response.status(500).json({ Information: "Internal Server Error" });
//         }
//       });
      
//          app.get("/api/LaptopProtected", async(request,response)=>{

//        const token= request.cookies.token;
//        if(!token){
//        response.status(200).json({session:false});
//        }try{
//        const CorrectUser= jsonwebtoken.verify(token , JWT_secretkey);
//        if(CorrectUser){
//        return   response.status(200).json({session:true  ,  user:CorrectUser}  ) 
//          }
//       }catch(error){
//      return   response.status(500).json({session:false} )
//      }
//      })
//         const BuildLaptopSchema= new mongoose.Schema({
//         series: String,
//         colour: String,
//         formFactor: String,
//         itemHeight: String,
//         standingScreenDisplaySize: String,
//         screenResolution: String,
//         resolution: String,
//         productDimensions: String,
//         batteries: String,
//         itemModelNumber: String,
//         processorBrand: String,
//         processorType: String,
//         processorSpeed: String,
//         processorCount: String,
//         ramSize: String,
//         memoryTechnology: String,
//         maximumMemorySupported: String,
//         hardDriveSize: String,
//         hardDiskDescription: String,
//         hardDriveInterface: String,
//         audioDetails: String,
//         graphicsCoprocessor: String,
//         graphicsChipsetBrand: String,
//         graphicsRamType: String,
//         graphicsCardInterface: String,
//         connectivityType: String,  
//         wirelessType: String,
//         numberOfHdmiPorts: String,
//         voltage: String,
//         operatingSystem: String,
//         areBatteriesIncluded: String,
//         lithiumBatteryEnergyContent: String,
//         numberOfLithiumIonCells: String,
//         includedComponents: String,
//         manufacturer: String,
//         countryOfOrigin: String,
//         itemWeight: String,
//         laptopImage: String });

//          const ModelBuildLaptop= mongoose.model(  "ModelBuildLaptop"  ,  BuildLaptopSchema);
//         //  const storage = multer.diskStorage({
//         //     destination: (req, file, cb) => {
//         //       cb(null, 'uploads/'); 
//         //     },
//         //     filename: (req, file, cb) => {
//         //       cb(null, Date.now() + path.extname(file.originalname));
//         //     }
//         //   });
//         cloudinary.config({
//           cloud_name: "dqu0pfrmz", 
//           api_key: "913811239978551", 
//           api_secret: "VbInJPhL6Q9O3zg29bg0Zd6OCOE"
//         });
//   const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "laptop_images", // Folder name in Cloudinary
//     allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
//   },
// });
        
//         // const storage = multer.memoryStorage();
//           const upload = multer({ storage });
//       //  const upload = multer({ dest: 'uploads/' });
//       //  app.use('/uploads', express.static('uploads'));  
//      app.post("/api/BuildLaptop", upload.single('LaptopImage'), async (req, res) => {
//       try {
//       // const { inputLaptop, inputLaptopPrice, inputLaptopInformation, inputLaptopBatteryDuration } = request.body;
//        const data= req.body;  
//         if (!req.file) {
//         return res.status(400).json({ Information: "No image file uploaded." });
//         } 
//       const ModelBuildInformation = new ModelBuildLaptop({
//                         series: data.series,
//                         colour: data.colour,
//                         formFactor: data.formfactor,
//                         itemHeight: data.itemheight,
//                         standingScreenDisplaySize: data.standingscreendisplaysize,
//                         screenResolution: data.screenresolution,
//                         resolution: data.resolution,
//                         productDimensions: data.productdimensions,
//                         batteries: data.batteries,
//                         itemModelNumber: data.itemmodelnumber,
//                         processorBrand: data.processorbrand,
//                         processorType: data.processortype,
//                         processorSpeed: data.processorspeed,
//                         processorCount: data.processorcount,
//                         ramSize: data.ramsize,
//                         memoryTechnology: data.memorytechnology,
//                         maximumMemorySupported: data.maximummemorysupported,
//                         hardDriveSize: data.harddrivesize,
//                         hardDiskDescription: data.harddiskdescription,
//                         hardDriveInterface: data.harddriveinterface,
//                         audioDetails: data.audiodetails,
//                         graphicsCoprocessor: data.graphicscoprocessor,
//                         graphicsChipsetBrand: data.graphicschipsetbrand,
//                         graphicsRamType: data.graphicsramtype,
//                         graphicsCardInterface: data.graphicscardinterface,
//                         connectivityType: data.connectivitytype,
//                         wirelessType: data.wirelesstype,
//                         numberOfHdmiPorts: data.numberofhdmiports,
//                         voltage: data.voltage,
//                         operatingSystem: data.operatingsystem,
//                         areBatteriesIncluded: data.arebatteriesincluded,
//                         lithiumBatteryEnergyContent: data.lithiumbatteryenergycontent,
//                         numberOfLithiumIonCells: data.numberoflithiumioncells,
//                         includedComponents: data.includedcomponents,
//                         manufacturer: data.manufacturer,
//                         countryOfOrigin: data.countryoforigin,
//                         itemWeight: data.itemweight,
//                         laptopImage: req.file ? req.file.path : null,
//                       });
//                 await ModelBuildInformation.save();
//                 res.status(200).json({ Information: "BuildLaptop information is saved successfully",   LaptopObject:ModelBuildInformation  });
//             } catch (error) {
//                 res.status(500).json({ Information: "Internal error", error: error.message });
//             }
//         });
//    app.get("/api/Laptop" ,async (request, response)=>{
//     try{
//        const FindObject = await ModelBuildLaptop.find()
//     console.log(FindObject);
//      response.status(200).json({LaptopObject:FindObject});
//           }catch(error){
//  response.status(500).json({Information:"Internal error "})
//          }
//        })
// // Schema Definition
// const ElectronicsUploadSchema = new mongoose.Schema({
//   Series: String,
//   Price: String,
//   BrandName: String,
//   Colour: String,
//   FormFactor: String,
//   ItemHeight: String,
//   StandingScreenDisplaySize: String,
//   ProductDimensions: String,
//   BatteriesPower: String,
//   ItemModelNumber: String,
//   Material: String,
//   ChargingSpeed: String,
//   Voltage: String,
//   Manufacturer: String,
//   IncludedComponents: String,
//   CountryOfOrigin: String,
//   ItemWeight: String,
//   MobileBatteryImage: String, // Path to the uploaded image
// });
// // Model Definition
// const ModelChargingMobileBatteries = mongoose.model(
//   "ModelChargingMobileBatteries",
//   ElectronicsUploadSchema
// );
// // Multer Storage Configuration
// // const storage1 = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads1/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });
// // const storage1 = multer.memoryStorage();
// const upload1 = multer({ storage: multer.memoryStorage() });
// // const upload1 = multer({ dest: 'uploads1/' });
// // app.use('/uploads1', express.static('uploads1'));
// // API Endpoint
// app.post("/api/ChargingMobile", upload1.single("MobileBatteryImage"), async (req, res) => {
//   try {
//     const data1 = req.body; // Assigning req.body to data1
//      console.log(data1 );

//     if (!req.file) {
//       return res.status(400).json({ Information: "No image file uploaded." });
//     }

//     const ElectronicModelInformation = new ModelChargingMobileBatteries({
//       Series: data1.Series,
//       Price: data1.Price,
//       BrandName: data1.BrandName,
//       Colour: data1.Colour,
//       FormFactor: data1.FormFactor,
//       ItemHeight: data1.ItemHeight,
//       StandingScreenDisplaySize: data1.StandingScreenDisplaySize,
//       ProductDimensions: data1.ProductDimensions,
//       BatteriesPower: data1.BatteriesPower,
//       ItemModelNumber: data1.ItemModelNumber,
//       Material: data1.Material,
//       ChargingSpeed: data1.ChargingSpeed,
//       Voltage: data1.Voltage,
//       Manufacturer: data1.Manufacturer,
//       IncludedComponents: data1.IncludedComponents,
//       CountryOfOrigin: data1.CountryOfOrigin,
//       ItemWeight: data1.ItemWeight,
//       MobileBatteryImage: req.file ? req.file.path : null
//     });

//     // Save the information to MongoDB
//      console.log(ElectronicModelInformation);
//     await ElectronicModelInformation.save();
//     // console.log(ElectronicModelInformation);
//     res.status(200).json({
//       Information: "BuildLaptop information is saved successfully",
//       MobileChargerObject: ElectronicModelInformation,
//     });
//   } catch (error) {
//     res.status(500).json({ Information: "Internal error", error: error.message });
//   }
// });
//     app.get("/api/ChargingMobileBattery" ,async (request, response)=>{
//      try{
//        const MobileChargerData = await ModelChargingMobileBatteries.find()
//         console.log(MobileChargerData);
//         response.status(200).json({MobileCharger:MobileChargerData});
//       }catch(error){
//        response.status(500).json({Information:"Internal error "})
//        }
//         });
// //--------------------------------------------------------------- this is Watches PostApi()------------------------------------

// // Schema Definition
// const WatchesUploadSchema = new mongoose.Schema({
//   Series: String,
//   Price: String,
//   BrandName: String,
//   Colour: String,
//   BandColour: String,
//   Casediameter: String,
//   BandWidth: String,
//   CaseMaterial: String,
//   Casediameter: String,
//   CaseThickness: String,
//   ItemModelNumber: String,
//   Material: String,
//   ChargingSpeed: String,
//   Voltage: String,
//   Manufacturer: String,
//   Clasp:String,
//   DisplayType:String,
//   SpecialFeatures:String,
//   IncludedComponents: String,
//   CountryOfOrigin: String,
//   ItemWeight: String,
//   WatchImages: String, // Path to the uploaded image
// });

// // Model Definition
// const ModelWatches = mongoose.model(
//   "ModelWatches",
//   WatchesUploadSchema
// );
// // Multer Storage Configuration
// // const storage2 = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads2/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });
// // const storage2 = multer.memoryStorage();
// const upload2 = multer({ storage: multer.memoryStorage() });
// // const upload2 = multer({ dest: 'uploads2/' });
// // app.use('/uploads2', express.static('uploads2'));
// // API Endpoint
// app.post("/api/UploadWatches", upload2.single("WatchImages"), async (req, res) => {
//   try {
//     const data2 = req.body; // Assigning req.body to data1
//      console.log(data2 );
//     if (!req.file) {
//       return res.status(400).json({ Information: "No image file uploaded." });
//     }
//     const WatchesModelInformation = new ModelWatches({
//       Series: data2.Series,
//       Price: data2.Price,
//       BrandName: data2.BrandName,
//       Colour: data2.Colour,
//       BandColour:data2.BandColour,
//       Casediameter: data2.Casediameter,
//       BandWidth: data2.BandWidth,
//       CaseMaterial: data2.CaseMaterial,
//       CaseThickness: data2.CaseThickness,
//       ItemModelNumber: data2.ItemModelNumber,
//       Material: data2.Material,
//       ChargingSpeed: data2.ChargingSpeed,
//       Voltage: data2.Voltage,
//       Manufacturer: data2.Manufacturer,
//       Clasp: data2.Clasp,
//       DisplayType: data2.DisplayType,
//       SpecialFeatures: data2.SpecialFeatures,
//       IncludedComponents: data2.IncludedComponents,
//       CountryOfOrigin: data2.CountryOfOrigin,
//       ItemWeight: data2.ItemWeight,
//       WatchImages: req.file ? req.file.path : null
//     });
//     // Save the information to MongoDB
//      console.log(WatchesModelInformation  ,"this is WatchesModelInformation");
//     await WatchesModelInformation.save();
//     // console.log(ElectronicModelInformation);
//     res.status(200).json({
//       Information: "BuildLaptop information is saved successfully",
//       watchObject:WatchesModelInformation,
//     });
//   } catch (error) {
//     res.status(500).json({ Information: "Internal error", error: error.message });
//   }
// });
//     app.get("/api/watches" ,async (request, response)=>{
//      try{
//        const WatchesData = await ModelWatches.find()
//         console.log(WatchesData);
//         response.status(200).json({WatchesData:WatchesData});
//       }catch(error){
//        response.status(500).json({Information:"Internal error "})
//        }
//         });
//   //-------------------------Mobile(API)----------------------------------------------------------------------------------
  
//   // Schema Definition
// const MobileUploadSchema = new mongoose.Schema({
//   Series: String,
//   Price: String,
//   BrandName: String,
//   Colour: String,
//   Display: String,
//   Chip: String,
//   Finish	: String,
//   Camera	: String,
//   FrontFacingCamera	: String,
//   SecureAuthentication	: String,
//   Battery	: String,
//   ItemModelNumber: String,
//   Material: String,
//   ChargingSpeed: String,
//   Voltage: String,
//   Manufacturer: String,
//   Capacity	:String,
//   OperatingSystem:String,
//   SpecialFeatures:String,
//   ScreenSize	:String,
//   RAMMemoryInstalledSize : String,
//   IncludedComponents: String,
//   CountryOfOrigin: String,
//   ItemWeight: String,
//   MobileImages: String, // Path to the uploaded image
// });

// // Model Definition
// const ModelMobile = mongoose.model(
//   "ModelMobile",
//   MobileUploadSchema
// );

// // Multer Storage Configuration
// // const storage3 = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads3/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });
// // const storage3 = multer.memoryStorage();
// const upload3 = multer({ storage: multer.memoryStorage() });
// // const upload3 = multer({ dest: 'uploads3/' });
// // app.use('/uploads3', express.static('uploads3'));
// // API Endpoint
// app.post("/api/UploadMobile", upload3.single("MobileImages"), async (req, res) => {
//   try {
//     const data3 = req.body; // Assigning req.body to data1
//      console.log(data3 );

//     if (!req.file) {
//       return res.status(400).json({ Information: "No image file uploaded." });
//    }
//     const MobileModelInformation = new ModelMobile({
//       Series: data3.Series,
//       Price: data3.Price,
//       BrandName: data3.BrandName,
//       Colour: data3.Colour,
//       Display:data3.Display,
//       Chip: data3.Chip,
//       Finish: data3.Finish,
//       Camera: data3.Camera,
//       FrontFacingCamera: data3.FrontFacingCamera,
//       SecureAuthentication: data3.SecureAuthentication,
//       Battery:data3.Battery,
//       ItemModelNumber:data3.ItemModelNumber,
//       Material: data3.Material,
//       ChargingSpeed: data3.ChargingSpeed,
//       Voltage: data3.Voltage,
//       Manufacturer: data3.Manufacturer,
//       Capacity: data3.Capacity,
//       OperatingSystem: data3.OperatingSystem,
//       SpecialFeatures: data3.SpecialFeatures,
//       ScreenSize: data3.ScreenSize,
//       RAMMemoryInstalledSize: data3.RAMMemoryInstalledSize,
//       IncludedComponents: data3.IncludedComponents,
//       CountryOfOrigin: data3.CountryOfOrigin,
//       ItemWeight: data3.ItemWeight,
//       MobileImages: req.file ? req.file.path : null
//     });
//     // Save the information to MongoDB
//      console.log(MobileModelInformation  ,"this is WatchesModelInformation");
//     await MobileModelInformation.save();
//     // console.log(ElectronicModelInformation);
//     res.status(200).json({
//       Information: "BuildLaptop information is saved successfully",
//       MobileObject:MobileModelInformation,
//     });
//   } catch (error) {
//     res.status(500).json({ Information: "Internal error", error: error.message });
//   }
// });
//     app.get("/api/Mobile" ,async (request, response)=>{
//      try{
//        const MobileData = await ModelMobile.find()
//         console.log(MobileData);
//         response.status(200).json({MobileData:MobileData});
//       }catch(error){
//        response.status(500).json({Information:"Internal error "})
//        }
//         });
// //  app.post("/createPaymentIntent" , async(request , response)=>{
// //   // const amount =request.body;
// //   const { amount } = request.body;
// //    try{
// //    const PaymentIntent = await stripe.paymentIntents.create({
// //            amount:amount*100,
// //           currency:"USD" ,
// //        })     
// //     response.status(200).send({
// //      clientSecret: PaymentIntent.client_secret
// //      })
// //   }catch(error){
// //    console.log(error);
// //   response.status(500).json({Information:"Internal error"});
// //   }
// // }) 
//   // console.log(process.env.Stripe_key);
//   const paytmMerchantKey = "YOUR_MERCHANT_KEY";
//   const paytmMerchantId = "YOUR_MERCHANT_ID";
//   const  paytmWebsite = "WEBSTAGING"; // Use "WEB" for live environment

// // API to initiate payment
// app.post("/api/paytm/initiate", async (req, res) => {
//   try {
//     const { amount } = req.body;
//     console.log(amount);

//     // Create a unique order ID
//     const orderId = `ORDER_${new Date().getTime()}`;
//     console.log(orderId);

//     // Create payment request parameters
//     const paytmParams = {
//       MID: paytmMerchantId,
//       WEBSITE: paytmWebsite,
//       INDUSTRY_TYPE_ID: "Retail",
//       CHANNEL_ID: "WEB",
//       ORDER_ID: orderId,
//       CUST_ID: "CUST001",
//       TXN_AMOUNT: (amount / 100).toFixed(2), // Amount in INR
//       CALLBACK_URL: "http://localhost:5002/api/paytm/callback",
//     };
//       console.log(paytmParams , "this is paytmparams");
//       console.log(PaytmChecksum , "this is PaytmChecksum");
//       console.log(paytmMerchantKey);

//     // Generate checksum
//     const checksum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
//     console.log(PaytmChecksum , "this is PaytmChecksum");
//     console.log(checksum)

//     const payload = {
//       body: {
//         ...paytmParams,
//         CHECKSUMHASH: checksum,
//       },
//     };
//     console.log(payload)
//     const response = await axios.post(
//       `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${paytmMerchantId}&orderId=${orderId}`,
//       payload,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     if (response.data && response.data.body) {
//       res.json({
//         txnToken: response.data.body.txnToken,
//         orderId: orderId,
//         mid: paytmMerchantId,
//       });
//     } else {
//       throw new Error("Failed to fetch txnToken");
//     }
//   } catch (error) {
//     console.error("Error in payment initiation:", error.message);
//     res.status(500).json({ error: "Error initiating payment" });
//   }
// });

// // API to handle payment callback
// app.post("/api/paytm/callback", (req, res) => {
//   const paytmChecksum = req.body.CHECKSUMHASH;
//   delete req.body.CHECKSUMHASH;

//   const isValidChecksum = PaytmChecksum.verifySignature(req.body, paytmMerchantKey, paytmChecksum);

//   if (isValidChecksum) {
//     const { STATUS, TXNID, ORDERID } = req.body;

//     if (STATUS === "TXN_SUCCESS") {
//       // Payment successful
//       console.log(`Payment successful for Order ID: ${ORDERID}, Transaction ID: ${TXNID}`);
//       res.redirect(`http://localhost:3007/payment-success?orderId=${ORDERID}`);
//     } else {
//       // Payment failed
//       console.log(`Payment failed for Order ID: ${ORDERID}`);
//       res.redirect(`http://localhost:3007/payment-failure?orderId=${ORDERID}`);
//     }
//   } else {
//     console.log("Checksum verification failed");
//     res.status(400).send("Checksum verification failed");
//   }
// });
// // app.post("/api/search", (req, res) => {
// //   const { query } = req.body;
// //   console.log("this is ")
// //   console.log(query);

// //   if (!query) {
// //     return res.status(400).json({ message: "Search query is required" });
// //   }
// //   const FindObject = await ModelBuildLaptop.find()
// //   const filteredProducts = products.filter(product =>
// //     product.name.toLowerCase().includes(query.toLowerCase())
// //   );

// //   return res.json({ results: filteredProducts });
// // });

// // app.listen(5002 , (request,response)=>{

// //     console.log("DataBase is running");
// // })
// export default app;

/*----------------------------------------------------------------------------------*/

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import bcrypt from "bcrypt";
import Razorpay from "razorpay";
import 'dotenv/config';
// import cloudinary from "cloudinary";
import dotenv from 'dotenv';
// app.use(express.json());
dotenv.config(); // equivalent of require('dotenv').config()
// import Stripe from 'stripe';
// const stripe = new Stripe("sk_test_...", {
//   apiVersion: "2024-04-10",
// })

// import PaytmChecksum from 'paytmchecksum';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DatabaseUrl );
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
connectToMongoDB();

const app=express();

app.use(
  cors({
    origin: "https://electronic-based-project.vercel.app", // No trailing slash
    // origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const JWT_secretkey= process.env.JWT_SECRET_KEY

const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Recommended to prevent duplicate emails  
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Customer", "Seller"], // Restrict role to Customer or Seller
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  }
});
      const ModelRegister= mongoose.model("ModelRegister"     ,   RegisterSchema     );
      app.post("/api/Register", async (request, response) => {
        try {
          const {    name,
            email,
            password,
            role,
            address,
            country,
            city,
            houseNumber,
            pincode, } = request.body;

              console.log(email)
              console.log(password);
      
          // Ensure the user and password are not undefined
          if (!email || !password) {
            return response.status(400).json({ Information: "email and password are required" });
          }
            console.log(name);    
          console.log("email:", email);
          console.log("Password:", password);
          console.log("Password:", role);
          console.log("Password:",address );
          console.log("Password:", country);
          console.log("Password:", city);
          console.log("Password:", houseNumber);
          console.log("Password:", pincode);
      
          // Check if user is already registered
          const AlreadyRegistered = await ModelRegister.findOne({ email });
          if (AlreadyRegistered) {
            return response.status(400).json({ Information: "email already registered" });
          }
      
          // Hash the password with bcrypt
          console.log("Hashing the password");
          const SaltedPassword = await bcrypt.hash(password, 14);
      
          // Create new registration entry
          const RegisterInformation = new ModelRegister({ name,email, password: SaltedPassword ,  role,
            address,
            country,
            city,
            houseNumber,
            pincode, });
          await RegisterInformation.save();
      
          // Return success response
          // response.status(200).json({ Information: "Register information saved successfully" });
          return response.status(201).json({ Information: "User registered successfully" });
        } catch (error) {
          console.error("Error in /api/Register:", error);
          response.status(500).json({ Information: "Internal server error" });
        }
      });
    
      app.post("/api/Login", async (request, response) => {
        try {
          const { email, password } = request.body;
      console.log(email, password);
          // Check if the user exists in the database
          const RegisterInformation = await ModelRegister.findOne({ email });
          if (!RegisterInformation) {
            return response.status(404).json({ Information: "User not found. Please check your credentials." });
          }
      
          // Compare the password with the hashed password
          const RegisteredPassword = await bcrypt.compare(password, RegisterInformation.password);
          if (!RegisteredPassword) {
            return response.status(401).json({ Information: "Incorrect password. Please try again." });
          }
      
          // Create JWT token if login is successful
          const token = jsonwebtoken.sign({ userId: RegisterInformation._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
      
          return response.status(200).json({ Information: "Login Successful", token });
        } catch (error) {
          console.error("Error in /api/Login:", error);
          return response.status(500).json({ Information: "Internal Server Error" });
        }
      });
      
         app.get("/api/LaptopProtected", async(request,response)=>{

       const token= request.cookies.token;
       if(!token){
       response.status(200).json({session:false});
       }try{
       const CorrectUser= jsonwebtoken.verify(token , JWT_secretkey);
       if(CorrectUser){
       return   response.status(200).json({session:true  ,  user:CorrectUser}  ) 
         }
      }catch(error){
     return   response.status(500).json({session:false} )
     }
     })
        const BuildElectronicLaptopSchema= new mongoose.Schema({
        series: String,
        colour: String,
        price:Number,
        formFactor: String,
        itemHeight: String,
        standingScreenDisplaySize: String,
        screenResolution: String,
        resolution: String,
        productDimensions: String,
        batteries: String,
        itemModelNumber: String,
        processorBrand: String,
        processorType: String,
        processorSpeed: String,
        processorCount: String,
        ramSize: String,
        memoryTechnology: String,
        maximumMemorySupported: String,
        hardDriveSize: String,
        hardDiskDescription: String,
        hardDriveInterface: String,
        audioDetails: String,
        graphicsCoprocessor: String,
        graphicsChipsetBrand: String,
        graphicsRamType: String,
        graphicsCardInterface: String,
        connectivityType: String,  
        wirelessType: String,
        numberOfHdmiPorts: String,
        voltage: String,
        operatingSystem: String,
        areBatteriesIncluded: String,
        lithiumBatteryEnergyContent: String,
        numberOfLithiumIonCells: String,
        includedComponents: String,
        manufacturer: String,
        countryOfOrigin: String,
        itemWeight: String,
        // laptopImage: String
        laptopImages: [{ type: String, required: true }],
       });

         const ModelElectronicBuildLaptop= mongoose.model(  "ModelElectronicBuildLaptop"  ,  BuildElectronicLaptopSchema);
        //  const storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //       cb(null, 'uploads/'); 
        //     },
        //     filename: (req, file, cb) => {
        //       cb(null, Date.now() + path.extname(file.originalname));
        //     }
        //   });
                // const upload = multer({ storage: storage });

     /*----------------this is for cloudinary---------------*/

        cloudinary.config({
          cloud_name: "dqu0pfrmz", 
          api_key: "913811239978551", 
          api_secret: "VbInJPhL6Q9O3zg29bg0Zd6OCOE"
        });
        
        const storage = new CloudinaryStorage({
          cloudinary: cloudinary,
          params: {
            folder: "laptop_images", // Folder name in Cloudinary
            allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
          },
        });
        const upload = multer({ storage });

        // const storage = multer.memoryStorage();
          // const upload = multer({ storage: multer.memoryStorage() });
      //  const upload = multer({ dest: 'uploads/' });
       app.use('/uploads', express.static('uploads'));  
    //  app.post("/api/BuildLaptop", upload.single('LaptopImage'), async (req, res) => {
      app.post("/api/BuildLaptop", upload.array("laptopImages", 4), async (req, res) => {

      try {
      // const { inputLaptop, inputLaptopPrice, inputLaptopInformation, inputLaptopBatteryDuration } = request.body;
       const data= req.body;  
       console.log(req.files);
       if (!req.files || req.files.length === 0) {
        return res.status(400).json({ Information: "No images uploaded." });
    }
    const imagePaths = req.files.map(file => file.path);
    console.log(imagePaths);
  
      const ModelBuildElectronicInformation = new ModelElectronicBuildLaptop({
                        series: data.series,
                        colour: data.colour,
                        price: data.price,
                        formFactor: data.formfactor,
                        itemHeight: data.itemheight,
                        standingScreenDisplaySize: data.standingscreendisplaysize,
                        screenResolution: data.screenresolution,
                        resolution: data.resolution,
                        productDimensions: data.productdimensions,
                        batteries: data.Batteries,
                        itemModelNumber: data.itemmodelnumber,
                        processorBrand: data.processorbrand,
                        processorType: data.processortype,
                        processorSpeed: data.processorspeed,
                        processorCount: data.processorcount,
                        ramSize: data.ramsize,
                        memoryTechnology: data.memorytechnology,
                        maximumMemorySupported: data.maximummemorysupported,
                        hardDriveSize: data.harddrivesize,
                        hardDiskDescription: data.harddiskdescription,
                        hardDriveInterface: data.harddriveinterface,
                        audioDetails: data.audiodetails,
                        graphicsCoprocessor: data.graphicscoprocessor,
                        graphicsChipsetBrand: data.graphicschipsetbrand,
                        graphicsRamType: data.graphicsramtype,
                        graphicsCardInterface: data.graphicscardinterface,
                        connectivityType: data.connectivitytype,
                        wirelessType: data.wirelesstype,
                        numberOfHdmiPorts: data.numberofhdmiports,
                        voltage: data.voltage,
                        operatingSystem: data.operatingsystem,
                        BatteriesIncluded: data.batteriesincluded,
                        lithiumBatteryEnergyContent: data.lithiumbatteryenergycontent,
                        numberOfLithiumIonCells: data.numberoflithiumioncells,
                        ComponentsIncluded: data.ComponentsIncluded,
                        manufacturer: data.manufacturer,
                        countryOfOrigin: data.countryoforigin,
                        itemWeight: data.itemweight,
                        // laptopImage: req.file ? req.file.path : null,
                        laptopImages: imagePaths,
                      }); 
                await ModelBuildElectronicInformation.save();
                console.log(ModelBuildElectronicInformation);
                res.status(200).json({ Information: "BuildLaptop information is saved successfully", LaptopObject:ModelBuildElectronicInformation  });
            } catch (error) {
                res.status(500).json({ Information: "Internal error", error: error.message });
            }
        });
   app.get("/api/Laptop" ,async (request, response)=>{
    try{
       const FindObject = await ModelElectronicBuildLaptop.find()
    console.log(FindObject);
     response.status(200).json({LaptopObject:FindObject});
          }catch(error){
 response.status(500).json({Information:"Internal error "})
         }
       })

  /*-------------------MobileBatteryImage--------------------*/
// Schema Definition
// const ElectronicsUploadSchema = new mongoose.Schema({
//   Series: String,
//   Price: String,
//   BrandName: String,
//   Colour: String,
//   FormFactor: String,
//   ItemHeight: String,
//   StandingScreenDisplaySize: String,
//   ProductDimensions: String,
//   BatteriesPower: String,
//   ItemModelNumber: String,
//   Material: String,
//   ChargingSpeed: String,
//   Voltage: String,
//   Manufacturer: String,
//   IncludedComponents: String,
//   CountryOfOrigin: String,
//   ItemWeight: String,
//   MobileBatteryImage: String, // Path to the uploaded image
// });
// // Model Definition
// const ModelChargingMobileBatteries = mongoose.model(
//   "ModelChargingMobileBatteries",
//   ElectronicsUploadSchema
// );
/* ---------------this is storage for localhost-------------*/
// Multer Storage Configuration
// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads1/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload1 = multer({ storage: storage1 });
// app.use('/uploads1', express.static('uploads1'));
// const storage1 = multer.memoryStorage();
// const upload1 = multer({ storage: multer.memoryStorage() });

// const upload1 = multer({ dest: 'uploads1/' });
// API Endpoint
// app.post("/api/ChargingMobile", upload1.single("MobileBatteryImage"), async (req, res) => {
  /*---------------this is for cloudinary -------------*/
//   app.post("/api/ChargingMobile", upload.single("MobileBatteryImage"), async (req, res) => {
//   try {
//     const data1 = req.body; // Assigning req.body to data1
//      console.log(data1 );

//     if (!req.file) {
//       return res.status(400).json({ Information: "No image file uploaded." });
//     }

//     const ElectronicModelInformation = new ModelChargingMobileBatteries({
//       Series: data1.Series,
//       Price: data1.Price,
//       BrandName: data1.BrandName,
//       Colour: data1.Colour,
//       FormFactor: data1.FormFactor,
//       ItemHeight: data1.ItemHeight,
//       StandingScreenDisplaySize: data1.StandingScreenDisplaySize,
//       ProductDimensions: data1.ProductDimensions,
//       BatteriesPower: data1.BatteriesPower,
//       ItemModelNumber: data1.ItemModelNumber,
//       Material: data1.Material,
//       ChargingSpeed: data1.ChargingSpeed,
//       Voltage: data1.Voltage,
//       Manufacturer: data1.Manufacturer,
//       IncludedComponents: data1.IncludedComponents,
//       CountryOfOrigin: data1.CountryOfOrigin,
//       ItemWeight: data1.ItemWeight,
//       MobileBatteryImage: req.file ? req.file.path : null
//     });

//     // Save the information to MongoDB
//      console.log(ElectronicModelInformation);
//     await ElectronicModelInformation.save();
//     // console.log(ElectronicModelInformation);
//     res.status(200).json({
//       Information: "BuildLaptop information is saved successfully",
//       MobileChargerObject: ElectronicModelInformation,
//     });
//   } catch (error) {
//     res.status(500).json({ Information: "Internal error", error: error.message });
//   }
// });
//     app.get("/api/ChargingMobileBattery" ,async (request, response)=>{
//      try{
//        const MobileChargerData = await ModelChargingMobileBatteries.find()
//         console.log(MobileChargerData);
//         response.status(200).json({MobileCharger:MobileChargerData});
//       }catch(error){
//        response.status(500).json({Information:"Internal error "})
//        }
//         });
//--------------------------------------------------------------- this is Watches PostApi()------------------------------------

// Schema Definition
const WatchesUploadSchema = new mongoose.Schema({
  series: String,
  price: String,
  brandname: String,
  colour: String,
  bandcolour: String,
  casediameter: String,
  bandwidth: String,
  casematerial: String,
  casethickness: String,
  itemmodelnumber: String,
  material: String,
  chargingspeed: String,
  voltage: String,
  manufacturer: String,
  clasp: String,
  displaytype: String,
  specialfeatures: String,
  includedcomponents: String,
  countryoforigin: String,
  itemweight: String,
  watchimages: [{ type: String, required: true }]// Path to the uploaded image
});

// Model Definition
const ModelWatches = mongoose.model(
  "ModelWatches",
  WatchesUploadSchema
);
// Multer Storage Configuration
// const storage2 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads2/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// // });
// const upload2 = multer({ storage: storage2 });
// app.use('/uploads2', express.static('uploads2'));
// const storage2 = multer.memoryStorage();
// const upload2 = multer({ storage: multer.memoryStorage() });
// const upload2 = multer({ dest: 'uploads2/' });
// API Endpoint
// app.post("/api/Watches", upload2.single("WatchImages"), async (req, res) => {
  app.post("/api/Watches", upload.array("watchimages", 4), async (req, res) => {
  try {
    const data2 = req.body; // Assigning req.body to data1
     console.log(data2 );
     if (!req.files || req.files.length === 0) {
      return res.status(400).json({ Information: "No images uploaded." });
  }
    const WatchesModelInformation = new ModelWatches({
      series: data2.series,
      price: data2.price,
      brandname: data2.brandname,
      connectivitytypecolour: data2.colour,
      bandcolour: data2.bandcolour,
      casediameter: data2.casediameter,
      bandwidth: data2.bandwidth,
      casematerial: data2.casematerial,
      casethickness: data2.casethickness,
      itemmodelnumber: data2.itemmodelnumber,
      material: data2.material,
      chargingspeed: data2.chargingspeed,
      voltage: data2.voltage,
      manufacturer: data2.manufacturer,
      clasp: data2.clasp,
      displaytype: data2.displaytype,
      specialfeatures: data2.specialfeatures,
      includedcomponents: data2.includedcomponents,
      countryoforigin: data2.countryoforigin,
      itemweight: data2.itemweight,
      watchimages: req.files.map(file => file.path),
      
    });
    // Save the information to MongoDB
     console.log(WatchesModelInformation  ,"this is WatchesModelInformation");
    await WatchesModelInformation.save();
    // console.log(ElectronicModelInformation);
    res.status(200).json({
      Information: "BuildLaptop information is saved successfully",
      watchObject:WatchesModelInformation,
    });
  } catch (error) {
    res.status(500).json({ Information: "Internal error", error: error.message });
  }
});
    app.get("/api/watches" ,async (request, response)=>{
     try{
       const WatchesData = await ModelWatches.find()
        console.log(WatchesData);
        response.status(200).json({WatchesData:WatchesData});
      }catch(error){
       response.status(500).json({Information:"Internal error "})
       }
        });
  //-------------------------Mobile(API)----------------------------------------------------------------------------------
  
  // Schema Definition
const MobileUploadSchema = new mongoose.Schema({
  series: String,
price: String,
brandname: String,
colour: String,
display: String,
camera: String,
frontfacingcamera: String,
secureauthentication: String,
battery: String,
itemmodelnumber: String,
material: String,
chargingspeed: String,
voltage: String,
capacity: String,
standingscreendisplaysize:String,
operatingsystem: String,
specialfeatures: String,
screensize: String,
rammemoryinstalledsize: String,
includedcomponents: String,
countryoforigin: String,
itemweight: String,
manufacturer: String,
mobileimages: [{ type: String, required: true }]
});

// Model Definition
const ModelMobile = mongoose.model(
  "ModelMobile",
  MobileUploadSchema
);

// Multer Storage Configuration
// const storage3 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads3/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload3 = multer({ storage: multer.memoryStorage() });
// app.use('/uploads3', express.static('uploads3'));
// const storage3 = multer.memoryStorage();
// const upload3 = multer({ dest: 'uploads3/' });
// API Endpoint
app.post("/api/Mobile", upload.array("mobileimages", 4), async (req, res) => {
  try {
    const data3 = req.body; // Assigning req.body to data1
     console.log(data3 );

     if (!req.files || req.files.length === 0) {
      return res.status(400).json({ Information: "No images uploaded." });
  }
        const MobileModelInformation = new ModelMobile({
      series: data3.series,
      price: data3.price,
      brandname: data3.brandname,
      colour: data3.colour,
      display: data3.display,
      camera: data3.camera,
      frontfacingcamera: data3.frontfacingcamera,
      secureauthentication: data3.secureauthentication,
      battery: data3.battery,
      itemmodelnumber: data3.itemmodelnumber,
      material: data3.material,
      chargingspeed: data3.chargingspeed,
      voltage: data3.voltage,
      capacity: data3.capacity,
      standingscreendisplaysize: data3.standingscreendisplaysize,
      operatingsystem: data3.operatingsystem,
      specialfeatures: data3.specialfeatures,
      screensize: data3.screensize,
      rammemoryinstalledsize: data3.rammemoryinstalledsize,
      includedcomponents: data3.includedcomponents,
      countryoforigin: data3.countryoforigin,
      itemweight: data3.itemweight,
      manufacturer: data3.manufacturer,
      mobileimages: req.files.map(file => file.path),
    });
    // Save the information to MongoDB
     console.log(MobileModelInformation  ,"this is MobileModelInformation");
    await MobileModelInformation.save();
    // console.log(ElectronicModelInformation);
    res.status(200).json({
      Information: "Mobile information is saved successfully",
      MobileObject:MobileModelInformation,
    });
  } catch (error) {
    res.status(500).json({ Information: "Internal error", error: error.message });
  }
});
    app.get("/api/Mobile" ,async (request, response)=>{
     try{
       const MobileData = await ModelMobile.find()
        console.log(MobileData);
        response.status(200).json({MobileData:MobileData});
      }catch(error){
       response.status(500).json({Information:"Internal error "})
       }
        });
    /*----------------------LaptopCharger---------------------*/
    const laptopChargerUploadSchema = new mongoose.Schema({
      series: { type: String, required: false },
      colour: { type: String, required: false },
      price: { type: String, required: false },
      brandname: { type: String, required: false },
      formFactor: { type: String, required: false },
      itemHeight: { type: String, required: false },
      productDimensions: { type: String, required: false },
      itemModelNumber: { type: String, required: false },
      voltage: { type: String, required: false },
      chargingSpeed: { type: String, required: false },
      ComponentsIncluded: { type: String, required: false },
      specialfeatures: { type: String, required: false },
      manufacturer: { type: String, required: false },
      countryOfOrigin: { type: String, required: false },
      itemWeight: { type: String, required: false },
      laptopChargerImages: { type: [String], required: false },
    });
    const ModelLaptopCharger = mongoose.model(
      "ModelLaptopCharger",
      laptopChargerUploadSchema
    );
    // const storage4 = multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, "uploads3/");
    //   },
    //   filename: (req, file, cb) => {
    //     cb(null, Date.now() + path.extname(file.originalname));
    //   },
    // });
    // const upload4 = multer({ storage: storage4});
    //     app.use('/uploads', express.static('uploads'));  
        //  app.post("/api/BuildLaptop", upload.single('LaptopImage'), async (req, res) => {
          app.post("/api/laptopCharger", upload.array("laptopChargerImages", 4), async (req, res) => {
    
          try {
          // const { inputLaptop, inputLaptopPrice, inputLaptopInformation, inputLaptopBatteryDuration } = request.body;
           const data= req.body;  
           console.log(req.files);
           if (!req.files || req.files.length === 0) {
            return res.status(400).json({ Information: "No images uploaded." });
        }
        const imagePaths = req.files.map(file => file.path);
        console.log(imagePaths);
      
          const ElectronicLaptopChargerInformation = new ModelLaptopCharger({
                            series: data.series,
                            colour: data.colour,
                            brandname:data.brandname,
                            price: data.price,
                            formFactor: data.formfactor,
                            itemHeight: data.itemheight,
                            productDimensions: data.productdimensions,
                            itemModelNumber: data.itemmodelnumber,
                            voltage: data.voltage,
                            chargingspeed:data.chargingspeed,
                            ComponentsIncluded: data.ComponentsIncluded,
                            specialfeatures: data.specialfeatures,
                            manufacturer: data.manufacturer,
                            countryOfOrigin: data.countryoforigin,
                            itemWeight: data.itemweight,
                            // laptopImage: req.file ? req.file.path : null,
                            laptopChargerImages: imagePaths,
                          }); 
                    await ElectronicLaptopChargerInformation.save();
                    console.log(ElectronicLaptopChargerInformation);
                    res.status(200).json({ Information: "LaptopCharger information is saved successfully", LaptopObject:ElectronicLaptopChargerInformation  });
                } catch (error) {
                    res.status(500).json({ Information: "Internal error", error: error.message });
                }
            });
       app.get("/api/laptopCharger" ,async (request, response)=>{
        try{
           const FindObject = await ModelLaptopCharger.find()
        console.log(FindObject);
         response.status(200).json({LaptopChargerData:FindObject});
              }catch(error){
     response.status(500).json({Information:"Internal error "})
             }
           })
   /*-------------------------MobileCharger-----------------------------*/
           const mobileChargerUploadSchema = new mongoose.Schema({
            series: { type: String, required: false },
            colour: { type: String, required: false },
            price: { type: String, required: false },
            brandname: { type: String, required: false },
            formFactor: { type: String, required: false },
            itemHeight: { type: String, required: false },
            productDimensions: { type: String, required: false },
            itemModelNumber: { type: String, required: false },
            voltage: { type: String, required: false },
            chargingSpeed: { type: String, required: false },
            ComponentsIncluded: { type: String, required: false },
            specialfeatures: { type: String, required: false },
            manufacturer: { type: String, required: false },
            countryOfOrigin: { type: String, required: false },
            itemWeight: { type: String, required: false },
            mobileChargerImages: { type: [String], required: false },
          });
          const ModelmobileCharger = mongoose.model(
            "ModelmobileCharger",
            mobileChargerUploadSchema
          );
          // const storage5 = multer.diskStorage({
          //   destination: (req, file, cb) => {
          //     cb(null, "uploads5/");
          //   },
          //   filename: (req, file, cb) => {
          //     cb(null, Date.now() + path.extname(file.originalname));
          //   },
          // });
          // const upload5 = multer({ storage: storage5});
          //     app.use('/uploads5', express.static('uploads5'));
              //  app.post("/api/BuildLaptop", upload.single('LaptopImage'), async (req, res) => {
                app.post("/api/mobileCharger", upload.array("mobileChargerImages", 4), async (req, res) => {
          
                try {
                // const { inputLaptop, inputLaptopPrice, inputLaptopInformation, inputLaptopBatteryDuration } = request.body;
                 const data= req.body;  
                 console.log(req.files);
                 if (!req.files || req.files.length === 0) {
                  return res.status(400).json({ Information: "No images uploaded." });
              }
              const imagePaths = req.files.map(file => file.path);
              console.log(imagePaths);
            
                const ElectronicmobileChargerInformation = new ModelmobileCharger({
                                  series: data.series,
                                  colour: data.colour,
                                  brandname:data.brandname,
                                  price: data.price,
                                  formFactor: data.formfactor,
                                  itemHeight: data.itemheight,
                                  productDimensions: data.productdimensions,
                                  itemModelNumber: data.itemmodelnumber,
                                  voltage: data.voltage,
                                  chargingspeed:data.chargingspeed,
                                  ComponentsIncluded: data.ComponentsIncluded,
                                  specialfeatures: data.specialfeatures,
                                  manufacturer: data.manufacturer,
                                  countryOfOrigin: data.countryoforigin,
                                  itemWeight: data.itemweight,
                                  // laptopImage: req.file ? req.file.path : null,
                                  mobileChargerImages: imagePaths,
                                }); 
                          await ElectronicmobileChargerInformation.save();
                          console.log(ElectronicmobileChargerInformation);
                          res.status(200).json({ Information: "mobileCharger information is saved successfully", mobileObject:ElectronicmobileChargerInformation  });
                      } catch (error) {
                          res.status(500).json({ Information: "Internal error", error: error.message });
                      }
                  });
             app.get("/api/mobileCharger" ,async (request, response)=>{
              try{
                 const FindObject = await ModelmobileCharger.find()
              console.log(FindObject);
               response.status(200).json({mobileChargerData:FindObject});
                    }catch(error){
           response.status(500).json({Information:"Internal error "})
                   }
                 })
     /*---------------------ChargingMobileBattery---------------------*/
     const mobileChargingBatteryUploadSchema = new mongoose.Schema({
      series: { type: String, required: false },
      colour: { type: String, required: false },
      price: { type: String, required: false },
      brandname: { type: String, required: false },
      formFactor: { type: String, required: false },
      itemHeight: { type: String, required: false },
      productDimensions: { type: String, required: false },
      itemModelNumber: { type: String, required: false },
      voltage: { type: String, required: false },
      chargingSpeed: { type: String, required: false },
      ComponentsIncluded: { type: String, required: false },
      specialfeatures: { type: String, required: false },
      manufacturer: { type: String, required: false },
      countryOfOrigin: { type: String, required: false },
      itemWeight: { type: String, required: false },
      mobileChargingBatteryImages: { type: [String], required: false },
    });
    const ModelmobileChargingBattery = mongoose.model(
      "ModelmobileChargingBattery",
      mobileChargingBatteryUploadSchema
    );
    // const storage7 = multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, "uploads/");
    //   },
    //   filename: (req, file, cb) => {
    //     cb(null, Date.now() + path.extname(file.originalname));
    //   },
    // });
    // const upload7 = multer({ storage: storage7});
    //     app.use('/uploads', express.static('uploads'));
        //  app.post("/api/BuildLaptop", upload.single('LaptopImage'), async (req, res) => {
          app.post("/api/mobileChargingBattery", upload.array("mobileChargingBatteryImages", 4), async (req, res) => {
    
          try {
          // const { inputLaptop, inputLaptopPrice, inputLaptopInformation, inputLaptopBatteryDuration } = request.body;
           const data= req.body;  
           console.log(req.files);
           if (!req.files || req.files.length === 0) {
            return res.status(400).json({ Information: "No images uploaded." });
        }
        const imagePaths = req.files.map(file => file.path);
        console.log(imagePaths);
      
          const ElectronicmobileChargingBatteryInformation = new ModelmobileChargingBattery({
                            series: data.series,
                            colour: data.colour,
                            brandname:data.brandname,
                            price: data.price,
                            formFactor: data.formfactor,
                            itemHeight: data.itemheight,
                            productDimensions: data.productdimensions,
                            itemModelNumber: data.itemmodelnumber,
                            voltage: data.voltage,
                            chargingspeed:data.chargingspeed,
                            ComponentsIncluded: data.ComponentsIncluded,
                            specialfeatures: data.specialfeatures,
                            manufacturer: data.manufacturer,
                            countryOfOrigin: data.countryoforigin,
                            itemWeight: data.itemweight,
                            // laptopImage: req.file ? req.file.path : null,
                            mobileChargingBatteryImages: imagePaths,
                          }); 
                    await ElectronicmobileChargingBatteryInformation.save();
                    console.log(ElectronicmobileChargingBatteryInformation);
                    res.status(200).json({ Information: "mobileChargingBattery information is saved successfully", mobileBatteryObject:ElectronicmobileChargingBatteryInformation  });
                } catch (error) {
                    res.status(500).json({ Information: "Internal error", error: error.message });
                }
            });
       app.get("/api/mobileChargingBattery" ,async (request, response)=>{
        try{
           const FindObject = await ModelmobileChargingBattery.find()
        console.log(FindObject);
         response.status(200).json({mobileChargingBatteryData:FindObject});
              }catch(error){
     response.status(500).json({Information:"Internal error "})
             }
           })
//  app.post("/createPaymentIntent" , async(request , response)=>{
//   // const amount =request.body;
//   const { amount } = request.body;
//    try{
//    const PaymentIntent = await stripe.paymentIntents.create({
//            amount:amount*100,
//           currency:"USD" ,
//        })     
//     response.status(200).send({
//      clientSecret: PaymentIntent.client_secret
//      })
//   }catch(error){
//    console.log(error);
//   response.status(500).json({Information:"Internal error"});
//   }
// }) 
  // console.log(process.env.Stripe_key);
  // const paytmMerchantKey = "YOUR_MERCHANT_KEY";
  // const paytmMerchantId = "YOUR_MERCHANT_ID";
  // const  paytmWebsite = "WEBSTAGING"; // Use "WEB" for live environment

// API to initiate payment
app.post("/api/paytm/initiate", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);

    // Create a unique order ID
    const orderId = `ORDER_${new Date().getTime()}`;
    console.log(orderId);

    // Create payment request parameters
    const paytmParams = {
      MID: paytmMerchantId,
      WEBSITE: paytmWebsite,
      INDUSTRY_TYPE_ID: "Retail",
      CHANNEL_ID: "WEB",
      ORDER_ID: orderId,
      CUST_ID: "CUST001",
      TXN_AMOUNT: (amount / 100).toFixed(2), // Amount in INR
      CALLBACK_URL: "http://localhost:5002/api/paytm/callback",
    };
      console.log(paytmParams , "this is paytmparams");
      console.log(PaytmChecksum , "this is PaytmChecksum");
      console.log(paytmMerchantKey);

    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
    console.log(PaytmChecksum , "this is PaytmChecksum");
    console.log(checksum)

    const payload = {
      body: {
        ...paytmParams,
        CHECKSUMHASH: checksum,
      },
    };
    console.log(payload)
    const response = await axios.post(
      `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${paytmMerchantId}&orderId=${orderId}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data && response.data.body) {
      res.json({
        txnToken: response.data.body.txnToken,
        orderId: orderId,
        mid: paytmMerchantId,
      });
    } else {
      throw new Error("Failed to fetch txnToken");
    }
  } catch (error) {
    console.error("Error in payment initiation:", error.message);
    res.status(500).json({ error: "Error initiating payment" });
  }
});

// API to handle payment callback
app.post("/api/paytm/callback", (req, res) => {
  const paytmChecksum = req.body.CHECKSUMHASH;
  delete req.body.CHECKSUMHASH;

  const isValidChecksum = PaytmChecksum.verifySignature(req.body, paytmMerchantKey, paytmChecksum);

  if (isValidChecksum) {
    const { STATUS, TXNID, ORDERID } = req.body;

    if (STATUS === "TXN_SUCCESS") {
      // Payment successful
      console.log(`Payment successful for Order ID: ${ORDERID}, Transaction ID: ${TXNID}`);
      res.redirect(`http://localhost:3007/payment-success?orderId=${ORDERID}`);
    } else {
      // Payment failed
      console.log(`Payment failed for Order ID: ${ORDERID}`);
      res.redirect(`http://localhost:3007/payment-failure?orderId=${ORDERID}`);
    }
  } else {
    console.log("Checksum verification failed");
    res.status(400).send("Checksum verification failed");
  }
});
// app.post("/api/search", (req, res) => {
//   const { query } = req.body;
//   console.log("this is ")
//   console.log(query);

//   if (!query) {
//     return res.status(400).json({ message: "Search query is required" });
//   }
//   const FindObject = await ModelBuildLaptop.find()
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return res.json({ results: filteredProducts });
// });


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
});

app.get('/api/get-razorpay-key', (req, res) => {
  console.log(process.env.RAZORPAY_KEY_ID);
  console.log(process.env.RAZORPAY_KEY_SECRET);
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in INR
    console.log("Received amount from frontend:", amount);
     if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`, // Unique Receipt ID
    });
    console.log("Order created successfully:", order);
    res.json(order); // Send order details to frontend
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
app.get("/api/test-razorpay-auth", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 1,
      currency: "INR",
      receipt: "test_receipt_1",
    });
    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Authentication Failed:", error);
    res.status(500).json({ success: false, error });
  }
});

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  email: { type: String, required: true },
  paymentId: { type: String, required: true },
  useraddress: { type: String, required: true },
  status: { type: String, default: "Paid" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

/*-------------Api to save the order after successfull payment-----------*/
app.post("/api/save-order", async (request, response) => {
  try {
    const {
      productId,
      productName,
      price,
      email,
      paymentId,
      useraddress,
      // success,
    } = request.body;

    // if (!success) {
    //   return res.status(400).json({ message: "Payment was not successful. Order not saved." });
    // }

    const newOrder = new Order({
      productId,
      productName,
      price,
      email,
      paymentId,
      useraddress,
    });

    await newOrder.save();
    return response.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    return res.status(500).json({ message: "Internal server error while saving order" });
  }
});
/*----------------API to receive the data from Orderstatus----------------*/
app.get("/api/order-status", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const orders = await Order.find({ email });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error." });
  }
});
/*---------------API for Delievering Location Availability---------------*/
const serviceableAreas = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

// API to check delivery availability
app.post("/api/check-delivery", (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  // Check if the entered address is in the serviceable areas list
  const isAvailable = serviceableAreas.some((area) =>
    address.toLowerCase().includes(area.toLowerCase())
  );

  res.json({ available: isAvailable });
});


const BagSchema = new mongoose.Schema({
  email: { type: String, required: true },
  bagItems: { type: Array, default: [] }
});

const BagModel = mongoose.model("BagModel", BagSchema);

// ✅ **Add or Remove Product from Bag**
app.post("/api/orderlist", async (req, res) => {
  const { email, item } = req.body;

  try {
    let order = await BagModel.findOne({ email });

    if (!order) {
      order = new BagModel({ email, bagItems: [] });
    }

    const itemExists = order.bagItems.some(bagItem => bagItem._id === item._id);

    if (itemExists) {
      order.bagItems = order.bagItems.filter(bagItem => bagItem._id !== item._id);
    } else {
      order.bagItems.push(item);
    }

    await order.save();
    console.log(order);
    res.json({ orderlist: order.bagItems, orderlistlength: order.bagItems.length });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/orderlist/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase(); // Ensure case-insensitive search
    const order = await BagModel.findOne({ email });

    res.json({ orderlist: order ? order.bagItems : [] });
  } catch (error) {
    console.error("Error fetching order list:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// app.listen(5007 , (request,response)=>{

//     console.log("DataBase is running");
// })
export default app;
