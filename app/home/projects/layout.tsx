import NavBar from "./_componets/navbar";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[1300px] mx-auto mt-10">
      <NavBar />
      {children}
    </div>
  );
}
