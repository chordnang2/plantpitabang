import DashboardBoxes from "./Item/DashboardBoxes";
import SalesStats from "./Item/SalesStats";
import TopSellingProducts from "./Item/TopSellingProducts";
import WelcomeRow from "./Item/WelcomeRow";

export default function Dashboard() {
  return (
    <>
      {/* <WelcomeRow /> */}
      <div className="md:flex gap-10">
        {/* <div className="md:w-8/12 grow">
          <DashboardBoxes />
          <SalesStats />
        </div>
        <div className="md:w-4/12 grow">
          <TopSellingProducts />
        </div> */}
      </div>
    </>
  );
}