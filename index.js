require("dotenv/config");
require("./config/database.js");
const app = require("./config/express.js");
const User = require("./models/user-model.js");



app.get("/", async (req, res) => {
  res.send("VeriBuy API")
})

app.get("/licensing/getall", async (req, res) => {
  try {

    const user = await User.find();
    res.status(200).json(user);

  } catch (err) {

    res.status(400).json({ message: "no data found.." })

  }
});



app.post("/createUser", async (req, res) => {
  const { emailAddress } = req.body;
  try {
    const [foundUser] = await User.find({
      emailAddress
    });
    if (foundUser)
      return res.send("License already exists for this product!!");
    const username = emailAddress.split('@')[0];
    const user = new User({
      creationDate: new Date().getTime(),
      emailAddress,
      username,
    });
    const saved = await user.save();

    res.send("User Created Successfully!");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});



// CHECK LICENSE VALIDITY
// app.post("/license", async (req, res) => {
//   const licenseKey = req.body.licenseKey.replace(/[^A-Za-z0-9]/g, "")
//   const [foundLicense] = await License.find({
//     licenseKey: licenseKey,
//   });
//   if (!foundLicense)
//     res.send({ licenseValid: false, message: "Invalid license key!" });
//   else {
//     let validLicenses = {};
//     let allowedDevice = 1;
//     for (const [licenseName, licenseDetails] of Object.entries(
//       foundLicense.licensedPlan
//     )) {
//       if (licenseDetails.expirationDate > new Date().getTime()) {
//         if (licenseDetails.allowedDevice > allowedDevice)
//           allowedDevice = licenseDetails.allowedDevice;
//         validLicenses[licenseName] = licenseDetails;
//       }
//     }
//     const authorizationCode = getRandomString(32);
//     if (Object.keys(validLicenses).length === 0)
//       res.send({ licenseValid: false, message: "License key expired!" });
//     else {
//       let authorizations = foundLicense.authorizations;

//       authorizations.push({
//         authorizationCode: authorizationCode,
//         lastAccess: new Date().getTime(),
//         userAgent: req.get("User-Agent"),
//         ipAddress: req.ip,
//         authorizationDate: new Date().getTime(),
//       });
//       res.cookie(`authorizationCode`, authorizationCode, {
//         maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
//         httpOnly: false,
//       });
//       authorizations = authorizations.slice(allowedDevice * -1);
//       await License.updateOne(
//         { licenseKey: licenseKey },
//         {
//           $set: {
//             authorizations: authorizations
//           },
//         }
//       )
//         .then((obj) => {
//           console.log("Updated - " + obj);
//         })
//         .catch((err) => {
//           console.log("Error: " + err);
//         });
//     }
//     console.log(foundLicense);
//     res.send({
//       emailAddress: foundLicense.emailAddress,
//       company: foundLicense.company,
//       username: foundLicense.fullName,
//       licenseValid: true,
//       message: "License key validation successfull !",
//       validLicenses: validLicenses,
//       authorizationCode: authorizationCode
//     });
//   }
// });

// // CHECK LICENSING STATUS
// app.post("/authorize", async (req, res) => {
//   let authorized = false;
//   let validLicense = {};
//   let emailAddress;
//   let { authorizationCode } = req.body
//   if (authorizationCode) {
//     const [foundLicense] = await License.find({
//       "authorizations.authorizationCode": authorizationCode,
//     });
//     if (foundLicense) {
//       emailAddress = foundLicense.emailAddress;
//       let licensePlan = foundLicense.licensedPlan;
//       const currentPlan = Object.keys(licensePlan);
//       const expirationDate = licensePlan[currentPlan].expirationDate;
//       const contactsLeft = licensePlan[currentPlan].contactsLeft;

//       if (contactsLeft <= 100 && isWeekPassed(foundLicense.resetDate)) {
//         licensePlan[currentPlan].contactsLeft = availablePlans[currentPlan].contacts; 
       
//           await License.updateOne(
//             { emailAddress: emailAddress },
//             {
//               $set: {
//                 licensedPlan: licensePlan,
//                 resetDate: moment().format()
//               },
//             }
//           )
//       }

//       for (const [licenseName, licenseDetails] of Object.entries(
//         foundLicense.licensedPlan
//       )) {
//         if (licenseDetails.expirationDate > new Date().getTime()) {
//           validLicense[licenseName] = licenseDetails;
//         }
//       }
//       if (Object.keys(validLicense).length !== 0) authorized = true;
//     }
//   }
//   if (authorized)
//     res.send({
//       userEmail: emailAddress,
//       authorized: true,
//       validLicenses: validLicense
//     });
//   else res.send({ userEmail: emailAddress, authorized: false });
// });


