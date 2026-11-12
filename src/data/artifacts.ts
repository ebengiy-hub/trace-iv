/*
  Artifact records for the TRACE IV prototype.
  These are SAMPLE records for a fictional "Sample Museum". Object-level details
  (attribution, period, region) describe the illustrative objects in the design;
  they are not catalogue entries of a real collection. General background
  statements are limited to widely documented archaeological knowledge.
*/

export type Category = 'Ceramics' | 'Stone' | 'Metal'

export interface Artifact {
  id: string
  name: string
  img: string
  category: Category
  material: string
  region: string
  period: string
  short: string
  note: string
  context: string[]
}

const base = import.meta.env.BASE_URL

export const MUSEUM = {
  name: 'Archaeology Museum',
  institution: 'Sample Museum',
  duration: '2 h 10 min',
}

export const ARTIFACTS: Artifact[] = [
  {
    id: 'amphora',
    name: 'Amphora',
    img: `${base}artifacts/amphora.webp`,
    category: 'Ceramics',
    material: 'Clay',
    region: 'Anatolia',
    period: 'Late Bronze Age',
    short: 'A clay vessel used for storage and transport.',
    note: 'Local production, utilitarian form',
    context: [
      'Amphorae are two-handled jars. The name comes from the Greek amphiphoreus, "carried on both sides", after the paired handles.',
      'Jars of this kind held liquids such as wine and olive oil, as well as dry goods, and were used for both storage and transport.',
      'The narrow neck could be closed with a stopper, and the handles made the full vessel easier to lift, carry and secure.',
      'The horizontal ridges visible in the surface close-up are consistent with the vessel being shaped on a potter’s wheel.',
    ],
  },
  {
    id: 'head',
    name: 'Sculpted Head',
    img: `${base}artifacts/head.webp`,
    category: 'Stone',
    material: 'Stone',
    region: 'Anatolia',
    period: 'Classical style',
    short: 'A carved stone portrait head, separated from its original statue or bust.',
    note: 'Fragment; surface weathered',
    context: [
      'Portrait heads are often all that survives of a full statue or bust, because the neck is a natural breaking point.',
      'Weathering of the surface softens carved details such as hair and eyelids over time.',
    ],
  },
  {
    id: 'coin',
    name: 'Portrait Coin',
    img: `${base}artifacts/coin.webp`,
    category: 'Metal',
    material: 'Copper alloy',
    region: 'Aegean',
    period: 'Hellenistic style',
    short: 'A struck coin showing a profile portrait.',
    note: 'Obverse shown; legend partly worn',
    context: [
      'Ancient coins were struck between two engraved dies, which is why the design stands in relief.',
      'Profile portraits on coins identified rulers or deities and spread their image across a wide region.',
    ],
  },
  {
    id: 'figurine',
    name: 'Seated Figurine',
    img: `${base}artifacts/figurine.webp`,
    category: 'Stone',
    material: 'Stone',
    region: 'Anatolia',
    period: 'Bronze Age',
    short: 'A small seated human figure with simplified features.',
    note: 'Hand-sized; votive or domestic use',
    context: [
      'Small figurines are among the most common finds at ancient settlements and sanctuaries.',
      'Their exact purpose is often debated; suggested uses include offerings, household ritual and personal keepsakes.',
    ],
  },
  {
    id: 'bowl',
    name: 'Relief Bowl',
    img: `${base}artifacts/bowl.webp`,
    category: 'Ceramics',
    material: 'Fired clay',
    region: 'Aegean',
    period: 'Hellenistic style',
    short: 'A footed drinking bowl with a band of moulded decoration.',
    note: 'Decorated frieze below the rim',
    context: [
      'Relief decoration on bowls like this was commonly produced by pressing clay into a decorated mould.',
      'Footed bowls were used for drinking and serving at the table.',
    ],
  },
  {
    id: 'relief',
    name: 'Animal Relief',
    img: `${base}artifacts/relief.webp`,
    category: 'Stone',
    material: 'Stone',
    region: 'Anatolia',
    period: 'Iron Age style',
    short: 'A carved plaque with a striding animal framed by a raised border.',
    note: 'Low relief; framed panel',
    context: [
      'In low relief the figure is carved only slightly above the background, so it reads best in raking light.',
      'Animal motifs are a recurring theme in Anatolian and Near Eastern relief carving.',
    ],
  },
  {
    id: 'bracelet',
    name: 'Bracelet',
    img: `${base}artifacts/bracelet.webp`,
    category: 'Metal',
    material: 'Copper alloy',
    region: 'Anatolia',
    period: 'Iron Age style',
    short: 'An open bracelet with knobbed terminals.',
    note: 'Penannular form; worn surface',
    context: [
      'An open, "penannular" ring could be flexed slightly to slip it onto the wrist.',
      'Copper-alloy objects develop a green or brown corrosion layer when buried.',
    ],
  },
]

export const byId = (id: string) => ARTIFACTS.find((a) => a.id === id)!
