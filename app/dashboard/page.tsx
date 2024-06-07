import { getUserCookie } from "@/server/services/cookies";
import { redirect } from "next/navigation";

export default async function Page()
{
    // let user_id : string
    // if(cookies().has('user_id')) user_id = cookies().get('user_id').value
    return (
        <>
            {redirect(`/dashboard/${getUserCookie()}/`)}
        </>
    )
}