import React from "react";
import SpecialPublicationView from "../../components/specialpublication/SpecialPublicationView";
import { VisuallyHidden } from "../../layout/Header/Header.styles";

export default function SpecialPublicationPage() {
  return (
    <main>
      <VisuallyHidden>Special Publication</VisuallyHidden>
      <SpecialPublicationView />
    </main>
  );
}
