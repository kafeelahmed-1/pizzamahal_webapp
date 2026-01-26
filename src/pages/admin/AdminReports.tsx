import { useState, useMemo } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ReportCard } from '@/components/admin/ReportCard';
import { useOrdersContext } from '@/context/OrdersContext';
import { DollarSign, ShoppingCart, TrendingUp, Calendar, Menu } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

type Period = 'today' | 'weekly' | 'monthly';

const AdminReports = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('weekly');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { orders } = useOrdersContext();

  // Calculate dynamic report data based on orders
  const reportData = useMemo(() => {
    const now = new Date();
    let filteredOrders = orders;

    // Filter orders based on period
    if (activePeriod === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filteredOrders = orders.filter(order => new Date(order.createdAt) >= today);
    } else if (activePeriod === 'weekly') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
      weekStart.setHours(0, 0, 0, 0);
      filteredOrders = orders.filter(order => new Date(order.createdAt) >= weekStart);
    } else if (activePeriod === 'monthly') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredOrders = orders.filter(order => new Date(order.createdAt) >= monthStart);
    }

    // Calculate totals
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Generate chart data based on period
    let chartData: any[] = [];

    if (activePeriod === 'today') {
      // Group by hour for today
      const hourlyData: { [key: number]: { orders: number; revenue: number } } = {};
      filteredOrders.forEach(order => {
        const hour = new Date(order.createdAt).getHours();
        if (!hourlyData[hour]) {
          hourlyData[hour] = { orders: 0, revenue: 0 };
        }
        hourlyData[hour].orders += 1;
        hourlyData[hour].revenue += order.total;
      });

      chartData = Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour}:00`,
        orders: hourlyData[hour]?.orders || 0,
        revenue: hourlyData[hour]?.revenue || 0,
      }));
    } else if (activePeriod === 'weekly') {
      // Group by day for this week
      const dailyData: { [key: string]: { orders: number; revenue: number } } = {};
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      filteredOrders.forEach(order => {
        const day = dayNames[new Date(order.createdAt).getDay()];
        if (!dailyData[day]) {
          dailyData[day] = { orders: 0, revenue: 0 };
        }
        dailyData[day].orders += 1;
        dailyData[day].revenue += order.total;
      });

      chartData = dayNames.map(day => ({
        day,
        orders: dailyData[day]?.orders || 0,
        revenue: dailyData[day]?.revenue || 0,
      }));
    } else if (activePeriod === 'monthly') {
      // Group by week for this month
      const weeklyData: { [key: number]: { orders: number; revenue: number } } = {};
      filteredOrders.forEach(order => {
        const date = new Date(order.createdAt);
        const weekOfMonth = Math.ceil(date.getDate() / 7);
        if (!weeklyData[weekOfMonth]) {
          weeklyData[weekOfMonth] = { orders: 0, revenue: 0 };
        }
        weeklyData[weekOfMonth].orders += 1;
        weeklyData[weekOfMonth].revenue += order.total;
      });

      chartData = Array.from({ length: 5 }, (_, week) => ({
        week: `Week ${week + 1}`,
        orders: weeklyData[week + 1]?.orders || 0,
        revenue: weeklyData[week + 1]?.revenue || 0,
      }));
    }

    return {
      orders: totalOrders,
      revenue: totalRevenue,
      avgOrderValue,
      chartData: chartData.length > 0 ? chartData : [{ day: 'No Data', orders: 0, revenue: 0 }],
    };
  }, [orders, activePeriod]);

  const data = reportData;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-extrabold text-gradient text-shadow">
            Reports
          </h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 lg:p-8">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="hidden lg:block">
            <h1 className="font-display text-4xl font-extrabold text-gradient text-shadow">
              Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Sales analytics and performance metrics
            </p>
          </div>

          {/* Period Tabs */}
          <div className="flex rounded-lg border border-border bg-card p-1 overflow-x-auto">
            {(['today', 'weekly', 'monthly'] as Period[]).map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                  activePeriod === period
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <ReportCard
            title="Total Orders"
            value={data.orders.toString()}
            icon={ShoppingCart}
          />
          <ReportCard
            title="Total Revenue"
            value={`Rs. ${data.revenue.toLocaleString('en-US', { minimumFractionDigits: 0 })}`}
            icon={DollarSign}
          />
          <ReportCard
            title="Avg. Order Value"
            value={`Rs. ${data.avgOrderValue.toFixed(0)}`}
            icon={TrendingUp}
          />
          <ReportCard
            title="Period"
            value={activePeriod === 'today' ? 'Today' : activePeriod === 'weekly' ? 'This Week' : 'This Month'}
            subtitle={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            icon={Calendar}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Orders Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Orders Overview
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey={
                      activePeriod === 'monthly' ? 'week' :
                      activePeriod === 'today' ? 'hour' : 'day'
                    }
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Revenue Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey={
                      activePeriod === 'monthly' ? 'week' :
                      activePeriod === 'today' ? 'hour' : 'day'
                    }
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`Rs. ${value}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-6 rounded-lg border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {activePeriod === 'weekly' ? 'Daily' : activePeriod === 'monthly' ? 'Weekly' : 'Hourly'} Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Avg. Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.chartData.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {row.day || row.week || row.hour || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {row.orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      Rs. {row.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      Rs. {row.orders > 0 ? (row.revenue / row.orders).toFixed(0) : '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
