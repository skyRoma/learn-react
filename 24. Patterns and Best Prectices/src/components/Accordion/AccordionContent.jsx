import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export function AccordionContent({ className, children }) {
  const { openedItemId } = useAccordionContext();
  const id = useAccordionItemContext();
  const isOpen = openedItemId === id;

  return (
    <div className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>
      {children}
    </div>
  )
}
