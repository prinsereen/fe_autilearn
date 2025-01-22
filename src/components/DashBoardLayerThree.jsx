import RevenueReportOne from "./child/RevenueReportOne";
import CustomersStatisticsOne from "./child/CustomersStatisticsOne";
import RecentOrdersOne from "./child/RecentOrdersOne";
import TransactionsOne from "./child/TransactionsOne";
import RecentOrdersTwo from "./child/RecentOrdersTwo";
import DistributionMapsOne from "./child/DistributionMapsOne";
import TopCustomersOne from "./child/TopCustomersOne";
import TopSellingProductOne from "./child/TopSellingProductOne";
import StockReportOne from "./child/StockReportOne";

const DashBoardLayerThree = () => {
  return (
    <section className=''>
      {/* RevenueReportOne */}
      <RevenueReportOne />

      {/* CustomersStatisticsOne */}
    </section>
  );
};

export default DashBoardLayerThree;
