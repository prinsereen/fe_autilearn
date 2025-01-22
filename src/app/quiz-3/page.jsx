import MasterLayout from "@/masterLayout/MasterLayout";
import QuizSecond from "@/components/child/QuizSecond";

export const metadata = {
  title: "Quiz Lingkungan",
  description:
    "Quiz Lingkungan",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* CardLayer */}
        <QuizSecond/>
      </MasterLayout>
    </>
  );
};

export default Page;
