import { store, money } from "../config/store";
import { createWhatsAppLink } from "../utils/whatsapp";
import { useToast } from "../hooks/StoreProvider";
import Icon from "./Icon";
export default function WhatsAppButton({ product, floating = false }) {
  const notify = useToast();
  const message = product
    ? `Hi CozyNest, I'm interested in the following product:\n\nProduct: ${product.name}\nPrice: ${money(product.price)}\n\nCould you please provide more information?`
    : undefined;
  const url = createWhatsAppLink(store.whatsappNumber, message);
  const props = {
    className: floating ? "whatsapp-float" : "button outline full",
    title: "Chat with us",
    "aria-label": floating ? "Chat with us on WhatsApp" : undefined,
  };
  const content = (
    <>
      <Icon name="whatsapp" size={floating ? 26 : 20} />
      {!floating && "Inquire on WhatsApp"}
    </>
  );
  return url ? (
    <a {...props} href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <button
      {...props}
      onClick={() =>
        notify("WhatsApp is not connected yet. Please check back soon.")
      }
    >
      {content}
    </button>
  );
}
