import {
  HomeIcon,
  BriefcaseIcon,
  FolderIcon,
  BuildingLibraryIcon,
  UserIcon,
  UserGroupIcon,
  CalendarIcon,
  FireIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export function getUserLinks(id: string) {
  const USER_LINKS = [
    {
      name: "Home",
      href: `/dashboard/${id}/home`,
      icon: "HomeIcon",
    },
    {
      name: "Trainings",
      href: `/dashboard/${id}/trainings`,
      icon: "BriefcaseIcon",
    },
    {
      name: "Development Plan",
      href: `/dashboard/${id}/development-plan`,
      icon: "FolderIcon",
    },
    {
      name: "MOST E-Lib",
      href: `/dashboard/${id}/e-library`,
      icon: "BuildingLibraryIcon",
    },
    {
      name: "Profile",
      href: `/dashboard/${id}/profile`,
      icon: "UserIcon",
    },
  ];

  return USER_LINKS;
}

export const icons = {
  HomeIcon: HomeIcon,
  BriefcaseIcon: BriefcaseIcon,
  Cog6ToothIcon: Cog6ToothIcon,
  FolderIcon: FolderIcon,
  BuildingLibraryIcon: BuildingLibraryIcon,
  UserIcon: UserIcon,
  UserGroupIcon: UserGroupIcon,
  CalendarIcon: CalendarIcon,

  // Add other icons as necessary
};

export function getAdminLinks(id: string) {
  const ADMIN_LINKS = [
    {
      name: "Employees List",
      href: `/dashboard/${id}/employees-list`,
      icon: "UserGroupIcon",
    },
    {
      name: "Trainings List",
      href: `/dashboard/${id}/trainings-list`,
      icon: "BriefcaseIcon",
    },
    {
      name: "Forms List",
      href: `/dashboard/${id}/forms-list`,
      icon: "FolderIcon",
    },
    {
      name: "Scheduler",
      href: `/dashboard/${id}/scheduler`,
      icon: "CalendarIcon",
    },
  ];

  return ADMIN_LINKS;
}
