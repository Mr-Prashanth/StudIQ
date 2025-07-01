import React from 'react';
import PasswordField from './PasswordField';

const AuthForm = ({
  formData,
  handleInputChange,
  showSignUp,
  showPassword,
  togglePassword,
  handleSubmit,
  loading,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    {showSignUp && (
      <>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md outline-[#1d4ed8] font-roboto"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          className="w-full px-4 py-2 border rounded-md outline-[#1d4ed8] font-roboto"
          required
        />
      </>
    )}
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Email"
      className="w-full px-4 py-2 border rounded-md outline-[#1d4ed8] font-roboto"
      required
    />
    <PasswordField
      password={formData.password}
      onChange={handleInputChange}
      showPassword={showPassword}
      togglePassword={togglePassword}
    />
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-[#1d4ed8] text-white py-2 rounded-full hover:bg-blue-800 transition font-semibold font-roboto flex justify-center items-center"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : (
        showSignUp ? "Sign Up" : "Login"
      )}
    </button>
  </form>
);

export default AuthForm;
