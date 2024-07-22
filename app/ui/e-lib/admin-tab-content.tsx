import { useEffect, useState } from "react";
import {
  BookOpenIcon,
  FilmIcon,
  FolderIcon,
  PencilIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionItem,
  Button,
  Skeleton,
  Spacer,
} from "@nextui-org/react";
import ModalFormButton from "../modal-form-button";
import NewTopicForm from "./new-topic-form";
import AccordionModalFormButton from "./accordion-modal-button";
import NewSubTopicForm from "./new-subtopic-form";
import { getAllTopics, TopicType } from "@/lib/models/MainTopic";
import { getAllSubTopics, SubTopicType } from "@/lib/models/SubTopic";
import DeleteContentForm from "./delete-content-modal";

export default function AdminTabContent({
  categoryName,
  user_id,
  adminStatus,
}: {
  categoryName: string;
  user_id: string;
  adminStatus: boolean;
}) {
  console.log("ADMIN TAB: ", user_id);
  const [topicData, setTopicData] = useState<TopicType[]>([]);
  const [subTopicData, setSubTopicData] = useState<SubTopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const topics = await getAllTopics(categoryName);
        const filteredTopics = topics.filter(
          (topic) => adminStatus || topic.createdBy === user_id
        );

        const subTopics = await Promise.all(
          filteredTopics.map((topic) => getAllSubTopics(categoryName, topic.id))
        );

        const subTopicsWithMainTopicId = subTopics.flat().map((subTopic) => ({
          ...subTopic,
          mainTopicId: subTopic.mainTopicId,
        }));

        setTopicData(filteredTopics);
        setSubTopicData(subTopicsWithMainTopicId);
      } catch (error) {
        console.error("Error fetching topics and subtopics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryName]);

  const getSubTopicsForMainTopic = (mainTopicId: number) =>
    subTopicData.filter((subTopic) => subTopic.mainTopicId === mainTopicId);

  if (loading) {
    // return <div>Loading...</div>;
    setTimeout("3000");
    return (
      <Skeleton className='flex flex-col w-full min-h-[calc(100vh*0.78)] max-h-max justify-start items-center bg-white rounded-3xl drop-shadow-md'></Skeleton>
    );
  }

  return (
    <div className='flex flex-col w-full min-h-[calc(100vh*0.78)] max-h-max justify-start items-center bg-white rounded-3xl drop-shadow-md'>
      <div className='flex flex-col w-full h-auto relative p-5 border- border-solid border-red-600'>
        <div className='flex flex-row justify-end items-end'>
          <ModalFormButton buttonName={"New Topic"} buttonSize='sm'>
            <NewTopicForm categoryName={categoryName} user_id={user_id} />
          </ModalFormButton>
        </div>
        {topicData.length === 0 ? (
          <div className='flex flex-row h-full w-full justify-center items-center'>
            ERROR 404: Content Not Found
          </div>
        ) : (
          <Accordion selectionMode='single' className='text-2xl'>
            {topicData.map((mainTopic_data) => (
              <AccordionItem
                key={`${mainTopic_data.id}_${categoryName}`}
                title={mainTopic_data.topicTitle}
                disableIndicatorAnimation
                startContent={<FolderIcon width={"25px"} />}
                indicator={
                  user_id === mainTopic_data.createdBy || adminStatus ? (
                    <div className='flex-flex-row'>
                      <AccordionModalFormButton
                        buttonIcon={"plus"}
                        buttonSize='2xl'
                      >
                        <NewSubTopicForm
                          categoryName={categoryName}
                          mainTopicId={mainTopic_data.id}
                          user_id={user_id}
                        />
                      </AccordionModalFormButton>
                      {/* <Button isIconOnly variant='light'>
                        <PencilIcon width={"25px"} />
                      </Button> */}
                      <AccordionModalFormButton
                        buttonIcon={"pencil"}
                        buttonSize='2xl'
                      >
                        <NewTopicForm
                          categoryName={categoryName}
                          user_id={user_id}
                          loadData={true}
                          dataToLoad={mainTopic_data}
                        />
                      </AccordionModalFormButton>
                      {/* <Button isIconOnly variant='light' color='danger'>
                        <TrashIcon width={"25px"} />
                      </Button> */}
                      <AccordionModalFormButton
                        buttonIcon={"trash"}
                        buttonSize='md'
                      >
                        <DeleteContentForm
                          categoryName={categoryName}
                          content_id={mainTopic_data.id}
                          user_id={user_id}
                          contentType={"topic"}
                        />
                      </AccordionModalFormButton>
                    </div>
                  ) : (
                    <div className='flex-flex-row'>
                      <Button
                        size='md'
                        isIconOnly
                        variant='light'
                        isDisabled
                        //   value={data.title}
                        // onPress={(e) => console.log(e.target.value)}
                      >
                        <PlusCircleIcon width={"25px"}></PlusCircleIcon>
                      </Button>
                      <Button isIconOnly variant='light' isDisabled>
                        <PencilIcon width={"25px"} />
                      </Button>
                      <Button
                        isIconOnly
                        variant='light'
                        color='danger'
                        isDisabled
                      >
                        <TrashIcon width={"25px"} />
                      </Button>
                    </div>
                  )
                }
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
                            disableIndicatorAnimation
                            indicator={
                              user_id === data.uploadedBy || adminStatus ? (
                                <div className='flex-flex-row'>
                                  {/* <Button
                                    isIconOnly
                                    variant='light'
                                    value={data.subTopicTitle}
                                  >
                                    <PencilIcon width={"25px"} />
                                  </Button> */}
                                  <AccordionModalFormButton
                                    buttonIcon={"pencil"}
                                    buttonSize='md'
                                  >
                                    <NewSubTopicForm
                                      categoryName={categoryName}
                                      user_id={user_id}
                                      loadData={true}
                                      dataToLoad={data}
                                      mainTopicId={mainTopic_data.id}
                                    />
                                  </AccordionModalFormButton>
                                  <AccordionModalFormButton
                                    buttonIcon={"trash"}
                                    buttonSize='md'
                                  >
                                    <DeleteContentForm
                                      categoryName={categoryName}
                                      content_id={data.id}
                                      user_id={user_id}
                                      contentType={"subtopic"}
                                    />
                                  </AccordionModalFormButton>
                                </div>
                              ) : (
                                <div className='flex-flex-row'>
                                  <Button isIconOnly variant='light' isDisabled>
                                    <PencilIcon width={"25px"} />
                                  </Button>
                                  <Button
                                    isIconOnly
                                    variant='light'
                                    color='danger'
                                    isDisabled
                                  >
                                    <TrashIcon width={"25px"} />
                                  </Button>
                                </div>
                              )
                            }
                          >
                            <div className='flex flex-col mb-2.5 justify-center items-center overflow-hidden pb-[56.25%] pt-[25px] h-0 relative'>
                              <iframe
                                src={data.url}
                                width={
                                  data.typeOfContent === 0
                                    ? "800"
                                    : data.typeOfContent === 1
                                    ? "1120"
                                    : "960"
                                }
                                height={
                                  data.typeOfContent === 0
                                    ? "500"
                                    : data.typeOfContent === 1
                                    ? "630"
                                    : "769"
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
    </div>
  );
}
