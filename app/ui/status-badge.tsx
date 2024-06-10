import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const state_text = { open: "Open", closed: "Closed" };
const text_color = { open: "text-primary", closed: "text-danger-500" };
const state_color = { open: "bg-primary-200", closed: "bg-red-200/50" };
const state_icon = { open: CheckCircleIcon, closed: XCircleIcon };

export default function StatusBadge({ Open }: { Open: boolean }) {
  const status = Open ? "open" : "closed";
  const STATUS_TEXT = state_text[status];
  const TEXT_COLOR = text_color[status];
  const STATUS_COLOR = state_color[status];
  const STATUS_ICON = state_icon[status];

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
