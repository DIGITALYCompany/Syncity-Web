import { LegalLayout, Section } from "@/components/layout/LegalLayout";

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de Confidentialité">
      <Section num={1} title="Introduction">
        <p>SYNCITY accorde une importance primordiale à la protection de vos données personnelles. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.</p>
      </Section>
      <Section num={2} title="Données collectées">
        <p>Nous collectons :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Données d'identité :</strong> Nom, prénom, date de naissance, pièce d'identité (KYC)</li>
          <li><strong>Données de contact :</strong> Adresse email, numéro de téléphone</li>
          <li><strong>Données de géolocalisation :</strong> Position GPS lors des check-ins (avec consentement)</li>
          <li><strong>Données d'utilisation :</strong> Événements consultés, participations, interactions</li>
        </ul>
      </Section>
      <Section num={3} title="Utilisation des données">
        <p>Vos données sont utilisées pour :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Vérifier votre identité et garantir la sécurité du réseau</li>
          <li>Personnaliser votre expérience et vous suggérer des événements</li>
          <li>Valider votre présence physique aux événements</li>
          <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
        </ul>
      </Section>
      <Section num={4} title="Protection des données KYC">
        <p>Les documents d'identité sont traités par un prestataire certifié RGPD et ne sont pas stockés après validation.</p>
      </Section>
      <Section num={5} title="Partage des données">
        <p>Nous ne vendons jamais vos données personnelles. Partage uniquement avec : prestataires techniques, autorités légales, et partenaires B2B de manière anonymisée.</p>
      </Section>
      <Section num={6} title="Vos droits (RGPD)">
        <p>Vous disposez des droits suivants :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (droit à l'oubli)</li>
          <li>Droit à la portabilité de vos données</li>
          <li>Droit d'opposition et de limitation du traitement</li>
        </ul>
      </Section>
      <Section num={7} title="Cookies">
        <p>Nous utilisons des cookies essentiels et analytiques. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.</p>
      </Section>
      <Section num={8} title="Contact DPO">
        <p>Pour toute question relative à vos données : <a href="mailto:dpo@syncity.app" className="text-white hover:underline">dpo@syncity.app</a></p>
      </Section>
    </LegalLayout>
  );
}
