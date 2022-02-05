import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Layout, Menu, Row, Col, Modal, Select } from "antd";
import { Button } from "react-bootstrap";
import Buycover from "../buycover/Buycover";
import PolicyHolderForm from "./../policyholderform/PolicyHolderForm";
import ClaimAccessForm from "./../claimaccess/ClaimAccessForm";
import Swap from "./../swap/swap";
import Claims from "../claims/Claims";

import "antd/dist/antd.css";
import "./dashboard.css";
import ClaimDetails from "../claimDetails/claimDetails";

import { useWallet } from "./../wallet/useWallet";
//import { defaultAccounts } from "ethereum-waffle";
const { Option } = Select;
const { Header, Content, Sider } = Layout;
//const { SubMenu } = Menu;

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { accounts, connectWallet, trimWalletAddress, walletConnected, disconnectWallet, network } = useWallet()
  const tokenName = "ITKN";
  const tokenNum = 0;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout hasSider>
      <Sider
        //collapsible
        className="ta-Sider"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">MedBeema</div>
        <Menu className="ta-menu" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Buy Cover
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link
              to="/profileInfo"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Profile Info
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link
              to="/claimaccess"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Claim Access
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link
              to="/swap"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Swap
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link
              to="/claims"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Claims
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link
              to="/claimDetails"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              Claim Details
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        className="site-layout"
        style={{ marginLeft: 200, backgroundColor: "#f8f9fa" }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "fixed",
            zIndex: 999,
            width: "100%",
            //color: "white",
            background: "rgb(249, 251, 253)",
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
          }}
        >
          {isWalletConnected && (
            // <div
            //   style={{
            //     display: "flex",
            //     justifyContent: "flex-end",
            //     alignItems: "center",
            //   }}
            // >
            <Row>
              <Col span={8} offset={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      {tokenNum}
                    </span>
                    <Select
                      defaultValue={tokenName}
                      bordered={false}
                      style={{
                        width: 80,
                        fontSize: "20px",
                        marginRight: "5px",
                      }}
                    >
                      <Option value={tokenName} style={{ fontSize: "20px" }}>
                        {tokenName}
                      </Option>
                      <Option value="ETH" style={{ fontSize: "20px" }}>
                        ETH
                      </Option>
                    </Select>
                  </div>
                  <Button
                    variant="danger"
                    className="pl-20 pr-20 ml-20"
                    style={{
                      fontSize: "20px",
                      borderRadius: "10px",
                      margin: "auto 10px",
                    }}
                  >
                    Ropsten
                  </Button>
                  <Button
                    variant="outline-success"
                    className="pl-20 pr-20 ml-20"
                    style={{
                      fontSize: "20px",
                      borderRadius: "20px",
                      margin: "auto 10px",
                    }}
                  >
                    0x54...5464
                  </Button>
                </div>
              </Col>
            </Row>
            // </div>
          )}
          {!isWalletConnected && (
          <Row>
            <Col span={6} offset={18}>
              <Button type="primary" onClick={walletConnected? disconnectWallet : showModal}>
              {walletConnected? trimWalletAddress(accounts): 'Connect'}
              </Button>
              <Modal
                title="Select a Wallet"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ background: "#002b49" }}
                footer={[]}
              >
                <p style={{ fontsize: "20px" }}>
                  Please select a wallet to connect to this dapp:
                </p>
                <button onClick={()=> walletConnected ? disconnectWallet() : connectWallet()} 
                  style={{
                    width: 150,
                    background: "#002b49",
                    color: "white",
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAMAAACl6XjsAAABfVBMVEVHcEx/Rh2ARx2ESiLwiCLMu67cfCagZDOddlJ+Rx7pgiPlfyPshSN/Rxx+Rh2CSB6ASB2JTR7gkkl1SCbQciPUwLLMu6+BSB5/Rx2DSR5+RxzefR3ogCPlfiPGuLHhfiP2jCTvhyN/Rx3nfyPfo2/lfCTIuK7kfyP2jCPkfiPuhSTFtKjogSThfCR/Rx5+Rx3lfiPeeiTDs6koIR2DSh/ifCajWx6qYCDckVOBSR7jfiTyiCOYYTXLcCKpXiHEs6fDs6fCsKYjHBwhHx8iHR0iICB1a2ZyaGIiHyCPTx7ogSTlfyTwhyOASB7ziSTngCTrgyT2jCTthCT1iyPuhCX4jSSESh5/Rx6ITR/+kSTYbyDheSLjfSPBaiPacSDdcyCvYSK0ZCGTVSPGcSblhi/ngSPqgSTdu56mXSDaeSP6jiPmfSD5jSQcGhvimFdqUj/TbSJARUsyQE6tbDLOeyzZx7nayr7hsog7Nza/raDjjUF/VTjFtKhKNCB0amRMd0DeAAAASnRSTlMAe/oOkv4TAwgrpnA9n1n9vkYfHPv+xu2r9mgN6uI4Us5ji/n9Ln7G7pO61/K35ZXYiUji5s21zMnb0/r5aMipm2UkYjSGnPy0/l1QcU4AAALOSURBVHhehdJXXxpNFAbwBYIgoICCIKhgi91ETe/9fZ3ZXui92bvp5bPnzCwzK79c+Fxws3/mOXN2BSe+0Tnh1oBKTI7eqvypSUnaHP4XDIVeRn1cucKSJIUj4wMF6cVgYDr2KsrVXE4imUx6mEmHgoH786ZZ3b3H/usZAWW7R3fsAFFNhCrVwmaKdY4ylZdaqEgjI4yxUm7mpAjvjABjbt/QIIZJ1MF+Pu+eY3MMuwEwl2sfEidiBcdaeUl6yrcEkzks38IWMBnG2gUVTrIljSco4LUNGZxRaeZASW4X63Q5hznHyTGqpAfRwU5+WKGtaxC1SQsSKb+tfOyeTHWRDEyuNGhpf7me5EBjoYowFoEZ+gFx7pH+FYaTA0qBfSG6ErI2KcxZJMxVDhSkS1sV4twuNls0wVi4CYpEJ6yHwXEmpHJ5OxJTGNHhMLjH/BP0uQp2GpTwVhHY+orAExLt9ChxWhFWprYcFihaNKLDegZt7U4FuRpbPtbssONgRNECVjm6wYJFrR+5XK/VavVa9byO4L3qpWqMl/qznGlipV46b5xdturYIK//54sND7sAR3SnlfbZxeVFFYkw3MHV9dIQv8CAQ7qlXl+1kUoO78mMsQvwXiRbh8VjEenEqat9NlvUBmLJol2v6jDe89U0Vb7sDQa7k/UjxZSp04mjpw1ewBBRuV6qVbCCRFmzNNE0rOVZP2EZE9F0u10F10qQsr1hVTQ0WTSs7KwP2NA0wjxlUHWCmJRlo5jNELdlYidQaR92RINRp1P4vfPxnSAszis3XLkMD3Gn8+P0dGHh697e3vdvJyf/f4CrLqm8xFx/+IQ+jH/+QgK/wHbek9ZZwhSkq1MbwUW/f+buRJyIfn79+e/TuGBfomfi6UBmjH3NIL19Ffd6J2YEmhX92UqGbpEHzlzzeuNxL6ht9lmG0g5w5PbrtbWJN2/HyGB/AYd1QUewqrrRAAAAAElFTkSuQmCC"
                    srcset="data:image/png;base64,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"
                    style={{ width: 30, height: 30 }}
                     alt=""
                  ></img>
                  MetaMask
                </button>
              </Modal>
            </Col>
          </Row>
          )}
        </Header>

        <Content
          style={{
            margin: "80px 16px 20px 16px",
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#f8f9fa",
            position: "relative",
          }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Routes>
            <Route
                path="/"
                element={<Buycover isWalletConnected={isWalletConnected} />}
              />
              <Route
                path="/profileInfo"
                element={
                  <PolicyHolderForm isWalletConnected={isWalletConnected} />
                }
              />
              <Route
                path="/claimaccess"
                element={
                  <ClaimAccessForm isWalletConnected={isWalletConnected} />
                }
              />
                     
              <Route
                path="/claims"
                element={<Claims isWalletConnected={isWalletConnected} />}
              > <Route path=":claimid" element={<ClaimDetails />} /> 
              </Route>
              <Route
                path="/swap"
                element={<Swap isWalletConnected={isWalletConnected} />}
              />
              <Route
                path="/claimDetails"
                element={<ClaimDetails isWalletConnected={isWalletConnected} id ={1}/>}
              />      
                    </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
