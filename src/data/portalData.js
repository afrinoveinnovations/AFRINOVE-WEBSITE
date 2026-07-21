// Data repository for unlocked client portal modules: Upcoming Projects, Market Reports, and Investor Packs

export const upcomingProjectsData = [
  {
    id: 'proj-01',
    title: 'Arua Regional Airport Modernization & Logistics Hub (BOT)',
    sector: 'Infrastructure & Aviation',
    location: 'Arua, West Nile, Uganda',
    estimatedValue: '$85,000,000 USD',
    phase: 'Feasibility & PPP Concession Structuring',
    targetCOD: 'Q3 2028',
    summary: 'Design-Build-Finance-Operate-Transfer 25-year concession for international cargo runway expansion, cold-chain agro-export warehousing, and regional maintenance facilities.',
    highlights: ['Strategic cross-border link with South Sudan & DRC', 'Estimated IRR: 18.5%', 'Anchor partner signed: Ministry of Works & Transport']
  },
  {
    id: 'proj-02',
    title: 'Albertine Graben Petroleum Service Base & Eco-Industrial Park',
    sector: 'Petroleum & Logistics',
    location: 'Hoima / Buliisa, Uganda',
    estimatedValue: '$120,000,000 USD',
    phase: 'Land Clearance & Infrastructure Design',
    targetCOD: 'Q1 2027',
    summary: 'State-of-the-art heavy equipment logistics yard, hazardous waste management hub, and solar-powered utility microgrid supporting Tilenga & Kingfisher upstream operations.',
    highlights: ['200-hectare master-planned site', 'Pre-leased 35% capacity to tier-1 oilfield suppliers', 'ESG compliance framework aligned with IFC performance standards']
  },
  {
    id: 'proj-03',
    title: 'East Africa Specialty Coffee Aggregation & Processing Hub',
    sector: 'Agribusiness & Trade',
    location: 'Mbale / Elgon Belt, Uganda',
    estimatedValue: '$24,500,000 USD',
    phase: 'Capital Procurement & Offtake Contracting',
    targetCOD: 'Q4 2026',
    summary: 'High-yield eco-pulpers, optical sorting lines, and direct-trade dry mills connecting 15,000 smallholders with EU & North American specialty roasters.',
    highlights: ['Traceability digital ledger integrated', 'EUDR (EU Deforestation Regulation) compliant certification', 'Projected EBITDA margin: 22%']
  },
  {
    id: 'proj-04',
    title: 'Kasese Solar Microgrid & Critical Minerals Beneficiation Hub',
    sector: 'Renewable Energy & Mining',
    location: 'Kasese, Western Uganda',
    estimatedValue: '$45,000,000 USD',
    phase: 'Environmental & Social Impact Assessment (ESIA)',
    targetCOD: 'Q2 2027',
    summary: '40MW ground-mounted solar PV plant coupled with battery storage system powering local cobalt and copper tailings reprocessing facility.',
    highlights: ['Clean energy transition asset', 'Subscribed under East Africa Power Pool tariff framework', 'High demand from battery manufacturers']
  }
];

export const marketReportsData = [
  {
    id: 'rep-01',
    title: 'East Africa Infrastructure & PPP Market Outlook 2026-2030',
    category: 'Sector Analysis',
    publishDate: 'July 2026',
    fileSize: '4.8 MB',
    pages: 42,
    summary: 'Comprehensive analysis of public-private partnership policies, sovereign guarantee frameworks, and project financing trends across EAC member states.',
    downloadUrl: '#',
    keyInsights: [
      'Over $3.2B in transportation and energy PPPs reaching commercial close in 2026',
      'Detailed regulatory comparison of Uganda, Kenya, Tanzania, and Rwanda PPP laws',
      'Risk mitigation strategies for currency convertibility and political risk insurance'
    ]
  },
  {
    id: 'rep-02',
    title: 'Critical Minerals & Battery Value Chain Opportunities in the Great Lakes Region',
    category: 'Mining & Commodities',
    publishDate: 'June 2026',
    fileSize: '6.2 MB',
    pages: 58,
    summary: 'Geological survey synthesis, export restriction dynamics, and local value-addition mandates for Cobalt, Lithium, Tantalum, and Rare Earth Elements.',
    downloadUrl: '#',
    keyInsights: [
      'New legal frameworks requiring 30%+ in-country processing prior to export clearance',
      'Supply chain mapping from mine-gate to Indian Ocean ports (Mombasa & Dar es Salaam)',
      'Price forecasting and ESG audit guidelines for international off-takers'
    ]
  },
  {
    id: 'rep-03',
    title: 'Agro-Industrial Logistics & Cold-Chain Deficits in EAC',
    category: 'Agribusiness',
    publishDate: 'May 2026',
    fileSize: '3.5 MB',
    pages: 36,
    summary: 'Assessment of post-harvest loss mitigation, refrigerated transport fleet economics, and regional trade corridor efficiency.',
    downloadUrl: '#',
    keyInsights: [
      '40% reduction in post-harvest loss achievable through localized cold hub placement',
      'Capital expenditure requirements and revenue models for rural solar cold storage',
      'Export market specifications for horticultural products into GCC and EU markets'
    ]
  }
];

export const investorPacksData = [
  {
    id: 'inv-01',
    title: 'Afrinove High-Growth Infrastructure & Energy Pipeline (Teaser & VDR)',
    type: 'Confidential Investment Teaser',
    accessLevel: 'Tier 1 Qualified Investors',
    lastUpdated: 'July 2026',
    fileFormat: 'PDF & Financial Model (.xlsx)',
    description: 'Executive summary detailing structured co-investment opportunities across 4 prime infrastructure assets with targeted net IRR of 18-22%.',
    contents: ['Executive Summary Brief', 'Financial Valuation Model (.xlsx)', 'Risk Matrix & Guarantee Structure', 'Legal & Regulatory Opinion Memorandum']
  },
  {
    id: 'inv-02',
    title: 'Afrinove Agribusiness Growth Equity Fund - Institutional Deck',
    type: 'Private Equity Pitch Deck',
    accessLevel: 'Institutional & Family Offices',
    lastUpdated: 'June 2026',
    fileFormat: 'PDF Presentation (32 slides)',
    description: '$50M growth capital deployment model for scaling export-grade processing infrastructure and outgrower financing.',
    contents: ['Fund Term Sheet & GP/LP Structure', 'Track Record & Historical IRR', 'Portfolio Company Pipelines', 'Impact & Sustainability Metrics (SDG Aligned)']
  }
];
