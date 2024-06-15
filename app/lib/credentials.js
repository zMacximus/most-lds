import User from "./models/User";
import db from "./sequelize";

export async function populateTestData() {
  db;
  try {
    // await User.drop();
    // await User.create({
    //   username: "daPiang",
    //   password: "most2024",
    //   admin: true,
    //   firstName: "Datu Anuarudin",
    //   lastName: "Piang",
    //   department: "MIS",
    //   title: "Intern",
    //   address: "Cotabato City",
    //   religion: "Islam",
    //   birthDay: new Date(2001, 9, 20),
    //   joinDate: new Date(2024, 4, 6),
    // });

    await User.create({
      username: "seLim",
      password: "most2024",
      admin: false,
      firstName: "Steven",
      lastName: "Lim",
      department: "MIS",
      title: "Intern",
      address: "Davao City",
      religion: "Catholic",
      birthDay: new Date(2003, 6, 14),
      joinDate: new Date(2024, 4, 6),
    });

    console.log("Successfully populated database with test data!");
  } catch (error) {
    console.error("Failed to populate database with test data.", error);
  }
}
