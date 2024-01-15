import React, { KeyboardEventHandler } from "react";
import { OtpInputProps } from "../../interface/common/common";

const OtpInput = ({
  id,
  previousId,
  nextId,
  value,
  onValueChange,
  handleSubmit,
}: OtpInputProps) => {
  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 8 || e.keyCode === 37) {
      if (previousId) {
        const prev = document.getElementById(
          previousId
        ) as HTMLInputElement | null;
        if (prev) {
          prev.select();
        }
      }
    } else if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      e.keyCode === 39
    ) {
      if (nextId) {
        const next = document.getElementById(nextId) as HTMLInputElement | null;
        if (next) next.select();
      }
    } else {
      const inputGroup = document.getElementById("OTPInputGroup");
      if (inputGroup && inputGroup.dataset["autosubmit"]) {
        handleSubmit();
      }
    }
  };

  return (
    <div>
      <input
        name={id}
        id={id}
        value={value}
        maxLength={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange(id, e.target.value)
        }
        onKeyUp={handleKeyUp}
        className="w-12 h-12 rounded-md text-center font-bold text-lg"
        type="number"
      />
    </div>
  );
};

export default OtpInput;
