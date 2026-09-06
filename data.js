/**
 * AURELIA GRAND RESORT & SPA
 * Master Data Store & Content Architecture
 */

const RESORT_DATA = {
  general: {
    name: "AURELIA GRAND RESORT & SPA",
    tagline: "Where Luxury Meets the Art of Escape",
    rating: "Forbes 5-Star Worldwide | Condé Nast Gold List 2025",
    location: "Peninsula di Aurelia, Azure Coastline",
    phone: "+1 (800) 589-2873",
    conciergePhone: "+1 (800) 589-2875",
    email: "reservations@aureliagrandresort.com",
    conciergeEmail: "concierge@aureliagrandresort.com",
    address: "Cala di Oro 7, Private Peninsula, 84011",
    coordinates: "40°37'58.2\"N 14°22'41.6\"E"
  },

  rooms: [
    {
      id: "deluxe-garden-room",
      name: "Deluxe Azure Room",
      category: "Deluxe Rooms",
      price: 950,
      size: "68 m² / 732 sq ft",
      guests: "2 Guests",
      bed: "1 King Plush Bed",
      view: "Lush Botanical Gardens & Partial Sea",
      rating: 4.95,
      reviewsCount: 142,
      tag: "Signature Classic",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "A sanctuary of natural textures, Italian marble, and bespoke teak wood furniture. Features a private sunlit terrace overlooking private botanical gardens with glimpses of the azure sea.",
      features: [
        "Private Furnished Sun Terrace",
        "Italian Calacatta Marble Bathroom",
        "Raindance Walk-in Shower & Soaking Tub",
        "Diptyque Paris Luxury Bath Amenities",
        "Custom Tempur-Pedic Luxury Mattress",
        "Complimentary High-Speed Wi-Fi 6"
      ],
      includes: ["Daily Champagne Breakfast", "Sunset Cocktails", "Pillow Menu Selection"]
    },
    {
      id: "ocean-view-suite",
      name: "Ocean View Panorama Suite",
      category: "Ocean View Rooms",
      price: 1450,
      size: "95 m² / 1,022 sq ft",
      guests: "2-3 Guests",
      bed: "1 Super King Bed",
      view: "Unobstructed 180° Aegean Horizon",
      rating: 4.98,
      reviewsCount: 218,
      tag: "Most Popular",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Designed for dramatic ocean immersion, featuring floor-to-ceiling retractable glass walls that blur the line between indoor luxury and the infinite turquoise horizon.",
      features: [
        "Panoramic Oceanfront Daybed Terrace",
        "Freestanding Infinity Soak Stone Tub",
        "Bvlgari Haute Parfumerie Toiletries",
        "Curated In-Suite Sommelier Wine Cellar",
        "Dedicated Evening Turndown Ceremony",
        "Bespoke Sound System by Bang & Olufsen"
      ],
      includes: ["Chauffeured Airport Transfer", "Daily Gourmet Breakfast", "Complimentary Water Sports"]
    },
    {
      id: "executive-suite",
      name: "The Aurelia Executive Suite",
      category: "Executive Suites",
      price: 2100,
      size: "140 m² / 1,506 sq ft",
      guests: "3 Guests",
      bed: "1 California King + Daybed",
      view: "Panoramic Peninsula & Cliffside View",
      rating: 4.99,
      reviewsCount: 96,
      tag: "Curated Luxury",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "An expansive residential experience offering a separate grand salon, curated library, executive workspace, and a heated outdoor whirlpool cantilevered over the cliff edge.",
      features: [
        "Heated Outdoor Jacuzzi & Sun Deck",
        "Separate Salon & Dining Table for 6",
        "Private Executive Cocktail Bar with Mixologist",
        "24-Hour Dedicated Butler Service",
        "Dual Dressing Rooms & Walk-in Wardrobes",
        "Hermès Amenities & Cashmere Throws"
      ],
      includes: ["VIP Lounge Access", "Helipad Meet & Greet", "Unlimited Spa Hydrotherapy"]
    },
    {
      id: "royal-suite",
      name: "The Royal Sanctuary Suite",
      category: "Royal Suites",
      price: 3400,
      size: "210 m² / 2,260 sq ft",
      guests: "4 Guests",
      bed: "2 California King Master Bedrooms",
      view: "Complete 270° Oceanfront & Sunsets",
      rating: 5.0,
      reviewsCount: 78,
      tag: "Imperial Prestige",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Commanding the highest vantage point of the peninsula, this two-bedroom royal haven boasts a private heated plunge pool, dedicated private butler, and an outdoor fire pit pavilion.",
      features: [
        "Private Heated Plunge Pool & Fire Pit",
        "Two En-Suite Master Bedrooms with Spa Baths",
        "Grand Living Area with Grand Piano",
        "Private Dining Room with Chef Service on Demand",
        "Exclusive Sunset Terrace with Daybeds",
        "Guaranteed Table at All On-Site Restaurants"
      ],
      includes: ["Dedicated Yacht Half-Day Charter", "Dom Pérignon Welcome Vintage", "Full Butler Service"]
    },
    {
      id: "presidential-villa",
      name: "Villa Aurelia Imperial",
      category: "Presidential Villa",
      price: 5800,
      size: "480 m² / 5,166 sq ft",
      guests: "6-8 Guests",
      bed: "3 Master King Suites + Staff Quarters",
      view: "Private Cove, Cliff & Open Ocean",
      rating: 5.0,
      reviewsCount: 52,
      tag: "Ultimate Masterpiece",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "The pinnacle of Mediterranean seclusion. A standalone multi-level estate featuring a 25-meter private infinity pool, direct beach access, private security detail, private chef, and helipad.",
      features: [
        "25m Private Infinity Pool & Sunken Lounge",
        "Direct Private Funicular to Secluded Beach",
        "Private Michelin-Trained Resident Chef",
        "Dedicated Rolls-Royce Chauffeur At Your Disposal",
        "Private Wellness Pavilion & Steam Room",
        "State-of-the-Art Private Cinema"
      ],
      includes: ["Unlimited Airport Helicopter Transfers", "Bespoke Wine Cellar Curation", "24/7 Security & Concierge"]
    },
    {
      id: "oceanfront-garden-villa",
      name: "Oceanfront Garden Pavilion",
      category: "Ocean View Rooms",
      price: 1850,
      size: "115 m² / 1,237 sq ft",
      guests: "2 Guests",
      bed: "1 King Emperor Bed",
      view: "Direct Coastal Beach & Sea",
      rating: 4.97,
      reviewsCount: 114,
      tag: "Romantic Hideaway",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Nestled between fragrant jasmine groves and the gentle lapping of ocean waves, featuring an open-air rain garden, stone soak pool, and private cabana.",
      features: [
        "Private Ocean Cabana with Daybeds",
        "Open-Air Tropical Rain Garden",
        "Stone Bath Handcrafted from Local Travertine",
        "Complimentary Twilight Wine Tastings",
        "Direct Stepping Stones to the Shoreline",
        "Personalized Aromatherapy Linen Sprays"
      ],
      includes: ["Daily Shoreline Breakfast", "Romantic Beach Dinner Setup", "Private Yoga Session"]
    }
  ],

  dining: [
    {
      id: "dining-orangerie",
      name: "L'Orangerie",
      tagline: "3-Michelin Star Gastronomy",
      type: "Signature Fine Dining",
      hours: "Dinner: 19:00 - 23:30",
      dressCode: "Formal Elegance",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
      chef: "Chef Laurent Delacroix (3 Michelin Stars)",
      description: "An homage to Mediterranean sea harvests and citrus groves. Every dish is a delicate balance of art, aroma, and sustainable maritime craftsmanship.",
      menuHighlights: [
        { name: "Blue Lobster Carpaccio", detail: "Citrus pearls, golden caviar, sea urchin emulsion", price: "$95" },
        { name: "Wild Turbot in Seaweed Crust", detail: "Smoked bone marrow reduction, braised sea fennel", price: "$120" },
        { name: "A5 Miyazaki Wagyu & Truffle", detail: "Heritage parsnip velouté, 25-year aged balsamic", price: "$165" },
        { name: "Aurelia Golden Meyer Lemon", detail: "Crisp white chocolate shell, bergamot sorbet, gold leaf", price: "$45" }
      ]
    },
    {
      id: "dining-aura",
      name: "Aura Rooftop Lounge",
      tagline: "Sunsets & Rare Spirits",
      type: "Rooftop Cocktail & Raw Bar",
      hours: "17:00 - 02:00",
      dressCode: "Smart Casual",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      chef: "Head Mixologist Matteo Rossi",
      description: "Hovering 80 meters above the crashing waves. Enjoy artisan botanical cocktails, Japanese robata skewers, and chilled Grand Cru champagnes as dusk turns into starlight.",
      menuHighlights: [
        { name: "Golden Horizon Cocktail", detail: "Rare bourbon, saffron syrup, roasted orange, 24k smoke", price: "$36" },
        { name: "Yellowfin Tuna Tartare", detail: "Avocado foam, crispy nori, white truffle ponzu", price: "$48" },
        { name: "Wagyu Beef Robata Skewers", detail: "Tare glaze, toasted sesame, sansho pepper", price: "$52" },
        { name: "Oysters Fine de Claire (6 pcs)", detail: "Champagne granita, shallot pearls", price: "$65" }
      ]
    },
    {
      id: "dining-azure",
      name: "Azure Cove Grill",
      tagline: "Barefoot Beachfront Elegance",
      type: "Wood-Fired Seafood & Beach Lounge",
      hours: "12:00 - 22:00",
      dressCode: "Resort Chic",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
      chef: "Chef Elena Santoro",
      description: "Dine with your toes in the sand under canvas shade sails. Fresh catches of the day brought directly by local fishermen and grilled over olive wood embers.",
      menuHighlights: [
        { name: "Charred Mediterranean Octopus", detail: "Smoked paprika oil, confit potatoes, caper chimichurri", price: "$44" },
        { name: "Salt-Crusted Sea Bass", detail: "Carved tableside, wild herbs, lemon emulsion", price: "$85" },
        { name: "Handmade Tagliolini with Crab", detail: "San Marzano cherry tomatoes, chili, bottarga", price: "$56" },
        { name: "Artisanal Pistachio Gelato Brioche", detail: "Bronte pistachios, warm brioche, sea salt", price: "$28" }
      ]
    },
    {
      id: "dining-sommelier",
      name: "The Sommelier's Vault",
      tagline: "Private Cellar Degustation",
      type: "Exclusive Wine Cellar Dining",
      hours: "Reservations Only (Max 12 Guests)",
      dressCode: "Elegant",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80",
      chef: "Master Sommelier Henri Vane",
      description: "Carved into the subterranean limestone bedrock beneath the resort. Houses over 4,500 rare bottles spanning 1945 to modern biodynamic vintages.",
      menuHighlights: [
        { name: "Grand Terroir 7-Course Pairing", detail: "Seven courses each paired with Premier Grand Cru vintages", price: "$390" },
        { name: "Aged Comté & Truffle Degustation", detail: "36-month reserve cheeses with rare vin jaune", price: "$110" },
        { name: "Seared Foie Gras with Quince", detail: "Paired with Château d'Yquem 2009", price: "$140" }
      ]
    },
    {
      id: "dining-patisserie",
      name: "Maison Aurelia",
      tagline: "Morning Viennoiserie & Afternoon Caviar",
      type: "Café, Patisserie & Champagne Bar",
      hours: "07:00 - 19:00",
      dressCode: "Casual Luxury",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
      chef: "Pastry Master Camille Moreau",
      description: "Artisanal flaky pastries baked at dawn, single-origin pour-overs, delicate afternoon teas, and an evening caviar service accompanied by chilled vintage Dom Pérignon.",
      menuHighlights: [
        { name: "Royal Afternoon Tea Set", detail: "Finger sandwiches, warm scones, clotted cream, delicate gateaux", price: "$75" },
        { name: "Oscietra Caviar Imperial (30g)", detail: "Buckwheat blinis, crème fraîche, chives", price: "$185" },
        { name: "Hazelnut Praline Mille-Feuille", detail: "Caramelized puff pastry, Tahitian vanilla bean", price: "$24" }
      ]
    }
  ],

  wellness: [
    {
      id: "spa-sanctuary",
      title: "The Hydrothermal Labyrinth",
      duration: "90 Minutes",
      price: "$280",
      category: "Hydrotherapy",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      description: "A thermal sanctuary featuring vitality infinity pools, crystal steam grottos, Finnish cedar saunas, and ice fountains designed to awaken cellular vitality."
    },
    {
      id: "spa-massage",
      title: "Royal Golden Amber Massage",
      duration: "75 Minutes",
      price: "$320",
      category: "Holistic Bodywork",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
      description: "Warm organic sweet almond oil infused with 24-karat gold flakes and Baltic amber stones, relieving muscular tension and restoring radiant skin glow."
    },
    {
      id: "spa-sound",
      title: "Tibetan Singing Bowl Sound Bath",
      duration: "60 Minutes",
      price: "$190",
      category: "Mind & Meditation",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
      description: "Harmonic frequencies vibrate through water-cushioned loungers, guiding brainwaves into deep delta states for restorative mental clarity."
    },
    {
      id: "spa-yoga",
      title: "Sunrise Cliffside Vinyasa",
      duration: "60 Minutes",
      price: "Complimentary for Guests",
      category: "Movement & Fitness",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
      description: "Salute the sun on our open-air marble pavilion perched 60 meters above the crashing surf, accompanied by soft binaural ocean breeze."
    },
    {
      id: "spa-marine",
      title: "Mediterranean Marine Algae Detox",
      duration: "90 Minutes",
      price: "$340",
      category: "Skin & Cellular Health",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      description: "Sustainably harvested spirulina, volcanic sea clay, and rosemary wraps to eliminate toxins, followed by a deeply hydrating lymphatic drainage ritual."
    },
    {
      id: "spa-vitality",
      title: "Cold Plunge & Contrast Therapy",
      duration: "45 Minutes",
      price: "$140",
      category: "Longevity & Recovery",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80",
      description: "Biohacking recovery suite featuring an 8°C filtered plunge pool, infrared sauna, and guided Wim Hof breathing with our resident physiologist."
    }
  ],

  experiences: [
    {
      id: "exp-yacht",
      title: "Private Riva Yacht Charter",
      time: "Full Day (8 Hours)",
      price: "$3,800",
      image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1000&q=80",
      description: "Cruise secret emerald coves aboard our 48ft Riva Dolceriva yacht. Includes a private skipper, steward, chilled Dom Pérignon, and sea bob scooters.",
      highlights: ["Hidden Sea Caves Exploration", "Chef-Prepared Sunset Picnic", "Private Snorkel with Marine Biologist"]
    },
    {
      id: "exp-helicopter",
      title: "Helicopter Aerial Vineyard Tour",
      time: "Half Day (4 Hours)",
      price: "$2,400",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
      description: "Take off directly from the Aurelia helipad. Fly over dramatic coastal cliffs to an exclusive historic vineyard estate for a private sommelier tour.",
      highlights: ["Aerial Coastal Panoramas", "Centuries-Old Wine Cellars", "Tasting of Rare Museum Vintages"]
    },
    {
      id: "exp-sunset-dinner",
      title: "Private Atoll Twilight Dinner",
      time: "Evening (3.5 Hours)",
      price: "$1,600 per couple",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80",
      description: "Whisked away by wooden tender to a private sandbank illuminated by 100 lanterns. A 5-course feast prepared live by your personal private chef.",
      highlights: ["100 Hurricane Lanterns Setup", "Dedicated Butler & Sommelier", "Stargazing with High-Powered Telescope"]
    },
    {
      id: "exp-diving",
      title: "Bioluminescent Night Diving",
      time: "Night (2.5 Hours)",
      price: "$450 per diver",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      description: "Witness the underwater universe glow with ethereal blue light under the guidance of our PADI Master Instructor in the resort's private marine sanctuary.",
      highlights: ["Ultra-Violet Dive Torches", "Marine Protected Sanctuary", "Hot Spiced Cider & Bathrobe Upon Return"]
    },
    {
      id: "exp-cooking",
      title: "Michelin Culinary Masterclass",
      time: "Morning (3 Hours)",
      price: "$520 per person",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
      description: "Harvest heirloom herbs from our estate garden with Chef Laurent Delacroix, followed by hands-on preparation of delicate seafood and soufflés.",
      highlights: ["Estate Organic Garden Tour", "Champagne Paired Lunch of Creations", "Personalized Embroidered Chef Apron"]
    },
    {
      id: "exp-stargazing",
      title: "Celestial Observatory & Wine",
      time: "Late Evening (2 Hours)",
      price: "$280 per person",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80",
      description: "Unparalleled dark skies on the edge of the peninsula. Peer into deep cosmos, Saturn's rings, and nebula clouds with our resident astrophysicist.",
      highlights: ["Research-Grade Telescope", "Vintage Port & Dark Chocolate Pairing", "Custom Sky Map Keepsake"]
    }
  ],

  gallery: [
    {
      id: 1,
      category: "resort",
      title: "The Main Infinity Bastion",
      caption: "Cantilevered infinity pool blending into the Mediterranean horizon",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      category: "suites",
      title: "Villa Aurelia Master Terrace",
      caption: "Private sun deck with travertine stone plunge pool",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      category: "dining",
      title: "L'Orangerie Dining Room",
      caption: "Michelin-starred tables illuminated by hand-blown Venetian chandeliers",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      category: "wellness",
      title: "Thermal Hydrotherapy Grotto",
      caption: "Heated mineral pools surrounded by natural limestone arches",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      category: "experiences",
      title: "Riva Dolceriva Yacht at Anchor",
      caption: "Private charter anchored in the secluded Cala di Smeraldo cove",
      image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 6,
      category: "suites",
      title: "The Royal Bedroom Sanctuary",
      caption: "Custom linen bedding and panoramic morning sea vistas",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 7,
      category: "dining",
      title: "Sunset Cocktails at Aura Lounge",
      caption: "Golden hour over the cliffside terrace with signature aperitifs",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 8,
      category: "resort",
      title: "Twilight Peninsula Architecture",
      caption: "Biophilic architectural lines illuminated against the twilight sky",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 9,
      category: "wellness",
      title: "Cliffside Yoga Pavilion",
      caption: "Open-air teak pavilion greeting the morning Mediterranean sunrise",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 10,
      category: "experiences",
      title: "Lantern-Lit Atoll Supper",
      caption: "Bespoke dinner setup on the private sand spit",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 11,
      category: "suites",
      title: "Executive Calacatta Marble Spa Bath",
      caption: "Freestanding soaking stone tub overlooking the sea",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 12,
      category: "dining",
      title: "Azure Cove Beachside Lunch",
      caption: "Fresh grilled langoustines and crisp rosé by the tide",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Aurelia is not simply a resort; it is an emotional homecoming to beauty. The level of discrete, intuitive service by our private butler surpassed even the legendary palaces of Paris.",
      author: "Lord Alistair Sterling",
      location: "Mayfair, London",
      badge: "Verified Stay — Royal Sanctuary Suite",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      quote: "The silence here is pure luxury. Floating in the private villa infinity pool as the sun melted into the Aegean, sipping rare vintages from the vault... an experience etched in our memory forever.",
      author: "Dr. Hélène & Marc Beaumont",
      location: "Geneva, Switzerland",
      badge: "Verified Stay — Villa Aurelia Imperial",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      quote: "Chef Laurent’s tasting menu at L'Orangerie rivaled any three-star meal I have had in Tokyo. Every detail, from the linen weight to the bespoke scents, reflects masterclass curation.",
      author: "Kenji Takahashi",
      location: "Tokyo, Japan",
      badge: "Verified Stay — Panorama Ocean Suite",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      quote: "As someone who travels 200 days a year for business, Aurelia was the first destination in a decade where I was able to completely disconnect and restore my mind. The hydrothermal spa is miraculous.",
      author: "Elena Rostova",
      location: "New York & Milan",
      badge: "Verified Stay — Executive Suite",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ],

  statistics: [
    { number: 25, suffix: "+", label: "Years of Hospitality Heritage" },
    { number: 120, suffix: "+", label: "Curated Luxury Suites & Villas" },
    { number: 15, suffix: "+", label: "Signature Curated Experiences" },
    { number: 98, suffix: "%", label: "Discerning Guest Return & Satisfaction" }
  ],

  logistics: [
    {
      mode: "Helicopter Transfer",
      time: "12 Minutes",
      from: "International Airport (NCE / NAP)",
      description: "Direct landing on Aurelia Private Helipad with VIP tarmac welcome."
    },
    {
      mode: "Private Chauffeur",
      time: "45 Minutes",
      from: "Central Grand Rail & Airport",
      description: "Chauffeured in the resort's fleet of bespoke electric Rolls-Royce Spectres."
    },
    {
      mode: "Luxury Yacht Tender",
      time: "25 Minutes",
      from: "Marina Port",
      description: "Scenic open-sea arrival docking directly at Aurelia Private Pier."
    }
  ],

  addons: [
    { id: "addon-transfer-heli", name: "VIP Helicopter Airport Transfer", price: 650, icon: "🚁" },
    { id: "addon-champagne-vintage", name: "Dom Pérignon Vintage Welcome in Suite", price: 420, icon: "🍾" },
    { id: "addon-spa-pass", name: "Unlimited Hydrotherapy & Thermal Spa Pass", price: 280, icon: "✨" },
    { id: "addon-sunset-cruise", name: "Riva Yacht 2-Hour Sunset Cruise", price: 850, icon: "⛵" },
    { id: "addon-butler", name: "Dedicated 24/7 Personal Butler Service", price: 350, icon: "🛎️" }
  ]
};

// Export to window for global browser access without bundle step
if (typeof window !== "undefined") {
  window.RESORT_DATA = RESORT_DATA;
}
