import { LegalLayout, Section } from "@/components/layout/LegalLayout";

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions Générales de Vente">
      <Section num={1} title="Objet">
        <p>Les présentes CGV régissent les ventes de services premium proposés par SYNCITY SAS, notamment le Sync-Pass et les options de boost d'événements.</p>
      </Section>
      <Section num={2} title="Services payants">
        <p>SYNCITY propose :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Sync-Pass :</strong> Abonnement mensuel offrant un accès prioritaire aux événements.</li>
          <li><strong>Boost d'événements :</strong> Option permettant aux organisateurs de mettre en avant leurs événements.</li>
          <li><strong>Abonnement Partenaire :</strong> Offre B2B pour les établissements.</li>
        </ul>
      </Section>
      <Section num={3} title="Prix et paiement">
        <p>Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est effectué par carte bancaire via notre prestataire sécurisé.</p>
      </Section>
      <Section num={4} title="Droit de rétractation">
        <p>Conformément à l'article L.221-18, vous disposez d'un délai de 14 jours à compter de la souscription pour exercer votre droit de rétractation.</p>
      </Section>
      <Section num={5} title="Durée et résiliation">
        <p>Les abonnements sont souscrits mensuellement et se renouvellent automatiquement. Vous pouvez résilier depuis les paramètres de votre compte.</p>
      </Section>
      <Section num={6} title="Remboursement">
        <p>En cas d'exercice du droit de rétractation dans les délais légaux, un remboursement intégral sera effectué dans 14 jours.</p>
      </Section>
      <Section num={7} title="Garanties">
        <p>SYNCITY s'engage à fournir un service conforme à sa description. En cas de dysfonctionnement majeur, un avoir ou remboursement proportionnel pourra être accordé.</p>
      </Section>
      <Section num={8} title="Litiges">
        <p>En cas de litige, les tribunaux de Lyon seront seuls compétents. Vous pouvez également recourir au médiateur de la consommation.</p>
      </Section>
      <Section num={9} title="Contact">
        <p>Pour toute question : <a href="mailto:billing@syncity.app" className="text-white hover:underline">billing@syncity.app</a></p>
      </Section>
    </LegalLayout>
  );
}
