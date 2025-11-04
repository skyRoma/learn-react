import { createContext, useContext, useState } from "react"
import { AccordionItem } from "./AccordionItem";
import { AccordionTitle } from "./AccordionTitle";
import { AccordionContent } from "./AccordionContent";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error("Accordion-related components must be wrapped by <Accordion>.");
  }

  return ctx;
}

export function Accordion({ children, className }) {
  const [openedItemId, setOpenedItemId] = useState(null);

  function toggleItem(id) {
    setOpenedItemId(prevState => prevState === id ? null : id);
  }

  const contextValue = {
    openedItemId,
    toggleItem
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  )
}


Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
