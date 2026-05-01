import { LegalLayout, Section } from "@/components/layout/LegalLayout";
import Link from "next/link";

export default function MentionsPage() {
  return (
    <LegalLayout title="Mentions Légales">
      <Section num={1} title="Éditeur">
        <p><strong>SYNCITY</strong> est un produit édité par :</p>
        <p><strong>DIGITALY SAS</strong></p>
        <p>Siège social : Lyon, France</p>
        <p>Site web : <a href="https://digitaly.fr" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">https://digitaly.fr</a></p>
        <p>Contact : <a href="mailto:contact@syncity.app" className="text-white hover:underline">contact@syncity.app</a></p>
      </Section>
      <Section num={2} title="Directeur de la publication">
        <p>Le Directeur de la publication est le Président de DIGITALY SAS.</p>
      </Section>
      <Section num={3} title="Hébergement">
        <p>Le site et l'application SYNCITY sont hébergés en conformité avec les réglementations européennes en matière de protection des données.</p>
      </Section>
      <Section num={4} title="Propriété intellectuelle">
        <p>L'ensemble du contenu de SYNCITY est la propriété exclusive de DIGITALY SAS et est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.</p>
      </Section>
      <Section num={5} title="Données personnelles">
        <p>SYNCITY collecte et traite des données personnelles conformément au RGPD. Pour en savoir plus, consultez notre{" "}
          <Link href="/confidentialite" className="text-white hover:underline">Politique de confidentialité</Link>.
        </p>
      </Section>
      <Section num={6} title="Responsabilité">
        <p>DIGITALY SAS s'efforce d'assurer l'exactitude des informations diffusées via SYNCITY mais ne peut garantir l'absence d'erreurs ou d'interruptions.</p>
      </Section>
      <Section num={7} title="Droit applicable">
        <p>Les présentes mentions légales sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux de Lyon.</p>
      </Section>
      <Section num={8} title="Crédits">
        <p><strong>Conception et développement :</strong> DIGITALY SAS</p>
        <p><strong>Photographies :</strong> Unsplash.com</p>
      </Section>
    </LegalLayout>
  );
}
