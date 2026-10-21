/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Project Data Source (8 Curated Projects)
 * Optimized for high visual fidelity, fast asset loading, and GPU VRAM efficiency.
 */

const PROJECTS = [
  {
    id: '01',
    slug: 'gym',
    title: 'GYM',
    category: 'GYM',
    location: 'EXPEDITIONS',
    year: '2026',
    logline: 'Kinetic energy, power, and high-intensity motion in cinematic light.',
    description: 'A study of athletic discipline, raw physical fortitude, and kinetic movement. Captured with dynamic camera motion, atmospheric shadow, and relentless momentum.',
    heroImage: 'assets/images/travel-hero.jpg',
    videoUrl: 'assets/videos/gym.mp4',
    credits: {
      director: 'Prashant Mishra',
      camera: 'ARRI Alexa Mini LF / Cooke Anamorphic',
      colorist: 'Capturing Whole World Studios'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: '05:30 AM — First alpine light breaking across the northern ridges'
      },
      {
        url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1100&q=80',
        aspect: 'vertical',
        caption: 'Solitary climber negotiating the loose scree line at 4,800m'
      },
      {
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1100&q=80',
        aspect: 'square',
        caption: 'Glacial meltwater carving crystalline fractures through granite'
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'The vast amphitheater of peaks under approaching twilight storms'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1100&q=80',
        aspect: 'portrait',
        caption: 'Portrait of Tenzin, elder shepherd of the Upper Spiti plateau'
      }
    ]
  },
  {
    id: '02',
    slug: 'the-trek-soul',
    title: 'THE TREK SOUL',
    category: 'ADVENTURE / TRAVEL',
    location: 'ZANSKAR & LADAKH',
    year: '2025',
    logline: 'An atmospheric brand documentary through frozen river canyons.',
    description: 'Chronicling endurance trekkers pushing through the frozen gorges of Chadar and the stark desert canyons of Zanskar. A visceral study of human will against unrelenting geological scale.',
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'Sony FX9 / Leica Summilux-C',
      production: 'The Trek Soul Expedition'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Caravan traversing the windswept passes of Shingo La'
      },
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1100&q=80',
        aspect: 'vertical',
        caption: 'Midnight campfire beneath unpolluted galactic skies'
      },
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Braided glacial streams feeding the Indus river valley'
      }
    ]
  },
  {
    id: '03',
    slug: 'ladakh',
    title: 'LADAKH',
    category: 'TRAVEL / EXPEDITION',
    location: 'PANGONG & NUBRA',
    year: '2025',
    logline: 'High-altitude stillness at the edge of the Tibetan plateau.',
    description: 'A visual poem exploring Pangong Tso at sub-zero temperatures. Midnight stars reflected in turquoise ice and monks chanting inside centuries-old monasteries carved into cliff faces.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'Hasselblad 503CW & RED 8K',
      format: '2.39:1 Anamorphic'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Dawn reflections along the southern shore of Pangong Tso'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1100&q=80',
        aspect: 'portrait',
        caption: 'Portrait of Diskit monastery monk in morning light'
      },
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Dunes of Hunder under approaching snow storm'
      }
    ]
  },
  {
    id: '04',
    slug: 'automotive-stories',
    title: 'AUTOMOTIVE STORIES',
    category: 'AUTOMOTIVE / COMMERCIAL',
    location: 'RAJASTHAN & THAR',
    year: '2025',
    logline: 'Sculpted metal cutting through desert silence.',
    description: 'Precision tracking cinematography and high-speed motion across desert expressways and vast salt flats. Crafted with organic exhaust resonance and golden hour flare.',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'RED V-Raptor 8K / Russian Arm',
      driver: 'Track Division India'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Tracking at 140 km/h across the Sam Sand Dune Highway'
      },
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=80',
        aspect: 'vertical',
        caption: 'Headlamp optics piercing through desert morning haze'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Rear silhouette against the burning amber horizon'
      }
    ]
  },
  {
    id: '05',
    slug: 'wedding-stories',
    title: 'WEDDING STORIES',
    category: 'WEDDING / DOCUMENTARY',
    location: 'UDAIPUR & JAIPUR',
    year: '2025',
    logline: 'Not posed moments, but emotional legacies.',
    description: 'Elevating wedding films into cinematic poetry. Focusing on unscripted tears, royal heritage courtyards, and the sacred beauty of lifetime vows.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'Leica SL2-S / Noctilux 50mm f/0.95',
      sound: 'Acoustic Sarangi & Strings'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Vows illuminated by flickering oil lamps at Lake Pichola'
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1100&q=80',
        aspect: 'square',
        caption: 'Handwoven silk embroidery in filtered courtyard sunlight'
      },
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Palace gardens under evening rose petal shower'
      }
    ]
  },
  {
    id: '06',
    slug: 'india-through-my-lens',
    title: 'INDIA THROUGH MY LENS',
    category: 'TRAVEL / CULTURE',
    location: 'VARANASI & SPITI',
    year: '2026',
    logline: 'A nation of ten thousand unwritten stories.',
    description: 'A multi-year visual monograph spanning the high cold deserts of Ladakh to the sacred river ghats of Varanasi and the ancient dunes of Rajasthan.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'Leica M11 & Leica M-A 35mm Real Film',
      publication: 'Capturing Whole World Press'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Assi Ghat at 04:30 AM — Devotees welcoming dawn light'
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=80',
        aspect: 'portrait',
        caption: 'The boatman of the sacred river, seventy years on the oars'
      },
      {
        url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Amber dust rising behind camel herds across Thar desert horizons'
      }
    ]
  },
  {
    id: '07',
    slug: 'fashion-in-motion',
    title: 'FASHION IN MOTION',
    category: 'FASHION / EDITORIAL',
    location: 'DELHI & MUMBAI',
    year: '2025',
    logline: 'Fabric as kinetic sculpture in architectural space.',
    description: 'High-contrast monochrome lighting, raw concrete backdrops, and fluid fabric dynamics moving at 120 frames per second.',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'ARRI Alexa 35 & Hasselblad H6D',
      styling: 'Studio Avant Delhi'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=80',
        aspect: 'vertical',
        caption: 'Handloom silk catching midday wind in brutalist plaza'
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'High-contrast light cutting across sandstone geometry'
      },
      {
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1100&q=80',
        aspect: 'square',
        caption: 'Portrait study: Eye gaze in 35mm shallow focus'
      }
    ]
  },
  {
    id: '08',
    slug: 'the-road',
    title: 'THE ROAD',
    category: 'TRAVEL / LIFESTYLE',
    location: 'MANALI-LEH HIGHWAY',
    year: '2026',
    logline: '474 kilometers of high-altitude solitude and tarmac.',
    description: 'An ode to overland journeys. From alpine pine valleys climbing over Baralacha La and Tanglang La onto the moonscapes of Morey Plains.',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
    credits: {
      director: 'Prashant Mishra',
      camera: 'Sony FX3 & Leica M Film',
      grade: 'Warm Kodak Portra 400 Tone'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        aspect: 'cinematic',
        caption: 'Endless asphalt disappearing into high Himalayan passes'
      },
      {
        url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1100&q=80',
        aspect: 'vertical',
        caption: 'Solitary rider descending through cloud inversion at 4,500m'
      },
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
        aspect: 'fullwidth',
        caption: 'Twilight falling across the expansive Morey Plains'
      }
    ]
  }
];

window.PROJECTS_DATA = PROJECTS;
