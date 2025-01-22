import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import QuizLayer from "@/components/QuizLayer";

export const metadata = {
  title: "WowDash NEXT JS - Admin Dashboard Multipurpose Bootstrap 5 Template",
  description:
    "Wowdash NEXT JS is a developer-friendly, ready-to-use admin template designed for building attractive, scalable, and high-performing web applications.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Quiz' />

        <QuizLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
