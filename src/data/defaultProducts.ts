import { Product } from '../types/product';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    "id": "prod_creatina_01",
    "slug": "creatina-monohidrato",
    "name": "CREATINA MONOHIDRATO DELTA // 100% PURA",
    "tagline": "Potencia celular pura: 5000mg de Creatina Monohidrato micronizada, 60 servicios reales y 0% azúcar",
    "category": "creatina",
    "badge": "100% Pura Micronizada · 60 Servicios Reales",
    "rating": 4.99,
    "reviewsCount": 1850,
    "basePrice": 85000,
    "originalPrice": 105000,
    "flavors": [
      "Sin Sabor",
      "Maracuyá",
      "Uva",
      "Frutos Rojos"
    ],
    "sizes": [
      "360g (60 Servicios)"
    ],
    "imageType": "custom",
    "customImageUrl": "/images/landing/creatina-unidad-sin-sabor.png",
    "gallery": [
      "/images/landing/creatina-unidad-sin-sabor.png",
      "/images/landing/creatina-unidad-maracuya.png",
      "/images/landing/creatina-unidad-uva.png",
      "/images/landing/creatina-unidad-frutos-rojos.png"
    ],
    "accentColor": "#4c6976",
    "secondaryColor": "#000000",
    "canisterColor": "white",
    "heroTitle": "CREATINA MONOHIDRATO: Fuerza y Potencia Celular Máxima en Cada Serie",
    "heroSubtitle": "La fórmula más pura y comprobada de la nutrición deportiva. 5.000mg de creatina monohidrato micronizada para saturar depósitos celulares, disparar la resíntesis de ATP y elevar tus cargas de trabajo al fallo.",
    "heroBullets": [
      "5.000mg de Creatina Monohidrato 100% pura de máxima biodisponibilidad por toma",
      "60 servicios reales garantizados en cada tarro de 360g",
      "4 sabores tácticos irresistibles: Sin Sabor, Maracuyá, Uva y Frutos Rojos",
      "Cero azúcares, cero grasas y libre de gluten para una digestión ultraligera"
    ],
    "ctaText": "Comprar Creatina Monohidrato DELTA",
    "guaranteeDays": 30,
    "guaranteeTitle": "Garantía de Rendimiento Explosivo de 30 Días",
    "guaranteeDescription": "Si no notas un incremento real en tu fuerza, resistencia y congestión muscular en 30 días, te devolvemos el 100% de tu dinero.",
    "stockStatus": "in_stock",
    "published": true,
    "bundles": [
      {
        "id": "creatina_unidad",
        "name": "La Unidad (1 Tarro)",
        "units": 1,
        "price": 85000,
        "originalPrice": 105000,
        "savingsText": "Ahorras $20.000"
      },
      {
        "id": "creatina_duo",
        "name": "El Dúo Promo (2 Tarros)",
        "units": 2,
        "badge": "MÁS VENDIDO · AHORRA 26%",
        "price": 155000,
        "originalPrice": 210000,
        "savingsText": "Ahorras $55.000",
        "popular": true
      },
      {
        "id": "creatina_x3",
        "name": "Arsenal x3 (Bodegón)",
        "units": 3,
        "badge": "MAYOR AHORRO · ENVÍO GRATIS",
        "price": 219000,
        "originalPrice": 315000,
        "savingsText": "Ahorras $96.000"
      },
      {
        "id": "creatina_x4",
        "name": "Pack Batallón x4",
        "units": 4,
        "badge": "PACK PROFESIONAL · ENVÍO GRATIS",
        "price": 279000,
        "originalPrice": 420000,
        "savingsText": "Ahorras $141.000"
      }
    ],
    "benefits": [
      {
        "id": "b_crea_1",
        "icon": "zap",
        "title": "Resíntesis Acelerada de ATP",
        "description": "Incrementa la energía rápida celular para empujar repeticiones adicionales en series pesadas.",
        "stat": "5000mg ATP"
      },
      {
        "id": "b_crea_2",
        "icon": "activity",
        "title": "Voluminización Intracelular",
        "description": "Estimula la hidratación de las fibras musculares promoviendo un ambiente anabólico continuo.",
        "stat": "100% Celular"
      },
      {
        "id": "b_crea_3",
        "icon": "shield-check",
        "title": "Molienda Micronizada 200 Mesh",
        "description": "Disolución completa en agua o batidos sin textura arenosa ni sedimentos molestos.",
        "stat": "Cero Grumos"
      },
      {
        "id": "b_crea_4",
        "icon": "award",
        "title": "0% Azúcar y Rellenos",
        "description": "Pureza molecular comprobada, libre de gluten y con registro sanitario certificado.",
        "stat": "0% Azúcar"
      }
    ],
    "salesArgumentsTitle": "¿Por qué elegir la Creatina Monohidrato DELTA?",
    "salesArgumentsSubtitle": "A diferencia de marcas que reducen los servicios o agregan rellenos baratos, DELTA te entrega 360g de monohidrato puro con sabores exquisitos y disolución perfecta.",
    "salesArgumentsBullets": [
      "Pureza garantizada con 5g de monohidrato activo por scoop.",
      "Opciones con sabor refrescante sin azúcar o sin sabor neutro para mezclar.",
      "Digestión suave sin molestias estomacales ni retención de líquidos superficial.",
      "Registro sanitario y respaldo oficial de TOP ONE™ Nutrition."
    ],
    "comparison": {
      "title": "Creatina DELTA vs Creatinas Genéricas",
      "subtitle": "Compara la calidad de disolución, servicios y pureza frente a marcas comerciales.",
      "topOneLabel": "DELTA Creatina Monohidrato",
      "competitorLabel": "Creatina Genérica Comercial",
      "rows": [
        {
          "feature": "Solubilidad y Textura",
          "topOne": "Micronizada ultrafina, cero grumos",
          "competitor": "Arenosa y con residuos en el vaso",
          "topOneHighlight": true
        },
        {
          "feature": "Servicios Reales",
          "topOne": "60 tomas completas (360g)",
          "competitor": "30 a 45 tomas (150-200g)",
          "topOneHighlight": true
        },
        {
          "feature": "Variedad de Sabores",
          "topOne": "4 sabores gourmet sin azúcar",
          "competitor": "Solo sin sabor o con químicos amargos",
          "topOneHighlight": true
        },
        {
          "feature": "Absorción y Digestión",
          "topOne": "Absorción celular inmediata",
          "competitor": "Pesadez o cólicos leves",
          "topOneHighlight": true
        }
      ]
    },
    "nutritionalFacts": {
      "badgeTitle": "INFORMACIÓN NUTRICIONAL CERTIFICADA",
      "sectionTitle": "Perfil Nutricional - CREATINA MONOHIDRATO",
      "sectionSubtitle": "Análisis por servicio completo de 5g / 1 scoop.",
      "servingSize": "1 Scoop (5g / 6g con sabor)",
      "servingsPerContainer": 60,
      "table": [
        {
          "ingredient": "Creatina Monohidrato Pura Micronizada",
          "perServing": "5.000 mg",
          "dailyValue": "**"
        },
        {
          "ingredient": "Calorías",
          "perServing": "0 kcal",
          "dailyValue": "0%"
        },
        {
          "ingredient": "Carbohidratos Totales",
          "perServing": "0 g",
          "dailyValue": "0%"
        },
        {
          "ingredient": "Azúcares Añadidos",
          "perServing": "0 g",
          "dailyValue": "0%"
        },
        {
          "ingredient": "Sodio",
          "perServing": "0 mg",
          "dailyValue": "0%"
        }
      ],
      "certificates": [
        "Registro Sanitario Oficial",
        "Micronizada 200 Mesh",
        "100% Gluten Free",
        "Cero Azúcar Añadida"
      ],
      "usageInstructions": "Disolver 1 scoop (5g) en 250-300ml de agua o bebida favorita. Consumir a diario."
    },
    "reviews": [
      {
        "id": "rev_crea_1",
        "author": "Carlos Andrés Montoya",
        "verified": true,
        "date": "Hace 3 días",
        "rating": 5,
        "title": "La de Maracuyá es espectacular y la fuerza es real",
        "comment": "La creatina DELTA es otro nivel. Compré el sabor Maracuyá y la disolución es perfecta, cero grumos y sabor delicioso. Mis marcas en press de banca y sentadilla subieron 10kg en 3 semanas.",
        "objective": "Fuerza y Rendimiento",
        "helpfulCount": 42
      },
      {
        "id": "rev_crea_2",
        "author": "Sargento David R.",
        "verified": true,
        "date": "Hace 5 días",
        "rating": 5,
        "title": "Excelente el combo DÚO",
        "comment": "Pedí el combo DÚO (uno Sin Sabor para mezclar con mi proteína y otro Uva para antes de entrenar). Cero hinchazón estomacal y una recuperación muscular brutal.",
        "objective": "Recuperación Celular",
        "helpfulCount": 35
      }
    ],
    "faqBadge": "PREGUNTAS FRECUENTES",
    "faqTitle": "Preguntas sobre Creatina Monohidrato",
    "faqSubtitle": "Aclaramos tus dudas sobre uso, beneficios y combinaciones.",
    "faqs": [
      {
        "question": "¿Es necesaria la fase de carga?",
        "answer": "No es obligatoria. Tomando 1 scoop diario (5g) alcanzarás la saturación celular óptima en 2 a 3 semanas de forma continua y sin molestias digestivas."
      },
      {
        "question": "¿Rinde 60 servicios reales?",
        "answer": "Sí, cada tarro contiene 360g netos, entregando 60 servicios de 5g exactos para 2 meses completos de suplementación."
      }
    ],
    "sectionsConfig": {
      "hero": true,
      "bundles": true,
      "benefits": true,
      "comparison": true,
      "nutrition": true,
      "reviews": true,
      "faqs": true,
      "guarantee": true
    }
  },
  {
    "id": "prod_tank_01",
    "slug": "tank-stronger-mass-gainer",
    "name": "TANK Stronger Mass Gainer // Whey + Superfoods",
    "tagline": "Calidad en fase de ganancia y volumen: 53g proteína, 1290 calorías limpias y carbohidratos de Quinoa Orgánica",
    "category": "hipercalorica",
    "badge": "Masa Inteligente con 6 Fuentes de Proteína + Quinoa Completa",
    "rating": 4.98,
    "reviewsCount": 1420,
    "basePrice": 38.9,
    "originalPrice": 46.9,
    "flavors": [
      "Vainilla Coco",
      "Choco Moca",
      "Cookies & Cream"
    ],
    "sizes": [
      "2 LBS (Bolsa Tactical)",
      "3 LBS (Bote 1362g)",
      "7 LBS (Bolsa Pro)",
      "11 LBS (Caja Batallón)"
    ],
    "imageType": "custom",
    "customImageUrl": "/brochure/imagenes/DOC-20250922-WA0000._page-0004.jpg",
    "gallery": [
      "/brochure/imagenes/DOC-20250922-WA0000._page-0004.jpg",
      "/brochure/imagenes/DOC-20250922-WA0000._page-0002.jpg",
      "/brochure/imagenes/DOC-20250922-WA0000._page-0003.jpg",
      "/brochure/imagenes/DOC-20250922-WA0000._page-0014.jpg"
    ],
    "accentColor": "#7cb20b",
    "secondaryColor": "#d97706",
    "canisterColor": "dark",
    "heroTitle": "Masa Muscular Extrema sin Grasa: Desarrolla Volumen Real con 1290 Calorías y Quinoa Orgánica",
    "heroSubtitle": "Fórmula hipercalórica táctica de máxima asimilación: 53g de proteína de élite derivada de 6 fuentes, 238g de carbohidratos limpios de absorción gradual y 4g de matriz de Glutamina y Creatina para cuerpos en constante combate.",
    "heroBullets": [
      "53g de proteína de élite derivada de 6 fuentes de alto valor biológico + Quinoa Orgánica",
      "1290 calorías densas por servicio (5 scoops) para superar cualquier estancamiento de peso",
      "238g de carbohidratos limpios libres de picos de azúcar desmedidos o pesadez estomacal",
      "4g de matriz combinada de L-Glutamina y Creatina para voluminización y recuperación celular inmediata"
    ],
    "ctaText": "Comprar TANK con Descuento Táctico",
    "guaranteeDays": 30,
    "guaranteeTitle": "Garantía de Rendimiento Táctico de 30 Días",
    "guaranteeDescription": "Si no experimentas un aumento palpable en tu volumen muscular y nivel de energía en tus entrenamientos pesados, te devolvemos el 100% de tu dinero.",
    "stockStatus": "in_stock",
    "published": true,
    "bundles": [
      {
        "id": "bundle_tank_1",
        "name": "1 Bote (3 LBS / 1362g)",
        "units": 1,
        "price": 38.9,
        "originalPrice": 46.9,
        "savingsText": "Ahorro 8.00€"
      },
      {
        "id": "bundle_tank_2",
        "name": "Pack Dúo Masa Táctica (2 x 3 LBS)",
        "units": 2,
        "badge": "MÁS VENDIDO · AHORRA 26%",
        "price": 68.9,
        "originalPrice": 93.8,
        "savingsText": "Ahorras 24.90€",
        "popular": true,
        "freeGift": "Shaker Pro Táctico TopOne Gratis"
      },
      {
        "id": "bundle_tank_3",
        "name": "Arsenal Batallón (Bolsa Pro 7 LBS + 3 LBS)",
        "units": 3,
        "badge": "MÁXIMO VOLUMEN · ENVÍO GRATIS",
        "price": 89.9,
        "originalPrice": 124.9,
        "savingsText": "Ahorras 35.00€",
        "freeGift": "Shaker Pro + Toalla Táctica + Envío 24h Gratis"
      }
    ],
    "benefits": [
      {
        "id": "b_tank_1",
        "icon": "zap",
        "title": "Superávit Calórico Limpio y Controlado",
        "description": "1290 calorías de alto rendimiento diseñadas estratégicamente para construir tejido muscular magro y evitar la retención excesiva de grasa adiposa.",
        "stat": "1290 kcal"
      },
      {
        "id": "b_tank_2",
        "icon": "activity",
        "title": "6 Fuentes de Proteínas + Quinoa Orgánica",
        "description": "Mezcla sinérgica de proteínas de suero y quinoa andina que suministra el espectro completo de aminoácidos con absorción secuencial prolongada.",
        "stat": "53g Proteína"
      },
      {
        "id": "b_tank_3",
        "icon": "flame",
        "title": "4g de Glutamina & Creatina Integradas",
        "description": "Satura tus reservas de fosfocreatina intracelular para empujar 2-3 repeticiones extra en series límite y proteger tus fibras del catabolismo.",
        "stat": "4g Gluta+Crea"
      },
      {
        "id": "b_tank_4",
        "icon": "shield-check",
        "title": "Cero Azúcar Añadida y Libre de Gluten",
        "description": "Formulado sin rellenos de azúcar refinada. Digestibilidad sobresaliente gracias al poder nutritivo y enzimático de la quinoa orgánica.",
        "stat": "0% Azúcar"
      }
    ],
    "salesArgumentsTitle": "¿Por qué TANK de TopOneNutrition domina en fase de volumen?",
    "salesArgumentsSubtitle": "Los gainers comunes están repletos de azúcar barata y maltodextrina que solo provocan picos de insulina y grasa visceral. TANK revoluciona el mercado con nutrición táctica real.",
    "salesArgumentsBullets": [
      "Única fórmula con Quinoa Orgánica como fuente de carbohidratos complejos y micronutrientes vitales.",
      "Aporte equilibrado de 53g de proteína pura para asegurar una síntesis proteica activa las 24 horas.",
      "Libre de gluten y con perfil digestivo suave: cero hinchazón abdominal ni sensación de pesadez.",
      "Fabricado bajo rigurosos estándares sanitarios certificados con registro Invima / Minsalud."
    ],
    "comparison": {
      "title": "TopOne TANK vs Gainers Convencionales",
      "subtitle": "Compara la pureza de ingredientes frente a suplementos de hipercalóricos comerciales comunes.",
      "topOneLabel": "TopOne TANK Mass Gainer",
      "competitorLabel": "Gainer Genérico Comercial",
      "rows": [
        {
          "feature": "Calidad de Carbohidratos",
          "topOne": "Quinoa Orgánica + Carbos de asimilación gradual",
          "competitor": "Maltodextrina barata y azúcares simples",
          "topOneHighlight": true
        },
        {
          "feature": "Contenido Proteico por Toma",
          "topOne": "53g de 6 fuentes de alto valor biológico",
          "competitor": "20-30g de concentrado de suero genérico o soja",
          "topOneHighlight": true
        },
        {
          "feature": "Adición de Creatina y Glutamina",
          "topOne": "4g reales por servicio completo",
          "competitor": "Trazas testimoniales o nula",
          "topOneHighlight": true
        },
        {
          "feature": "Digestión y Pesadez Abdominal",
          "topOne": "Digestión ligera, sin gases ni distensión",
          "competitor": "Hinchazón severa y pesadez estomacal",
          "topOneHighlight": true
        }
      ]
    },
    "nutritionalFacts": {
      "badgeTitle": "INFORMACIÓN NUTRICIONAL CERTIFICADA",
      "sectionTitle": "Perfil Nutricional Táctico - TANK",
      "sectionSubtitle": "Valores analizados por toma completa (5 scoops) para máxima precisión en tu dieta.",
      "servingSize": "5 Scoops (340g)",
      "servingsPerContainer": 15,
      "table": [
        {
          "ingredient": "Proteína (6 Fuentes + Quinoa Orgánica)",
          "perServing": "53 g",
          "dailyValue": "106%"
        },
        {
          "ingredient": "Energía Total / Calorías",
          "perServing": "1290 kcal",
          "dailyValue": "65%"
        },
        {
          "ingredient": "Carbohidratos Totales (Complejos)",
          "perServing": "238 g",
          "dailyValue": "79%"
        },
        {
          "ingredient": "L-Glutamina & Creatina Micronizada",
          "perServing": "4000 mg",
          "dailyValue": "**"
        },
        {
          "ingredient": "Grasas Totales (Saludables)",
          "perServing": "3.5 g",
          "dailyValue": "5%"
        },
        {
          "ingredient": "Azúcares Añadidos",
          "perServing": "0 g",
          "dailyValue": "0%"
        },
        {
          "ingredient": "Fibra Dietaria de Quinoa",
          "perServing": "5 g",
          "dailyValue": "20%"
        },
        {
          "ingredient": "Sodio",
          "perServing": "220 mg",
          "dailyValue": "9%"
        }
      ],
      "certificates": [
        "Registro Sanitario Invima / Minsalud",
        "Quinoa Orgánica Superfood Certificada",
        "100% Gluten Free",
        "Buenas Prácticas de Manufactura (GMP)"
      ],
      "usageInstructions": "Mezclar 5 scoops (o 2.5 scoops dos veces al día) en 500-600ml de agua fría o leche descremada. Consumir entre comidas y/o inmediatamente después del entrenamiento."
    },
    "reviews": [
      {
        "id": "rev_tank_1",
        "author": "Sargento David R.",
        "verified": true,
        "date": "Hace 3 días",
        "rating": 5,
        "title": "Subí 4.2 kg de masa limpia en 6 semanas",
        "comment": "Siempre me costó subir de peso porque tengo metabolismo hiperactivo. Con TANK Choco Moca los resultados fueron brutales. Cero pesadez en el estómago y la fuerza en sentadilla se disparó.",
        "objective": "Volumen Muscular Magro",
        "helpfulCount": 48
      },
      {
        "id": "rev_tank_2",
        "author": "Esteban Cárdenas",
        "verified": true,
        "date": "Hace 1 semana",
        "rating": 5,
        "title": "El sabor Vainilla Coco es una locura",
        "comment": "Se mezcla excelente en el shaker sin dejar masa pegada en las esquinas. La quinoa se nota en la textura suave y la digestión es de 10 puntos.",
        "objective": "Ganancia de Peso",
        "helpfulCount": 32
      },
      {
        "id": "rev_tank_3",
        "author": "Marcos Villegas",
        "verified": true,
        "date": "Hace 2 semanas",
        "rating": 5,
        "title": "Excelente calidad, nada que envidiar a marcas de USA",
        "comment": "La combinación de 53g de proteína y los 4g de creatina te ahorran tener que comprar suplementos adicionales. Muy recomendado el pack dúo.",
        "objective": "Fuerza e Hipertrofia",
        "helpfulCount": 19
      }
    ],
    "faqBadge": "PREGUNTAS FRECUENTES SOBRE TANK",
    "faqTitle": "Todo lo que necesitas saber sobre TANK",
    "faqSubtitle": "Respuestas claras de nuestros nutricionistas tácticos.",
    "faqs": [
      {
        "question": "¿TANK me hará ganar grasa o masa muscular magra?",
        "answer": "TANK está formulado con carbohidratos complejos derivados de Quinoa Orgánica y 53g de proteína de alto valor biológico. A diferencia de gainers comerciales con azúcares simples, TANK nutre directamente el músculo evitando el exceso de grasa cuando se acompaña de entrenamiento de fuerza."
      },
      {
        "question": "¿Cómo debo tomar el servicio de 5 scoops?",
        "answer": "Puedes tomar los 5 scoops juntos en 600ml de líquido después de entrenar, o si prefieres, dividir la toma en 2 batidos de 2.5 scoops: uno a media mañana y otro post-entrenamiento."
      },
      {
        "question": "¿Tiene lactosa o causa hinchazón?",
        "answer": "Su formulación incluye enzimas y quinoa micronizada, reduciendo enormemente la molestia digestiva frente a suplementos tradicionales."
      }
    ],
    "sectionsConfig": {
      "hero": true,
      "bundles": true,
      "benefits": true,
      "comparison": true,
      "nutrition": true,
      "reviews": true,
      "faqs": true,
      "guarantee": true
    }
  },
];
