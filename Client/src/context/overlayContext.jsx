import React, { useState, createContext, useContext } from "react";

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [isReqViewVisible, setReqViewVisible] = useState(false);
  const [isSpinnerVisible, setSpinnerVisible] = useState(false);
  const [isEditSaveVisible, setEditSaveVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [isLogoutVisible, setLogoutVisible] = useState(false);

  const showReqView = () => {
    setReqViewVisible(true);
  };
  const showSpinner = () => {
    setSpinnerVisible(true);
  };
  const hideReqView = () => {
    setReqViewVisible(false);
  };
  const hideSpinner = () => {
    setSpinnerVisible(false);
  };
  const showEditSave = () => {
    setEditSaveVisible(true);
  };
  const hideEditSave = () => {
    setEditSaveVisible(false);
  };
  const showDelete = () => {
    setDeleteVisible(true);
  };
  const hideDelete = () => {
    setDeleteVisible(false);
  };
  const showLogout = () => {
    setLogoutVisible(true);
  };
  const hideLogout = () => {
    setLogoutVisible(false);
  };

  return (
    <OverlayContext.Provider
      value={{
        isReqViewVisible,
        showReqView,
        hideReqView,
        isSpinnerVisible,
        showSpinner,
        hideSpinner,
        isEditSaveVisible,
        showEditSave,
        hideEditSave,
        isDeleteVisible,
        showDelete,
        hideDelete,
        isLogoutVisible,
        showLogout,
        hideLogout,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  return useContext(OverlayContext);
};
