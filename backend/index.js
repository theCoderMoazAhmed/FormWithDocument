const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

app.use(express.json());
app.use(cors());

//Database connection with mongodb
mongoose.connect(
  "mongodb+srv://versanexinc:moazahmed@practice.cebdo3x.mongodb.net/form"
);
// gtymoazahmed@gamil

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
// Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// API Creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Enum for gender
const GenderEnum = ["Male", "Female", "Other"];

// Enum for gender
const VisaEnum = [
  "Student Visa",
  "Work Visa",
  "Parent Visa",
  "Permanent Residential Card",
];

// Enum for English levels
const EnglishLevelEnum = [
  "Beginner",
  "Elementary",
  "IELTS 4.5",
  "IELTS 5.5",
  "IELTS 6.0",
  "IELTS 6.5",
];

// Enum for passed English tests
const EnglishTestsEnum = ["PTE", "FCE", "CAE", "TOEIC", "IELTS", "NOPE"];

// Enum for study time
const StudyTimeEnum = ["Full-Time", "Part-Time-Morning", "Part-Time-Evening"];

// Enum for accommodation options
const AccommodationOptionsEnum = [
  "Homestay",
  "Homestay on farm",
  "Hotel/Motel/Apartment",
];

// Enum for medical disability
const MedicalDisabilityEnum = ["Yes", "No"];

// Enum for applicant agent
const ApplicantAgentEnum = ["Yes", "No"];

// Enum for company accommodation
const CompanyAccommodationEnum = ["Yes", "No"];

// Enum for smoke
const SmokeEnum = ["Yes", "No"];

// Enum for specific diet
const SpecificDietEnum = ["Yes", "No"];

// Enum for pets issue
const PetsIssueEnum = ["Yes", "No"];

// Enum for foods can't eat
const FoodsCantEatEnum = ["Yes", "No"];

// Enum for allergic foods/pets
const AllergicFoodsPetsEnum = ["Yes", "No"];

// Enum for suffering medical condition
const SufferingMedicalConditionEnum = ["Yes", "No"];

// Enum for mind international family
const MindInternationalFamilyEnum = ["Yes", "No"];
// Enum for mind international family
const AccommmodationEnum = ["Yes", "No"];

// Schema for creating user
const User = mongoose.model("User", {
  id: {
    type: Number,
    required: true,
  },
  applicationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  image: String,
  // personal information
  firstName: String,
  familyName: String,
  personalCnic: Number,
  personalEmail: String,
  personalMobile: Number,
  personalPhone: Number,
  personalDateOfBirth: Date,
  gender: {
      type: String,
      enum: GenderEnum
  },
  citizenshipCountry: String,
  presentOccupation: String,
  visa: {
      type: String,
      enum: VisaEnum
  },
  passportNumber: Number,
  passportExpiry: Date,
//   personal adress
  homeAddress: {
      address: String,
      phone: Number,
      mobile: Number,
      email: String
  },
  chinaAddress: {
      address: String,
      phone: Number,
      mobile: Number,
      email: String
  },

  // Languages
  firstLanguage: String,
  otherLanguages: String,
  englishLevel: {
      type: String,
      enum: EnglishLevelEnum
  },
  qualificationLevel: String,
  passedEnglishTests: [{
      type: String,
      enum: EnglishTestsEnum
  }],
  schoolInfo: String,
  collegeInfo: String,

  // Course
  campusSite: String,
  courseName: String,
  courseStartDate: Date,
  courseEndDate: Date,
  courseStudyWeeks: String,
  interestedField: String,
  studyTime:{
      type: String,
      enum: StudyTimeEnum
  },
  careerPlans: String,

  medicalDisability: {
      answer: {
          type: String,
          enum: MedicalDisabilityEnum
      },
      explanation: String
  },
  applicantAgent: {
      type: String,
      enum: ApplicantAgentEnum
  },
  applicantEmail: String,
  howDidYouFindUs: String,
  interestedHobbies: String,

//   ACCOMMODATION
  companyAccommodation: {
      type: String,
      enum: CompanyAccommodationEnum
  },
  accommodationStartDate: Date,
  accommodationEndDate: Date,
  accommodationStudyWeeks: String,
  accommodationOptions: {
      type: String,
      enum: AccommodationOptionsEnum
  },
  smoke: {
      type: String,
      enum: SmokeEnum
  },
  specificDiet: {
      answer: {
          type: String,
          enum: SpecificDietEnum
      },
      diet: String
  },
  petsIssue: {
      answer: {
          type: String,
          enum: PetsIssueEnum
      },
      pets: String
  },
  foodsCantEat: {
      answer: {
          type: String,
          enum: FoodsCantEatEnum
      },
      foods: String
  },
  allergicFoodsPets: {
      answer: {
          type: String,
          enum: AllergicFoodsPetsEnum
      },
      allergies: String
  },
  sufferingMedicalCondition: {
      answer: {
          type: String,
          enum: SufferingMedicalConditionEnum
      },
      condition: String
  },
  mindInternationalFamily: {
      answer: {
          type: String,
          enum: MindInternationalFamilyEnum
      },
      familyType: String
  },
  accommodationQuestions:{
      answer: {
          type: String,
          enum: AccommmodationEnum
      },
      questions: String
  },
});

