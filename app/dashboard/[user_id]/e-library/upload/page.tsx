"use server";

import AdminTabContent from "@/components/e-lib/admin-tab-content";
import UploadLib from "@/components/e-lib/upload-lib";
import { isUserAdmin } from "@/lib/models/User";
import { getUserCookie } from "@/server/services/cookies";
// import GeneralTab from "@/components/e-lib/general-tab";

export default async function Page() {
  const user = getUserCookie()?.valueOf()!;
  const adminStatus = await isUserAdmin(user).then((data) => {
    return data?.valueOf()!;
  });
  console.log("USER: ", user);
  return <UploadLib user_id={user} adminStatus={adminStatus}></UploadLib>;
}
