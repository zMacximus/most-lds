import {
  CheckCircleIcon,
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const STATUS_TEXT = ["Denied", "For Review", "Approved"];

const TEXT_COLOR = ["text-danger-500", "text-warning", "text-primary"];

const STATUS_COLOR = ["bg-red-200/50", "bg-warning/20", "bg-primary-200"];

const STATUS_ICON = [XCircleIcon, EyeIcon, CheckCircleIcon];

export default function FormStatusBadge({ status }: { status: number }) {
  const Icon = STATUS_ICON[status];

  return (
    <div
      className={`${STATUS_COLOR[status]} rounded-full flex flex-row px-1 py-1 w-[150px] ${TEXT_COLOR[status]} justify-between items-center`}
    >
      <p className='ml-1'>{STATUS_TEXT[status]}</p>
      <div className='mx-2'></div>
      <Icon width={"1.5em"} />
    </div>
  );
}
