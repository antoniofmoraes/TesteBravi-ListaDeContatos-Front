import { EnvelopeSimple, WhatsappLogo, Phone } from "phosphor-react";

type ContatoIcon = {
  tipo: string;
  iconsSize: string;
};

export function ContatoIconComponent({ tipo, iconsSize }: ContatoIcon) {
  switch (tipo?.toLowerCase() || null) {
    case "email":
      return <EnvelopeSimple size={iconsSize} />;
    case "whatsapp":
      return <WhatsappLogo size={iconsSize} />;
    case "telefone":
      return <Phone size={iconsSize} />;
    default:
      return null;
  }
}
