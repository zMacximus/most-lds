import { PencilIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { trainingListData } from "@/lib/definitions";
import { TrainingType } from "@/lib/models/Training";

export default function CourseItem({ dbData }: { dbData: TrainingType[] }) {
  // const pathName = usePathname();
  if (dbData === undefined)
    return <h1 className='text-5xl'>LOAD SOME DATA LMAO</h1>;
  return (
    <>
      {dbData.map((data) => {
        return (
          <>
            <div
              key={data.id}
              className='flex flex-row border-solid border-1 border-gray-400 rounded-full'
            >
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.code}
                {/* <Image src={placeholderMan} width={70} height={70} alt="" className="rounded-full border-solid border- border-pink-600"></Image> */}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.title}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.modality}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <StatusBadge status={Boolean(data.status)}></StatusBadge>
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                {data.currentPopulation}/{data.maxPopulation}
              </div>
              <div className='p-2 flex flex-1 justify-center items-center border-dashed border- border-red-600'>
                <div className='flex flex-row'>
                  <Link href=''>
                    <PencilIcon width={30}></PencilIcon>
                  </Link>
                  {/* <div className="px-2"></div>
                                <Link href=""><PlusCircleIcon width={30}></PlusCircleIcon></Link> */}
                  {/* <div className="px-1"></div>
                                <Link href=""><TrashIcon width={30}></TrashIcon></Link> */}
                  <div className='px-2'></div>
                  <Link href=''>
                    <InformationCircleIcon width={30}></InformationCircleIcon>
                  </Link>
                </div>
              </div>
            </div>
            <div className='py-1'></div>
          </>
        );
      })}
    </>
  );
}
