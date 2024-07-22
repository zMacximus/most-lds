"use server";
import { DataTypes, Op } from "sequelize";
import db from "@/lib/sequelize";
import { dropAllSubTopics, getAllSubTopics, SubTopicType } from "./SubTopic";
import { TopicFormInput } from "../definitions";

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
        // unique: "topicTitle",
      },
      createdBy: {
        type: DataTypes.STRING(),
        allowNull: false,
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
  createdBy: string;
};

export async function dropTopic(categoryName: string, topicId: number) {
  const CategoryTopics = await DefineMainTopicDB(categoryName);

  await dropAllSubTopics(topicId);

  CategoryTopics.destroy({
    where: {
      id: topicId,
    },
  });
}

export async function updateTopic(
  categoryName: string,
  topicId: number,
  data: TopicFormInput
) {
  try {
    const CategoryTopics = await DefineMainTopicDB(categoryName);

    await CategoryTopics.update(
      { topicTitle: data.topicTitle },
      { where: { id: topicId } }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
  }
}

export async function getAllTopics(categoryName: string) {
  try {
    const CategoryTopics = await DefineMainTopicDB(categoryName);

    const dataArray = await CategoryTopics.findAll({
      order: [["topicTitle", "ASC"]],
    });

    const topics: TopicType[] = dataArray.map((data) => ({
      id: data.getDataValue("id"),
      topicTitle: data.getDataValue("topicTitle"),
      createdBy: data.getDataValue("createdBy"),
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
