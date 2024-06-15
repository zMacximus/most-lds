import CourseItem from "@/components/trainings/course-item";
import Training from "@/lib/models/Training";
import { Op } from "sequelize";
import TrainingTable from "@/components/trainings/training-table";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const dbData = await Training.findAll({
    where: {
      [Op.or]: [
        { code: { [Op.like]: `%${query}%` } },
        { title: { [Op.like]: `%${query}%` } },
        { modality: { [Op.like]: `%${query}%` } },
        { status: { [Op.like]: `%${query}%` } },
        { currentPopulation: { [Op.like]: `%${query}%` } },
        { maxPopulation: { [Op.like]: `%${query}%` } },
      ],
    },
  })
    .then((data) => {
      // Format the data for readability
      return data.map((training) => ({
        id: training.getDataValue("id"),
        code: training.getDataValue("code"),
        title: training.getDataValue("title"),
        modality: training.getDataValue("modality"),
        currentPopulation: training.getDataValue("currentPopulation"),
        maxPopulation: training.getDataValue("maxPopulation"),
        instructor: training.getDataValue("instructor"),
        status: training.getDataValue("status"),
      }));
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      return [];
    });

  function getDataForPage(pageNumber: number, data: any[]) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    return data.slice(startIndex, endIndex);
  }
  const headers = ["Code", "Title", "Modality", "Status", "Members", "Action"];

  return (
    <TrainingTable
      tableHeaders={headers}
      dbData={dbData}
      currentPage={currentPage}
    >
      <CourseItem dbData={getDataForPage(currentPage, dbData)}></CourseItem>
    </TrainingTable>
  );
}
