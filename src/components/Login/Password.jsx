import React, { useState } from "react";
import PropTypes from "prop-types";

const INPUT_TYPE_PW = "password";
const INPUT_TYPE_TEXT = "text";

// type1 : login pw
// type2 : sign in pw
// type3 : sign in pw check
const Password = ({ type, name, data, onChange }) => {
  const [pwInputType, setPwInputType] = useState(INPUT_TYPE_PW);

  // toogle - show/hide pw
  const showPw = () => {
    if (pwInputType === INPUT_TYPE_PW) setPwInputType(INPUT_TYPE_TEXT);
    else setPwInputType(INPUT_TYPE_PW);
  };

  return (
    <div name="pw-container">
      <span>
        {type === 1 ? null : type === 2 ? "비밀번호" : "비밀번호 확인"}
      </span>
      <label>
        <input
          type={pwInputType}
          name={name}
          placeholder={type === 3 ? "비밀번호 확인" : "비밀번호"}
          value={data[name]}
          onChange={onChange}
        />
        <i onClick={showPw}>{pwInputType === INPUT_TYPE_PW ? "👀" : "🔒"} </i>
        {type == 3 ? <span>{data.pw === data[name] ? "🟢" : "🔴"}</span> : null}
      </label>
      {type === 2 ? (
        data[name].match(/[a-z]+?/) === null ||
        data[name].match(/[0-9]+?/) === null ||
        data[name].match(/[`~!@#$%^&*|\\\'\";:\/?]+?/) === null ? (
          <div id="warningPw">
            비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다.
          </div>
        ) : null
      ) : null}
    </div>
  );
};

Password.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Password;
