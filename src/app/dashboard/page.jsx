'use client'

import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerSix from "@/components/DashBoardLayerSix";
import DashBoardLayerThree from "@/components/DashBoardLayerThree";
import MasterLayout from "@/masterLayout/MasterLayout";
import { useEffect, useState } from "react";

const Page = () => {
  const [role, setRole] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout >
        {/* Breadcrumb */}
        <Breadcrumb title='LMS / Learning System' />

        {/* DashBoardLayerSix */}
        {role === "teacher" ? <DashBoardLayerSix /> : <DashBoardLayerThree /> }
      </MasterLayout>
    </>
  );
};

export default Page;
