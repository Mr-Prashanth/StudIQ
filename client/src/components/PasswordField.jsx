import React from 'react';

const PasswordField = ({ password, onChange, showPassword, togglePassword }) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={password}
      onChange={onChange}
      placeholder="Password"
      className="w-full px-4 py-2 border rounded-md outline-[#1d4ed8] font-roboto pr-12"
      required
    />
    <span
      className="absolute right-3 top-2 text-sm text-[#1d4ed8] cursor-pointer select-none"
      onClick={togglePassword}
    >
      {showPassword ? "Hide" : "Show"}
    </span>
  </div>
);

export default PasswordField;
