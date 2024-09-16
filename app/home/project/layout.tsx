import NavBar from "../projects/_componets/navbar";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[1300px] h-full mx-auto mt-10">
      <NavBar/>
      {children}
    </div>
  );
}
