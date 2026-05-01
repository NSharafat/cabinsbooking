import { createContext, useContext, useState } from "react";

const CabinsContext = createContext();

function CabinsProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState({});
  const [isEditSession, setisEditSession] = useState(false);

  return (
    <CabinsContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cabinToEdit,
        setCabinToEdit,
        isEditSession,
        setisEditSession,
      }}
    >
      {children}
    </CabinsContext.Provider>
  );
}

function UseCabins() {
  const context = useContext(CabinsContext);
  if (!context) console.log("UseCabins must be used inside CabinsAPI");

  return context;
}
export { UseCabins, CabinsProvider };
