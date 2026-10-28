/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JobCardData, OrgNodeSlotDef, KPIState, BoardPlacements } from '../types/game';

export const INITIAL_KPIS: KPIState = {
  operationalEfficiency: 38,
  employeeSatisfaction: 42,
  customerSatisfaction: 47,
  clarityOfRoles: 30,
  liquidity: 450000,
};

export const DEPARTMENT_METADATA = {
  executive: {
    label: 'الإدارة العليا',
    labelEn: 'Executive Leadership',
    accentColor: '#123B35',
    lightBg: '#E8F1EE',
    textColor: '#123B35',
    borderColor: '#97BFB4',
  },
  operations: {
    label: 'إدارة العمليات',
    labelEn: 'Operations',
    accentColor: '#0284C7',
    lightBg: '#E0F2FE',
    textColor: '#0369A1',
    borderColor: '#BAE6FD',
  },
  finance: {
    label: 'الإدارة المالية',
    labelEn: 'Finance',
    accentColor: '#B45309',
    lightBg: '#FEF3C7',
    textColor: '#92400E',
    borderColor: '#FDE68A',
  },
  hr: {
    label: 'الموارد البشرية',
    labelEn: 'Human Resources',
    accentColor: '#7C3AED',
    lightBg: '#EDE9FE',
    textColor: '#6D28D9',
    borderColor: '#DDD6FE',
  },
  commercial: {
    label: 'الإدارة التجارية',
    labelEn: 'Commercial & Sales',
    accentColor: '#059669',
    lightBg: '#D1FAE5',
    textColor: '#047857',
    borderColor: '#A7F3D0',
  },
};

