import MainHeader from '../components/MainHeader';
import CalendarWidget from '../components/CalendarWidget';
import PerformanceChart from '../components/PerformanceChart';
import OutlookMessages from '../components/OutlookMessages';
import ChatWithAIButton from '../components/ChatWithAIButton'; // ✅ Import new component

const Main = () => {
  return (
    <div className="bg-white pt-[120px] px-6 text-black min-h-screen ml-40 mr-40">
      <MainHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PerformanceChart />
          <OutlookMessages />
        </div>

        <div className="space-y-4"> {/* Right column */}
          <CalendarWidget />
          <ChatWithAIButton /> {/* ✅ Button below calendar */}
        </div>
      </div>
    </div>
  );
};

export default Main;
