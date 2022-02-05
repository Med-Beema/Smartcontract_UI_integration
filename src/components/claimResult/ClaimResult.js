import React from "react";
import { Card, Row, Col, Tooltip, Progress } from "antd";
import "./claimresult.css";

export default function ClaimResult() {
  return (
    <div>
      <Card style={{ width: "auto", height: "auto" }}>
        <div className="cardHeader">
          <label
            style={{
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: 450,
              color: "rgb(80, 80, 80)",
            }}
          >
            Status
          </label>
          <div className="acceptedResult">Accepted</div>
          <div className="rejectedResult">Rejected</div>
        </div>
        <Row style={{ padding: "20px 10px" }}>
          <Col span={8}>
            <Row>
              <Col sm={8}>
                <div>
                  <img
                    className="Image"
                    src="https://app.nexusmutual.io/logos/ribbon.svg"
                  ></img>
                </div>
              </Col>

              <Col sm={6}>
                <div className="coverName">medical</div>
              </Col>
            </Row>
          </Col>
          <Col span={8} className="textStyle">
            <Row>
              <Col sm={6}>Purchase :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
            <Row>
              <Col sm={6}>Expiry :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
          </Col>
          <Col span={8} className="textStyle">
            <Row>
              <Col sm={6}>Submitted :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
            <Row>
              <Col sm={6}>Amount</Col>
              <Col sm={12}>12Eth</Col>
            </Row>
          </Col>
        </Row>
        <Row className="claimAccessors">Claim Accessors</Row>
        <Row className="progressBar">
          <Tooltip title="3 done / 3 in progress / 4 to do">
            <Progress
              percent={100}
              success={{ percent: 30 }}
              strokeColor="red"
            />
          </Tooltip>
        </Row>
      </Card>
    </div>
  );
}
