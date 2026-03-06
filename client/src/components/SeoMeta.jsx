import { Helmet } from "react-helmet-async";

export default function SeoMeta() {
  return (
    <Helmet>
      <meta property="og:title" content="My Dragonlance Collection" />
      <meta
        property="og:description"
        content="Listing of Dragonlance books, comics, and D&D Modules."
      />
      <meta property="og:url" content="https://dragonlance.adalewyr.com" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://dragonlance.adalewyr.com/meta/od-image.jpg"
      />
      <meta name="twitter:title" content="My Dragonlance Collection" />
      <meta
        name="twitter:description"
        content="Listing of Dragonlance books, comics, and D&D Modules. Includes my personal collection status."
      />
      <meta
        name="twitter:image"
        content="https://dragonlance.adalewyr.com/meta/od-image.jpg"
      />
      <meta
        name="twitter:image:src"
        content="https://dragonlance.adalewyr.com/meta/od-image.jpg"
      />
      <title>Dragonlance Collection</title>
    </Helmet>
  );
}