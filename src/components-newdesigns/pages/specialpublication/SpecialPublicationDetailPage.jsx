import React from "react";
import SpecialPublicationDetailView from "../../components/specialpublication/SpecialPublicationDetailView";
import { VisuallyHidden } from "../../layout/Header/Header.styles";

export default function SpecialPublicationDetailPage() {
  return (
    <main>
      <VisuallyHidden>Special Publication</VisuallyHidden>
      <SpecialPublicationDetailView />
    </main>
  );
}
