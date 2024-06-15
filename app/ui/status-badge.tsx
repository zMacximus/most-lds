import { statusBadgeBoolean } from "@/lib/definitions";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const state_text = { open: "Open", closed: "Closed" };
const text_color = { open: "text-primary", closed: "text-danger-500" };
const state_color = { open: "bg-primary-200", closed: "bg-red-200/50" };
const state_icon = { open: CheckCircleIcon, closed: XCircleIcon };

export default function StatusBadge({ status }: { status: boolean }) {
  const STATUS_TEXT = status ? state_text.open : state_text.closed;
  const TEXT_COLOR = status ? text_color.open : text_color.closed;
  const STATUS_COLOR = status ? state_color.open : state_color.closed;
  const STATUS_ICON = status ? state_icon.open : state_icon.closed;

  return (
    <div
      className={`${STATUS_COLOR} rounded-full flex flex-row px-1 py-1 w-[100px] ${TEXT_COLOR} justify-between items-center`}
    >
      <p>{STATUS_TEXT}</p>
      <div className='mx-2'></div>
      <STATUS_ICON width={"1.5em"} />
    </div>
  );
}