// API to add user
// API to add user
app.post("/adduser", async (req, res) => {
  let users = await User.find({});
  let id;
  if (users.length > 0) {
    let last_user_array = users.slice(-1);
    let last_user = last_user_array[0];
    id = last_user.id + 1;
  } else {
    id = 1;
  }
  const user = new User({
    id: id,
    applicationDate: req.body.applicationDate,
    image: req.body.image,
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    personalCnic: req.body.personalCnic,
    personalEmail: req.body.personalEmail,
    personalMobile: req.body.personalMobile,
    personalPhone: req.body.personalPhone,
    personalDateOfBirth: req.body.personalDateOfBirth,
    gender: req.body.gender,
    presentOccupation: req.body.presentOccupation,
    citizenshipCountry: req.body.citizenshipCountry,
    visa: req.body.visa,
    passportNumber: req.body.passportNumber,
    passportExpiry: req.body.passportExpiry,
    homeAddress: req.body.homeAddress,
    chinaAddress: req.body.chinaAddress,
    firstLanguage: req.body.firstLanguage,
    otherLanguages: req.body.otherLanguages,
    englishLevel: req.body.englishLevel,
    passedEnglishTests: req.body.passedEnglishTests,
    qualificationLevel: req.body.qualificationLevel,
    schoolInfo: req.body.schoolInfo,
    collegeInfo: req.body.collegeInfo,
    campusSite: req.body.campusSite,
    courseName: req.body.courseName,
    courseStartDate: req.body.courseStartDate,
    courseEndDate: req.body.courseEndDate,
    courseStudyWeeks: req.body.courseStudyWeeks,
    interestedField: req.body.interestedField,
    studyTime: req.body.studyTime,
    careerPlans: req.body.careerPlans,
    medicalDisability: {
      answer: req.body.medicalDisability.answer,
      explanation: req.body.medicalDisability.explanation,
    },
    applicantAgent: req.body.applicantAgent,
    applicantEmail: req.body.applicantEmail,
    howDidYouFindUs: req.body.howDidYouFindUs,
    interestedHobbies: req.body.interestedHobbies,
    companyAccommodation: req.body.companyAccommodation,
    accommodationStartDate: req.body.accommodationStartDate,
    accommodationEndDate: req.body.accommodationEndDate,
    accommodationStudyWeeks: req.body.accommodationStudyWeeks,
    accommodationOptions: req.body.accommodationOptions,
    smoke: req.body.smoke,
    specificDiet: {
      answer: req.body.specificDiet.answer,
      diet: req.body.specificDiet.diet,
    },
    petsIssue: {
      answer: req.body.petsIssue.answer,
      pets: req.body.petsIssue.pets,
    },
    foodsCantEat: {
      answer: req.body.foodsCantEat.answer,
      foods: req.body.foodsCantEat.foods,
    },
    allergicFoodsPets: {
      answer: req.body.allergicFoodsPets.answer,
      allergies: req.body.allergicFoodsPets.allergies,
    },
    sufferingMedicalCondition: {
      answer: req.body.sufferingMedicalCondition.answer,
      condition: req.body.sufferingMedicalCondition.condition,
    },
    accommodationQuestions:{
        answer: req.body.accommodationQuestions.answer,
        questions: req.body.accommodationQuestions.questions,
      },
    mindInternationalFamily: {
      answer: req.body.mindInternationalFamily.answer,
      familyType: req.body.mindInternationalFamily.familyType,
    },
  });
  console.log(user);
  await user.save();
  console.log("Saved");
  res.json({
    success: true,
    id: id,
  });
});

// Api for getting all users
app.get("/getuser", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

// Api to get a user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error : " + error);
  }
});
