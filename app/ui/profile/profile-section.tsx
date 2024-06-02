interface Props {
  children?: React.ReactNode,
  sectionName?: string,
  roundedTop?: boolean,
  roundedBot?: boolean
}

export default function ProfileSection({children, sectionName, roundedTop, roundedBot}:Props) {
    return (
      <div className="flex flex-col -mt-2 -mr-2">
        <div className={`flex flex-row ${roundedTop?"rounded-t-3xl" : ""} bg-white border-dashed border- border-red-600`}>
            <p className="text-2xl py-3 px-2.5">{sectionName}</p>
        </div>
        <div className={`flex flex-col ${roundedBot?"rounded-b-3xl" : ""} bg-white`}>
            <div className="flex flex-row max-w-[100%] max-h-[auto] p-3">
                {children}
            </div>
        </div>
      </div>  
    )
  }