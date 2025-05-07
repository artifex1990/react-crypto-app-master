import { Layout, Spin } from "antd";
import AppHeader from "../../components/layout/AppHeader";
import AppSider from "../../components/layout/AppSider";
import AppContent from "../../components/layout/AppContent";
import { useCrypto } from "../../context/CryptoContext";

export default function AppLayout() {
  const { loading } = useCrypto();

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
