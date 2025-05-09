import { Button, Layout, Modal, Select, Space, Drawer } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  with: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };

    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  });

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <>
      <Layout.Header style={headerStyle}>
        <Select
          onSelect={handleSelect}
          onClick={() => setSelect((prev) => !prev)}
          open={select}
          style={{ width: "250px" }}
          value="press / to open"
          options={crypto.map((c) => ({
            value: c.id,
            label: c.name,
            icon: c.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: "20px" }}
                src={option.data.icon}
                alt={option.data.label}
              />
              {option.data.label}
            </Space>
          )}
        />
        <Button type="primary" onClick={() => setDrawer(true)}>
          Add Asset
        </Button>
        <Modal
          closable={{ "aria-label": "Custom Close Button" }}
          open={modal}
          onCancel={() => setModal(false)}
          footer={null}
        >
          <CoinInfoModal coin={coin} />
        </Modal>
        <Drawer
          title="Add Asset"
          closable={{ "aria-label": "Close Button" }}
          onClose={() => setDrawer(false)}
          open={drawer}
          destroyOnClose
          width="600px"
        >
          <AddAssetForm onClose={() => setDrawer(false)} />
        </Drawer>
      </Layout.Header>
    </>
  );
}
