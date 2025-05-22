import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { clear, increment, toggleDisabled } from "../store/clickSlice.js";

const CounterButton = () => {
  const count = useSelector((state) => state.click.count);
  const clickDisabled = useSelector((state) => state.click.clickDisabled);
  const dispatch = useDispatch();

  const disableButtonText = clickDisabled ? "ABLE" : "DISABLE";

  const buttons = [
    <Button
      key="click"
      onClick={() => dispatch(increment())}
      disabled={clickDisabled}
    >
      CLICK : {count}
    </Button>,
    <Button key="clear" onClick={() => dispatch(clear())}>
      CLEAR
    </Button>,
    <Button key="disable" onClick={() => dispatch(toggleDisabled())}>
      {disableButtonText}
    </Button>,
  ];

  return (
    <div>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {buttons}
      </ButtonGroup>
    </div>
  );
};

export default CounterButton;
