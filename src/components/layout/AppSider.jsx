import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useCrypto } from "../../context/CryptoContext";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useCrypto();

  return (
    <>
      <Layout.Sider width="25%" style={siderStyle}>
        {assets.map((asset) => (
          <Card style={{ marginBottom: "1rem" }} key={asset.id}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset amount", value: asset.amount, isPlain: true },
                // { title: "Difference", value: asset.growPercent },
              ]}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    </>
  );
}
