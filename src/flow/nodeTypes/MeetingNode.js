/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { memo, useState } from "react";
import "antd/dist/antd.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import TimePicker from "react-time-picker";
import { Handle } from "react-flow-renderer";
import { Form, Input, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { FaMeetup } from "react-icons/fa";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const MeetingNode = ({ data, isConnectable }) => {
  const [state, setState] = useState({
    right: false,
  });

  const [actionInfo, setActionInfo] = useState();
  const [form] = Form.useForm();

  function timeChangeHandler(time, timeString) {
    console.log(time, timeString);
  }

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
        width: 350,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Form
            form={form}
            name="dynamic_form_item"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...formItemLayout.wrapperCol}
          >
            <Form.Item
              name="url"
              label="URL"
              rules={[
                {
                  required: true,
                },
                {
                  type: "url",
                  warningOnly: true,
                },
                {
                  type: "string",
                  min: 6,
                },
              ]}
            >
              <Input placeholder="Type a URL..." />
            </Form.Item>
            <Divider></Divider>

            <Form.List
              name="emails"
              rules={[
                {
                  validator: async (_, emails) => {
                    if (!emails || emails.length < 2) {
                      return Promise.reject(new Error("At least 2 email id's"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      style={{ marginTop: "20px" }}
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Emails" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid Email!",
                          },
                          {
                            required: true,
                            message: "Please input an Email!",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          type="email"
                          placeholder="email id"
                          style={{ marginLeft: "20px", maxWidth: "80%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button variant="outlined" onClick={() => add()}>
                      Add Emails
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Divider></Divider>

            <Form.Item
              name="time-picker"
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
              label="Time"
            >
              <TimePicker
                className="time"
                onChange={timeChangeHandler}
                value={new Date()}
                amPmAriaLabel="Select AM/PM"
              />
            </Form.Item>

            <Divider></Divider>

            <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
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
        id={["1, 2"]}
        type="target"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        style={{ background: "#9c27b0" }}
      />
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleDrawer(anchor, true)}
            startIcon={<FaMeetup></FaMeetup>}
          >
            Meeting
          </Button>

          {actionInfo && (
            <div style={{ borderStyle: "solid", padding: "1rem" }}>
              URL:
              <p>{actionInfo.url}</p>
              Attendance:
              <p>{actionInfo.emails.length}</p>
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
        style={{ background: "#9c27b0" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(MeetingNode);
