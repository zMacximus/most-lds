// import Link from "next/link";
import SideNav from "ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode })
{
  return (
    
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64">
      <SideNav />
      {/* <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <p className="text-3xl font-bold underline">DASHBOARD LAYOUT</p>
          <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
          href="/"></Link>
        <p className="text-3xl font-bold underline">DASHBOARD LAYOUT</p>
      </div> */}
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
  );
}