export const MASTER_JOBS: JobCardData[] = [
  // المستوى الأول
  {
    id: 'ceo',
    title: 'المدير التنفيذي',
    titleEn: 'Chief Executive Officer',
    acronym: 'CEO',
    department: 'executive',
    targetLevel: 1,
    targetParentId: null,
    description: 'قائد المنظمة والمسؤول عن صياغة الرؤية الاستراتيجية وتوجيه الإدارات التنفيذية والتواصل مع مجلس الإدارة.',
    keyResponsibilities: [
      'تحديد التوجه الاستراتيجي والأهداف الكبرى للشركة',
      'الإشراف المباشر على مدراء الإدارات التنفيذية',
      'تمثيل الشركة وضمان تحقيق الاستدامة والربحية',
    ],
    iconName: 'Building2',
    avatarUrl: '/src/assets/images/avatar_ceo_male_1793159442528.jpg',
  },

  // المستوى الثاني
  {
    id: 'coo',
    title: 'مدير العمليات',
    titleEn: 'Chief Operating Officer',
    acronym: 'COO',
    department: 'operations',
    targetLevel: 2,
    targetParentId: 'ceo',
    description: 'المسؤول عن كفاءة سلاسل الإمداد، وإدارة العمليات اليومية، وتنسيق الخدمات اللوجستية وخدمة العملاء.',
    keyResponsibilities: [
      'تحسين الكفاءة التشغيلية وتقليل الهدر في العمليات',
      'الإشراف على حركة التوريد والمستودعات والتوزيع',
      'ضمان جودة وسرعة تلبية متطلبات العملاء اليومية',
    ],
    iconName: 'Cpu',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },
  {
    id: 'cfo',
    title: 'المدير المالي',
    titleEn: 'Chief Financial Officer',
    acronym: 'CFO',
    department: 'finance',
    targetLevel: 2,
    targetParentId: 'ceo',
    description: 'المسؤول عن سلامة الموقف المالي للشركة، وإعداد الميزانيات، وإدارة السيولة النقدية والمحاسبة المالية.',
    keyResponsibilities: [
      'إدارة التدفقات النقدية والسيولة والتقارير المالية',
      'الإشراف على عمليات المحاسبة والامتثال الضريبي والزكوي',
      'التخطيط المالي وتوزيع الميزانيات على الإدارات',
    ],
    iconName: 'Coins',
    avatarUrl: '/src/assets/images/avatar_cfo_male_1793159443337.jpg',
  },
  {
    id: 'hr_dir',
    title: 'مدير الموارد البشرية',
    titleEn: 'HR Director',
    acronym: 'CHRO',
    department: 'hr',
    targetLevel: 2,
    targetParentId: 'ceo',
    description: 'المسؤول عن استقطاب الكفاءات، وبناء الثقافة المؤسسية، والتطوير المهني، وضمان رضا وسلامة الموظفين.',
    keyResponsibilities: [
      'تطوير وتطبيق استراتيجيات التوظيف والاحتفاظ بالمواهب',
      'تصميم برامج التدريب والتطوير الوظيفي المستمر',
      'تنظيم بيئة العمل وسياسات تقييم الأداء والعلاقات العمالية',
    ],
    iconName: 'Users',
    avatarUrl: '/src/assets/images/avatar_hr_female_1793159444667.jpg',
  },
  {
    id: 'commercial_dir',
    title: 'المدير التجاري',
    titleEn: 'Commercial Director',
    acronym: 'CCO',
    department: 'commercial',
    targetLevel: 2,
    targetParentId: 'ceo',
    description: 'المسؤول عن زيادة الحصة السوقية، وقيادة جهود التسويق والمبيعات وتوسيع الشراكات التجارية.',
    keyResponsibilities: [
      'وضع خطط النمو التوسعي وتحديد الشرائح المستهدفة',
      'مواءمة استراتيجيات التسويق مع أهداف المبيعات الرقمية والميدانية',
      'بناء وتطوير العلاقات الاستراتيجية مع كبار العملاء',
    ],
    iconName: 'TrendingUp',
    avatarUrl: '/src/assets/images/avatar_commercial_male_1793159444067.jpg',
  },

  // المستوى الثالث: العمليات
  {
    id: 'logistics_mgr',
    title: 'مدير الخدمات اللوجستية',
    titleEn: 'Logistics Manager',
    department: 'operations',
    targetLevel: 3,
    targetParentId: 'coo',
    description: 'يقود إدارة المستودعات وعمليات الشحن والتوصيل وضمان تدفق المواد والمنتجات بدون تأخير.',
    keyResponsibilities: [
      'إدارة سعة التخزين وحركات الجرد اليومية',
      'تنسيق مسارات التوصيل وأوقات الشحن مع الشركاء',
      'رفع تقارير الأداء اللوجستي لمدير العمليات',
    ],
    iconName: 'Truck',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },
  {
    id: 'cs_mgr',
    title: 'مدير خدمة العملاء',
    titleEn: 'Customer Service Manager',
    department: 'operations',
    targetLevel: 3,
    targetParentId: 'coo',
    description: 'المسؤول عن جودة تجربة العميل بعد البيع وسرعة معالجة الاستفسارات والشكاوى.',
    keyResponsibilities: [
      'متابعة مؤشرات رضا العملاء (CSAT) ومعدل حل المشكلات',
      'تدريب وتوجيه فريق موظفي خدمة العملاء',
      'تحويل ملاحظات العملاء إلى فرص تطوير في العمليات',
    ],
    iconName: 'Headphones',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },

  // المستوى الثالث: المالية
  {
    id: 'accountant',
    title: 'المحاسب',
    titleEn: 'Senior Accountant',
    department: 'finance',
    targetLevel: 3,
    targetParentId: 'cfo',
    description: 'مسؤول عن تسجيل القيود اليومية، وإعداد القوائم المالية، ومطابقة الحسابات البنكية ومستحقات الموردين.',
    keyResponsibilities: [
      'تسجيل المعاملات المالية والفواتير وسندات القبض والصرف',
      'إعداد موازين المراجعة ومطابقة القيود مع البنوك',
      'دعم إعداد القوائم المالية الشهرية والسنوية',
    ],
    iconName: 'FileSpreadsheet',
    avatarUrl: '/src/assets/images/avatar_cfo_male_1793159443337.jpg',
  },
  {
    id: 'budget_officer',
    title: 'مسؤول الميزانية',
    titleEn: 'Budget Officer',
    department: 'finance',
    targetLevel: 3,
    targetParentId: 'cfo',
    description: 'يحلل الانحرافات بين الإنفاق المخطط والفعلي ويدعم التخصيص الرشيد للأموال والموارد المالية.',
    keyResponsibilities: [
      'مراقبة بنود الصرف لكل إدارة مقارنة بالميزانية المعتمدة',
      'تجهيز تقارير الفروقات والانحرافات ورفع التوصيات',
      'المشاركة في بناء خطة الميزانية التقديرية للعام الجديد',
    ],
    iconName: 'Calculator',
    avatarUrl: '/src/assets/images/avatar_cfo_male_1793159443337.jpg',
  },

  // المستوى الثالث: الموارد البشرية
  {
    id: 'recruiter',
    title: 'مسؤول التوظيف',
    titleEn: 'Talent Acquisition Officer',
    department: 'hr',
    targetLevel: 3,
    targetParentId: 'hr_dir',
    description: 'يدير دورة استقطاب المواهب، وفلترة السير الذاتية، وإجراء المقابلات الأولية والتعاقد.',
    keyResponsibilities: [
      'نشر إعلانات الوظائف وإدارة منصات التوظيف',
      'فرز المرشحين وتنظيم المقابلات الوظيفية بالتنسيق مع الإدارات',
      'تسهيل إجراءات مباشرة العمل وتهيئة الموظفين الجدد',
    ],
    iconName: 'UserPlus',
    avatarUrl: '/src/assets/images/avatar_hr_female_1793159444667.jpg',
  },
  {
    id: 'training_officer',
    title: 'مسؤول التدريب والتطوير',
    titleEn: 'Learning & Development Officer',
    department: 'hr',
    targetLevel: 3,
    targetParentId: 'hr_dir',
    description: 'يحدد الفجوات المهارية لدى الموظفين ويصمم البرامج التدريبية لرفع الكفاءة والإنتاجية.',
    keyResponsibilities: [
      'تحليل الاحتياجات التدريبية لفرق العمل المختلفة',
      'تنظيم ورش العمل والدورات التخصصية والقيادية',
      'تقييم أثر التدريب على أداء الموظفين ورضاهم المهني',
    ],
    iconName: 'GraduationCap',
    avatarUrl: '/src/assets/images/avatar_hr_female_1793159444667.jpg',
  },

  // المستوى الثالث: الإدارة التجارية
  {
    id: 'marketing_mgr',
    title: 'مدير التسويق',
    titleEn: 'Marketing Manager',
    department: 'commercial',
    targetLevel: 3,
    targetParentId: 'commercial_dir',
    description: 'يقود استراتيجيات الحملات التسويقية والهوية الرقمية وجذب العملاء المحتملين وتوليد الفرص.',
    keyResponsibilities: [
      'إدارة الميزانية التسويقية والحملات الرقمية والإعلانية',
      'تحليل المنافسين ودراسة تفضيلات الجمهور المستهدف',
      'تطوير الرسائل الاتصالية والمحتوى الجذاب للعلامة التجارية',
    ],
    iconName: 'Megaphone',
    avatarUrl: '/src/assets/images/avatar_commercial_male_1793159444067.jpg',
  },
  {
    id: 'sales_mgr',
    title: 'مدير المبيعات',
    titleEn: 'Sales Manager',
    department: 'commercial',
    targetLevel: 3,
    targetParentId: 'commercial_dir',
    description: 'يشرف على فريق المبيعات وتحقيق الأهداف البيعية الشهرية ومتابعة خط سير الصفقات.',
    keyResponsibilities: [
      'وضع مستهدفات البيع وتوزيع المناطق والعملاء على الفريق',
      'متابعة أداء المفاوضات وإغلاق العقود والاتفاقيات',
      'رفع تقارير دورية للإدارة التجارية عن الإيرادات المحققة',
    ],
    iconName: 'Target',
    avatarUrl: '/src/assets/images/avatar_commercial_male_1793159444067.jpg',
  },

  // المستوى الرابع: الوظائف التشغيلية
  {
    id: 'warehouse_sup',
    title: 'مشرف المستودع',
    titleEn: 'Warehouse Supervisor',
    department: 'operations',
    targetLevel: 4,
    targetParentId: 'logistics_mgr',
    description: 'يشرف على عمليات استلام البضائع وترتيبها في الأرفف وحفظها بسلامة وإعداد طلبيات التوصيل.',
    keyResponsibilities: [
      'استلام الشحنات ومطابقة الفواتير مع السلع الفعلية',
      'إدارة أمان المستودع وتطبيق معايير السلامة المهنية',
      'تسليم المنتجات الجاهزة لفرق التوزيع ومندوبي التوصيل',
    ],
    iconName: 'Boxes',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },
  {
    id: 'delivery_coord',
    title: 'منسق التوصيل',
    titleEn: 'Delivery Coordinator',
    department: 'operations',
    targetLevel: 4,
    targetParentId: 'logistics_mgr',
    description: 'ينظم جداول تحرك الشاحنات ومواعيد التسليم للعملاء لمراعاة السرعة والدقة وخفض التكاليف.',
    keyResponsibilities: [
      'جدولة مسارات المركبات وتقليل وقت الرحلات والوقود',
      'التواصل مع السائقين لمعالجة أي عقبات على الطريق',
      'تأكيد استلام الطلبات وتسليم وصولات التسليم للخدمات اللوجستية',
    ],
    iconName: 'Compass',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },
  {
    id: 'cs_team',
    title: 'موظفو خدمة العملاء',
    titleEn: 'Customer Support Specialists',
    department: 'operations',
    targetLevel: 4,
    targetParentId: 'cs_mgr',
    description: 'خط الدفاع الأول في التواصل المباشر مع العملاء عبر الهاتف والمحادثات لتقديم الدعم الفوري.',
    keyResponsibilities: [
      'الرد اللبق على استفسارات العملاء وشكاويهم',
      'تسجيل تذاكر الدعم ومتابعة حلها مع الإدارات المعنية',
      'ضمان رضا العميل وتجاوز توقعاته بأسلوب احترافي',
    ],
    iconName: 'PhoneCall',
    avatarUrl: '/src/assets/images/avatar_coo_female_1793159442912.jpg',
  },
  {
    id: 'sales_team',
    title: 'فريق المبيعات',
    titleEn: 'Sales Representatives',
    department: 'commercial',
    targetLevel: 4,
    targetParentId: 'sales_mgr',
    description: 'ممثلو المبيعات الميدانية والمكتبية الذين يتواصلون مع العملاء لعرض المنتجات وإتمام عمليات الشراء.',
    keyResponsibilities: [
      'التواصل المباشر مع العملاء المحتملين وشرح القيمة المضافة',
      'تقديم العروض والأسعار المنافسة ومتابعة قرارات الشراء',
      'تحقيق مستهدفات المبيعات الفردية والمساهمة في هدف الفريق',
    ],
    iconName: 'Briefcase',
    avatarUrl: '/src/assets/images/avatar_commercial_male_1793159444067.jpg',
  },
];

