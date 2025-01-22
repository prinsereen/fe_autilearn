import MasterLayout from "@/masterLayout/MasterLayout";
import Quiz from "@/components/child/Quiz";

export const metadata = {
  title: "Quiz Interaksi",
  description:
    "Quiz Interaksi",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* CardLayer */}
        <Quiz/>
      </MasterLayout>
    </>
  );
};

export default Page;
