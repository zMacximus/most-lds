import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const state_text = { open: "Open", closed: "Closed" };
const state_color = { open: "bg-green-500", closed: "bg-red-600" };
const state_icon = { open: CheckCircleIcon, closed: XCircleIcon };

export default function StatusBadge({ Open }: { Open: boolean }) {
    const status = Open ? "open" : "closed";
    const STATUS_TEXT = state_text[status];
    const STATUS_COLOR = state_color[status];
    const STATUS_ICON = state_icon[status];

    return (
        <div className={`${STATUS_COLOR} rounded-full flex flex-row px-1 py-1 text-white justify-between items-center`}>
            <p>{STATUS_TEXT}</p>
            <div className="px-2"></div>
            <STATUS_ICON width={"1.5em"} color="white" />
        </div>
    );
}
