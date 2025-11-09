import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertHistory, setAlertHistory] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);

  const triggerAlert = (alertData) => {
    setIsAlertActive(true);
    setCurrentAlert(alertData);
    setAlertHistory((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        timestamp: new Date(), 
        status: "sent", 
        ...alertData 
      },
    ]);
  };

  const cancelAlert = () => {
    setIsAlertActive(false);
    setCurrentAlert(null);
  };

  return (
    <AlertContext.Provider value={{ 
      isAlertActive, 
      triggerAlert, 
      cancelAlert, 
      alertHistory,
      currentAlert 
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);