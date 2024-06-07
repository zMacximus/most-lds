import UserInfo from "@/components/user-info";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";


export default async function HomePage() {
  const authSession = await getServerAuthSession(); //(1) 

  return (  
  <main className="flex items-center justify-center h-screen">
    {authSession?.user && <UserInfo user={authSession?.user} />}
    {!authSession?.user && (
        `${redirect('/login')}`
    )}
  </main>
  );
}