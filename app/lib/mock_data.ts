import { SchedulerData } from "@bitnoi.se/react-scheduler";
import placeholderMan from "../../public/placeholder/Placeholder-Man.jpg";

export const SCHEDULER_DATA: SchedulerData = [
  {
    id: "id",
    label: {
      icon: "",
      title: "title",
      subtitle: "subtitle",
    },
    data: [
      {
        id: "title+id",
        startDate: new Date("2024-07-28T10:30:00.000Z"),
        endDate: new Date("2024-07-30T12:00:00.000Z"),
        occupancy: 3600,
        title: "title",
        subtitle: "subtitle",
        description: "description",
        bgColor: "rgb(255, 182, 0)",
      },
    ],
  },
];
