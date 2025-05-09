import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import PortfolioCharts from "../PortfolioCharts";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, v) => {
    acc[v.id] = v.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => acc + v, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioCharts />
      <AssetsTable />
    </Layout.Content>
  );
}