export const ORG_TREE_SLOTS: OrgNodeSlotDef[] = [
  // L1
  {
    slotId: 'slot_ceo',
    level: 1,
    parentSlotId: null,
    expectedJobId: 'ceo',
    department: 'executive',
    label: 'رأس الهرم التنفيذي',
  },

  // L2
  {
    slotId: 'slot_coo',
    level: 2,
    parentSlotId: 'slot_ceo',
    expectedJobId: 'coo',
    department: 'operations',
    label: 'إدارة العمليات وسلاسل الإمداد',
  },
  {
    slotId: 'slot_cfo',
    level: 2,
    parentSlotId: 'slot_ceo',
    expectedJobId: 'cfo',
    department: 'finance',
    label: 'الإدارة والرقابة المالية',
  },
  {
    slotId: 'slot_hr_dir',
    level: 2,
    parentSlotId: 'slot_ceo',
    expectedJobId: 'hr_dir',
    department: 'hr',
    label: 'إدارة رأس المال البشري',
  },
  {
    slotId: 'slot_commercial_dir',
    level: 2,
    parentSlotId: 'slot_ceo',
    expectedJobId: 'commercial_dir',
    department: 'commercial',
    label: 'الإدارة التجارية والنمو',
  },

  // L3 Operations
  {
    slotId: 'slot_logistics_mgr',
    level: 3,
    parentSlotId: 'slot_coo',
    expectedJobId: 'logistics_mgr',
    department: 'operations',
    label: 'وحدة الخدمات اللوجستية',
  },
  {
    slotId: 'slot_cs_mgr',
    level: 3,
    parentSlotId: 'slot_coo',
    expectedJobId: 'cs_mgr',
    department: 'operations',
    label: 'وحدة العناية بالعملاء',
  },

  // L3 Finance
  {
    slotId: 'slot_accountant',
    level: 3,
    parentSlotId: 'slot_cfo',
    expectedJobId: 'accountant',
    department: 'finance',
    label: 'وحدة الحسابات والقيود',
  },
  {
    slotId: 'slot_budget_officer',
    level: 3,
    parentSlotId: 'slot_cfo',
    expectedJobId: 'budget_officer',
    department: 'finance',
    label: 'وحدة الميزانيات والتخطيط',
  },

  // L3 HR
  {
    slotId: 'slot_recruiter',
    level: 3,
    parentSlotId: 'slot_hr_dir',
    expectedJobId: 'recruiter',
    department: 'hr',
    label: 'وحدة استقطاب الكفاءات',
  },
  {
    slotId: 'slot_training_officer',
    level: 3,
    parentSlotId: 'slot_hr_dir',
    expectedJobId: 'training_officer',
    department: 'hr',
    label: 'وحدة التدريب والتطوير',
  },

  // L3 Commercial
  {
    slotId: 'slot_marketing_mgr',
    level: 3,
    parentSlotId: 'slot_commercial_dir',
    expectedJobId: 'marketing_mgr',
    department: 'commercial',
    label: 'وحدة التسويق الرقمي والهوية',
  },
  {
    slotId: 'slot_sales_mgr',
    level: 3,
    parentSlotId: 'slot_commercial_dir',
    expectedJobId: 'sales_mgr',
    department: 'commercial',
    label: 'وحدة المبيعات وإغلاق العقود',
  },

  // L4 Operations
  {
    slotId: 'slot_warehouse_sup',
    level: 4,
    parentSlotId: 'slot_logistics_mgr',
    expectedJobId: 'warehouse_sup',
    department: 'operations',
    label: 'مستودع البضائع والمخزون',
  },
  {
    slotId: 'slot_delivery_coord',
    level: 4,
    parentSlotId: 'slot_logistics_mgr',
    expectedJobId: 'delivery_coord',
    department: 'operations',
    label: 'تنسيق أسطول التوصيل',
  },
  {
    slotId: 'slot_cs_team',
    level: 4,
    parentSlotId: 'slot_cs_mgr',
    expectedJobId: 'cs_team',
    department: 'operations',
    label: 'فريق الاستجابة للعملاء',
  },

  // L4 Commercial
  {
    slotId: 'slot_sales_team',
    level: 4,
    parentSlotId: 'slot_sales_mgr',
    expectedJobId: 'sales_team',
    department: 'commercial',
    label: 'فريق المفاوضات والمبيعات',
  },
];

