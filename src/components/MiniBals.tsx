import { contextData } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { FaChartSimple } from 'react-icons/fa6';
import { GiWallet } from 'react-icons/gi';
import { PiChartDonutFill } from 'react-icons/pi';
import { RiWalletFill } from 'react-icons/ri';
import { apiGet } from '@/utils/api';

export default function MiniBals() {
  const [trades, setTrades] = useState([]);
  const { user } = contextData();

  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Function to fetch trades
  const fetchTrades = async () => {
    try {
      const res = await apiGet(`${url}/trades`);
      const data = await res.json();

      if (res.ok) {
        const filteredTrades = data.filter(
          (trade: any) => new Date(trade.date) > new Date(user.createdAt),
        );

        setTrades(filteredTrades);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  // Fetch trades on component mount
  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <div className="flex items-center justify-between gap-2 p-3 text-right rounded-xl bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
        <GiWallet className="text-[40px] text-brandblue flex-shrink-0" />

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
            Deposit
          </p>
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {user?.deposit?.toLocaleString('en-US')}
            <span className="font-mono font-normal text-base ml-1">$</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 text-right rounded-xl bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
        <RiWalletFill className="text-[40px] text-brandblue flex-shrink-0" />

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
            Withdrawal
          </p>

          <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {user?.withdraw?.toLocaleString('en-US')}
            <span className="font-mono font-normal text-base ml-1">$</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 text-right rounded-xl bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
        <FaChartSimple className="text-[40px] text-brandblue flex-shrink-0" />

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
            Interest
          </p>
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {user?.interest?.toLocaleString('en-US')}
            <span className="font-mono font-normal text-base ml-1">$</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 text-right rounded-xl bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
        <PiChartDonutFill className="text-[40px] text-brandblue flex-shrink-0" />

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
            Trades
          </p>
          <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {trades.length || '0'}
          </h2>
        </div>
      </div>
    </div>
  );
}
