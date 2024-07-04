import { Suspense, useEffect, useState } from "react";
import {
  BookOpenIcon,
  FilmIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { Accordion, AccordionItem, Skeleton } from "@nextui-org/react";
import { getAllTopics, TopicType } from "@/lib/models/MainTopic";
import { getAllSubTopics, SubTopicType } from "@/lib/models/SubTopic";

export default function TabContent({ categoryName }: { categoryName: string }) {
  const [topicData, setTopicData] = useState<TopicType[]>([]);
  const [subTopicData, setSubTopicData] = useState<SubTopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const topics = await getAllTopics(categoryName);
        const subTopics = await Promise.all(
          topics.map((topic) => getAllSubTopics(categoryName, topic.id))
        );

        const subTopicsWithMainTopicId = subTopics.flat().map((subTopic) => ({
          ...subTopic,
          mainTopicId: subTopic.mainTopicId,
        }));

        setTopicData(topics);
        setSubTopicData(subTopicsWithMainTopicId);
      } catch (error) {
        console.error("Error fetching topics and subtopics:", error);
        // }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryName]);

  const getSubTopicsForMainTopic = (mainTopicId: number) =>
    subTopicData.filter((subTopic) => subTopic.mainTopicId === mainTopicId);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='flex flex-col w-full min-h-[calc(100vh*0.78)] max-h-max justify-start items-center bg-white rounded-3xl drop-shadow-md'>
      {/* <Skeleton
        isLoaded={!loading}
        className='flex flex-col w-full h-auto relative p-5'
      > */}
      <div className='flex flex-col w-full h-auto relative p-5 border- border-solid border-red-600'>
        {/* <div className='flex flex-row justify-end items-end'>
            <ModalFormButton buttonName={"New Topic"} buttonSize='sm'>
              <NewTopicForm categoryName={categoryName} />
            </ModalFormButton>
          </div> */}
        {topicData.length === 0 ? (
          <div className='flex flex-row h-full w-full justify-center items-center'>
            ERROR 404
          </div>
        ) : (
          <Accordion selectionMode='single' className='text-2xl'>
            {topicData.map((mainTopic_data) => (
              <AccordionItem
                key={`${mainTopic_data.id}_${categoryName}`}
                title={mainTopic_data.topicTitle}
                startContent={<FolderIcon width={"25px"} />}
              >
                <div className='flex flex-row p-2 justify-center items-center'>
                  {getSubTopicsForMainTopic(mainTopic_data.id).length === 0 ? (
                    <div className='flex flex-row w-full h-auto justify-center items-center'>
                      No Content Available.
                    </div>
                  ) : (
                    <Accordion
                      selectionMode='single'
                      isCompact
                      variant='bordered'
                    >
                      {getSubTopicsForMainTopic(mainTopic_data.id).map(
                        (data) => (
                          <AccordionItem
                            key={`${data.id}_${data.mainTopicId}_${categoryName}`}
                            title={data.subTopicTitle}
                            startContent={
                              data.typeOfContent === 0 ? (
                                <BookOpenIcon width={"25px"} />
                              ) : (
                                <FilmIcon width={"25px"} />
                              )
                            }
                          >
                            <div className='flex flex-col mb-2.5 justify-center items-center overflow-hidden pb-[56.25%] pt-[25px] h-0 relative'>
                              <iframe
                                src={data.url}
                                width={
                                  data.typeOfContent === 0 ? "800" : "1120"
                                }
                                height={
                                  data.typeOfContent === 0 ? "500" : "630"
                                }
                                allowFullScreen
                                className='w-full h-full absolute top-0 left-0'
                                title={data.subTopicTitle}
                              />
                            </div>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  )}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      {/* </Skeleton> */}
    </div>
  );
}