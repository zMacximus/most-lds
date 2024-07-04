"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { getAllSubTopics, SubTopicType } from "./SubTopic";

export async function DefineMainTopicDB(categoryName: string) {
  const CategoryTopics = db.define(
    `Topic_${categoryName}`,
    {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      topicTitle: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: "topicTitle",
      },
    },
    { freezeTableName: true }
  );

  CategoryTopics.sync();

  return CategoryTopics;

  //   export CategoryTopics;
}

export type TopicType = {
  id: number;
  topicTitle: string;
};

export async function getAllTopics(categoryName: string) {
  try {
    const CategoryTopics = await DefineMainTopicDB(categoryName);

    const dataArray = await CategoryTopics.findAll({
      order: [["topicTitle", "ASC"]],
    });

    const topics: TopicType[] = dataArray.map((data) => ({
      id: data.getDataValue("id"),
      topicTitle: data.getDataValue("topicTitle"),
    }));

    // const topicIds = topics.map((data) => data.id);

    // let subTopics: SubTopicType[] = await getAllSubTopics(
    //   categoryName,
    //   topicIds
    // );

    // const content: { maintopics: TopicType[]; subtopics: SubTopicType[] } = {
    //   maintopics: topics,
    //   subtopics: subTopics,
    // };

    return topics;
  } catch (error) {
    console.error(
      "Something went wrong trying to access the database: ",
      error
    );
    return [];
  }
}
