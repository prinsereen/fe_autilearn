import Breadcrumb from "@/components/Breadcrumb";
import CardLayer from "@/components/CardLayer";
import HandwritingInput from "@/components/child/HandwritingInput";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Quiz Angka dan Huruf",
  description:
    "Quiz Angka dan Huruf",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* CardLayer */}
        <HandwritingInput/>
      </MasterLayout>
    </>
  );
};

export default Page;
