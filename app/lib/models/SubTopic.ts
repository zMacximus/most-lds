"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";

export async function DefineSubTopicDB() {
  const SubTopics = db.define(
    `SubTopics`,
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      subTopicTitle: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: "topicTitle",
      },
      url: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      typeOfContent: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
      mainTopicId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  SubTopics.sync();

  return SubTopics;
}

// export default SubTopics;

export type SubTopicType = {
  id: number;
  subTopicTitle: string;
  url: string;
  typeOfContent: number;
  mainTopicId: number;
};

export async function getAllSubTopics(
  categoryName: string,
  topicId: number
): Promise<SubTopicType[]> {
  try {
    console.log("CATEGORY: ", categoryName);
    console.log("TOPIC ID: ", topicId);
    const dataArray = await (
      await DefineSubTopicDB()
    ).findAll(
      {
        where: {
          mainTopicId: { [Op.like]: topicId },
          categoryName: { [Op.like]: categoryName },
        },

        // order: ["subTopicTitle", "ASC"],
      }
      //HELP
    ); // Assuming DefineSubTopicDB returns a database query object

    const subTopics: SubTopicType[] = dataArray.map((data) => ({
      id: data.getDataValue("id"),
      subTopicTitle: data.getDataValue("subTopicTitle"),
      url: data.getDataValue("url"),
      typeOfContent: data.getDataValue("typeOfContent"),
      mainTopicId: data.getDataValue("mainTopicId"),
      categoryName: data.getDataValue("categoryName"),
      order: [["subTopicTitle", "DESC"]], // This line seems incorrect; remove it if unnecessary
    }));

    return subTopics;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    throw error; // Rethrow the error to propagate it upwards
  }
}
