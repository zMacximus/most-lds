import { DataTypes, Op } from "sequelize"
import sequelize from "@/lib/sequelize"

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(),
        allowNull: false,
    }
},
{freezeTableName: true},
);

export default User;

// export async function findUserData(username: string)
// {
//     try {
//         const user = await User.findOne({where:{username:{[Op.like]:`%${username}%`}}})
//         return user
//     }
//     catch(err) {
//         console.error('Something went wrong.', err)
//         return null;
//     }
// }

export async function findUserData(username: string) {
    try {
      sequelize
      const user = await User.findOne({
        where: {
          username: {
            [Op.like]: `%${username}%`
          },
        }
      })

      return {
        username: user?.getDataValue('username'),
        firstName: user?.getDataValue('firstName'),
        lastName: user?.getDataValue('lastName'),
      }
    } catch(err) {
      console.error("INVALID CREDS", err)
      return null;
    }
  }