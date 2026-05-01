import { LegalLayout, Section } from "@/components/layout/LegalLayout";

export default function CGUPage() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation">
      <Section num={1} title="Objet et acceptation">
        <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme SYNCITY, un service de mise en relation sociale géolocalisée. En accédant à notre service, vous acceptez sans réserve les présentes conditions.</p>
      </Section>
      <Section num={2} title="Description du service">
        <p>SYNCITY est une plateforme permettant aux utilisateurs vérifiés de se retrouver dans la vie réelle autour de centres d'intérêt communs. Le service comprend :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Une carte interactive des événements</li>
          <li>Un système de vérification d'identité (KYC)</li>
          <li>Un système de check-in géolocalisé</li>
          <li>Un feed de contenus authentiques</li>
        </ul>
      </Section>
      <Section num={3} title="Inscription et vérification">
        <p>Pour utiliser SYNCITY, vous devez :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Être âgé d'au moins 18 ans</li>
          <li>Fournir une pièce d'identité valide pour la vérification KYC</li>
          <li>Fournir des informations exactes et à jour</li>
          <li>Maintenir la confidentialité de vos identifiants</li>
        </ul>
      </Section>
      <Section num={4} title="Système de Strikes">
        <p>SYNCITY applique un système de modération. Tout comportement inapproprié peut entraîner des avertissements (strikes) pouvant mener à une suspension temporaire ou définitive.</p>
      </Section>
      <Section num={5} title="Propriété intellectuelle">
        <p>L'ensemble des éléments de la plateforme SYNCITY sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction non autorisée est interdite.</p>
      </Section>
      <Section num={6} title="Responsabilités">
        <p>SYNCITY s'efforce d'assurer la disponibilité et la sécurité du service mais ne peut garantir l'absence totale d'interruptions ou d'erreurs.</p>
      </Section>
      <Section num={7} title="Modification des CGU">
        <p>SYNCITY se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle par notification.</p>
      </Section>
      <Section num={8} title="Contact">
        <p>Pour toute question : <a href="mailto:contact@syncity.app" className="text-white hover:underline">contact@syncity.app</a></p>
      </Section>
    </LegalLayout>
  );
}
