import User from "./models/User";
import sequelize from "./sequelize";

export async function populateTestData()
{
    sequelize
    try {
        await User.create({
            username: "daPiang",
            password: "most2024",
            firstName: "Datu Anuarudin",
            lastName: "Piang",
        })
    
        console.log("Successfully populated database with test data!");
    } catch(error) {
        console.error("Failed to populate database with test data.", error);
    }
}

