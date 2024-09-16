"use client";

import { UseCurrentUser } from "@/features/auth/api/use-current-user";
import { useParams } from "next/navigation";
import SideBarUserAvatar from "../_components/side-bar-avatar";
import NavBar from "../_components/navbar";
import ProfileDashBoard from "@/features/auth/components/profile-dashboard";

const ProfilePage = () => {
  const { data, isLoading } = UseCurrentUser();
  const params = useParams();
  console.log(params);
  return (
    <div className="flex items-start mt-10 h-full">
      <SideBarUserAvatar />
      <div>
        <NavBar />
        <ProfileDashBoard />
      </div>
    </div>
  );
};

export default ProfilePage;
