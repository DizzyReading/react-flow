/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import "antd/dist/antd.css";
import TimePicker from "react-time-picker";
import { Handle } from "react-flow-renderer";
import { Form, Input, message } from "antd";
import { FiMail } from "react-icons/fi";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const EmailNode = ({ isConnectable }) => {
  const [state, setState] = useState({
    right: false,
  });

  const [actionInfo, setActionInfo] = useState();
  const [form] = Form.useForm();

  function timeChangeHandler(time, timeString) {
    console.log(time, timeString);
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      to: "${label} is not a valid email!",
      from: "${label} is not a valid number!",
    },
  };

  const onFinish = (values) => {
    const revisedValues = {
      ...values,
      time: values["time-picker"],
    };

    // console.log("FormValues:", { values });
    console.log("Received values of form: ", revisedValues);
    setActionInfo(revisedValues);
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Form
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="receiver"
              style={{ marginBottom: "5px" }}
              label="To"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input bordered={false} placeholder="jane98@google.com" />
            </Form.Item>
            <Divider></Divider>
            <Form.Item
              name="sender"
              style={{ marginBottom: "5px" }}
              label="From"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input bordered={false} placeholder="joe98@google.com" />
            </Form.Item>
            <Divider></Divider>
            <Form.Item
              style={{ marginBottom: "5px" }}
              label="Subject"
              rules={[
                {
                  type: "subject",
                  required: true,
                },
              ]}
            >
              <Input bordered={false} />
            </Form.Item>
            <Divider></Divider>
            <Form.Item name="body" style={{ marginTop: "5px" }} label="Body">
              <Input.TextArea
                bordered={false}
                autoSize={{ minRows: 5, maxRows: 10 }}
              />
            </Form.Item>
            <Divider></Divider>
            <Form.Item
              name="time-picker"
              style={{ marginTop: "10px" }}
              label="Time"
            >
              <TimePicker onChange={timeChangeHandler} value={new Date()} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button variant="contained" type="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Handle
        type="target"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            onClick={toggleDrawer(anchor, true)}
            color="orange"
            startIcon={<FiMail></FiMail>}
          >
            Email
          </Button>

          {actionInfo && (
            <div style={{ borderStyle: "solid", padding: "1rem" }}>
              To:
              <p>{actionInfo.receiver}</p>
              From:
              <p>{actionInfo.sender}</p>
              Body:
              <p style={{ wordBreak: "break-all" }}>
                {actionInfo.body?.slice(0, 20)}...
              </p>
              Sent:
              <span>{actionInfo.time}</span>
            </div>
          )}
          <Drawer
            sx={{ width: 400 }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(EmailNode);