// Initial placements for Build mode (CEO locked in top slot, rest empty)
export const INITIAL_BUILD_PLACEMENTS: BoardPlacements = {
  slot_ceo: 'ceo',
  slot_coo: null,
  slot_cfo: null,
  slot_hr_dir: null,
  slot_commercial_dir: null,
  slot_logistics_mgr: null,
  slot_cs_mgr: null,
  slot_accountant: null,
  slot_budget_officer: null,
  slot_recruiter: null,
  slot_training_officer: null,
  slot_marketing_mgr: null,
  slot_sales_mgr: null,
  slot_warehouse_sup: null,
  slot_delivery_coord: null,
  slot_cs_team: null,
  slot_sales_team: null,
};

// Initial placements for Repair mode (A realistic chaotic company state with 6 misplaced roles)
export const INITIAL_REPAIR_PLACEMENTS: BoardPlacements = {
  slot_ceo: 'ceo', // correct
  slot_coo: 'coo', // correct
  slot_cfo: 'budget_officer', // WRONG: Budget officer placed directly in CFO director slot!
  slot_hr_dir: 'hr_dir', // correct
  slot_commercial_dir: 'commercial_dir', // correct
  slot_logistics_mgr: 'accountant', // WRONG: Accountant placed in logistics!
  slot_cs_mgr: 'cs_mgr', // correct
  slot_accountant: 'cfo', // WRONG: CFO placed down in accountant slot!
  slot_budget_officer: 'logistics_mgr', // WRONG: Logistics manager placed in budget slot!
  slot_recruiter: 'recruiter', // correct
  slot_training_officer: 'training_officer', // correct
  slot_marketing_mgr: 'sales_team', // WRONG: Sales team placed in marketing manager slot!
  slot_sales_mgr: 'sales_mgr', // correct
  slot_warehouse_sup: 'warehouse_sup', // correct
  slot_delivery_coord: 'delivery_coord', // correct
  slot_cs_team: 'cs_team', // correct
  slot_sales_team: 'marketing_mgr', // WRONG: Marketing manager swapped with sales team!
};
